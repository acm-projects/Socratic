import './App.css';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';


// Axios Interceptor for "Restart Logout" Logic
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or server restarted. Logging out...");
      sessionStorage.clear();
      window.location.reload(); // Force a fresh state
    }
    return Promise.reject(error);
  }
);

function LoginButton({ onSuccess }) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Auth Code:", codeResponse);
      // Send codeResponse.code to your backend to exchange for tokens
      onSuccess(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
    flow: 'auth-code', // Necessary for 'offline' access/refresh tokens
    prompt: 'consent', // Forces Google to issue a new refresh token
    scope: 'openid email profile https://www.googleapis.com/auth/calendar',
  });

  return (
    <button onClick={() => login()}>
      Sign in & authorize Calendar
    </button>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return sessionStorage.getItem('isSignedIn') === 'true';
  });
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [createMeet, setCreateMeet] = useState(false);
  const [attendeeEmails, setAttendeeEmails] = useState('');

  // Syllabus Extraction State
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [extractionResult, setExtractionResult] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [savedClasses, setSavedClasses] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [userId, setUserId] = useState(() => {
    return sessionStorage.getItem('userId') || null;
  });
  const [upcomingMeetings, setUpcomingMeetings] = useState(null);

  // Proactive Session Check (Sync with Backend Restart)
  useEffect(() => {
    if (isSignedIn && userId) {
      axios.get(`${API_URL}/api/calendar/session-check?userId=${userId}`)
        .catch(() => {
          /* Interceptor handles logout on 401 */
        });
    }
  }, [isSignedIn, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/calendar/create-event`, {
      userId,
      summary,
      description,
      location,
      startDateTime,
      endDateTime,
      createMeet,
      attendeeEmails: attendeeEmails
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email !== ''),
    })
      .then(response => {
        console.log(response.data);
        alert("Event created successfully!");
        setSummary('');
        setDescription('');
        setLocation('');
        setStartDateTime('');
        setEndDateTime('');
        setCreateMeet(false);
        setAttendeeEmails('');
      })
      .catch(error => {
        console.log(error.message);
        alert("Error creating event. Check console for details.");
      });
  };

  const handleSyllabusUpload = async (e) => {
    e.preventDefault();
    if (!syllabusFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("syllabusPdf", syllabusFile);

    setIsExtracting(true);
    setExtractionResult(null);

    try {
      const response = await axios.post(`${API_URL}/api/syllabus/extract`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setExtractionResult(response.data);
      alert("Syllabus extracted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to extract syllabus. " + (error.response?.data?.error || error.message));
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSaveSyllabus = async () => {
    if (!extractionResult?.data) return;

    try {
      const response = await axios.post(`${API_URL}/api/syllabus/save`, extractionResult.data);
      alert("Syllabus successfully saved to the database!");
      console.log("Save Response:", response.data);
      // Automatically refresh the classes list if it's currently showing
      fetchSavedClasses();
    } catch (error) {
      console.error(error);
      alert("Failed to save syllabus: " + (error.response?.data?.error || error.message));
    }
  };

  const fetchSavedClasses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/classes`);
      const classesData = response.data;

      // Fetch topics for each class to prove they are dynamically stored
      const classesWithTopics = await Promise.all(
        classesData.map(async (cls) => {
          try {
            const topicRes = await axios.get(`${API_URL}/api/topics/class/${cls.class_code}`);
            return { ...cls, topics: topicRes.data };
          } catch (e) {
            return { ...cls, topics: [] };
          }
        })
      );

      setSavedClasses(classesWithTopics);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch classes: " + error.message);
    }
  };

  const fetchAllTopics = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/topics`);
      setAllTopics(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch topics: " + error.message);
    }
  };

  const fetchUpcomingMeetings = async () => {
    if (!userId) {
      alert("Please sign in first.");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/api/calendar/upcoming-events?userId=${userId}`);
      setUpcomingMeetings(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch upcoming meetings. Make sure you have authorized calendar access this session.");
    }
  };

  const handleClearDatabase = async () => {
    try {
      await axios.delete(`${API_URL}/api/classes`);
      setSavedClasses([]);
      setAllTopics([]);
      setExtractionResult(null);
      alert("Database wiped successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to clear database: " + error.message);
    }
  };

  const responseGoogle = response => {
    console.log(response);
    const { code } = response
    axios.post(`${API_URL}/api/calendar/create-tokens`, { 
      code, 
      redirect_uri: window.location.origin 
    })
      .then(response => {
        console.log("Token response:", response.data);
        const { userId: newUserId, tokens } = response.data;
        
        if (!tokens.refresh_token) {
          console.warn("No refresh token received. Calendar sync may be limited.");
          // We don't alert every time to avoid annoyance, but logging it helps debugging
        }

        setIsSignedIn(true);
        setUserId(newUserId);
        sessionStorage.setItem('isSignedIn', 'true');
        sessionStorage.setItem('userId', newUserId);
        alert("Successfully signed in with Google!");
      })
      .catch(error => {
        console.log(error.message);
        alert("Failed to sign in: " + error.message);
      });
  }
  const responseError = error => {
    console.log(error)
  }


  return (
    // Replace with your actual Client ID
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="App">
        <h1>Google Calendar API</h1>
        {!isSignedIn ? <LoginButton onSuccess={responseGoogle} /> :
          <form onSubmit={handleSubmit}>
            <label htmlFor="summary">Summary</label>
            <br />
            <input type="text" id="summary" value={summary} onChange={e => setSummary(e.target.value)} />
            <br />
            <label htmlFor="description">Description</label>
            <br />
            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
            <br />
            <label htmlFor="location">Location</label>
            <br />
            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />
            <br />
            <label htmlFor="startDateTime">Start Date Time</label>
            <br />
            <input type="datetime-local" id="startDateTime" value={startDateTime} onChange={e => setStartDateTime(e.target.value)} />
            <br />
            <label htmlFor="endDateTime">End Date Time</label>
            <br />
            <input type="datetime-local" id="endDateTime" value={endDateTime} onChange={e => setEndDateTime(e.target.value)} />
            <br />
            <label htmlFor="attendeeEmails">Invite Emails (comma-separated)</label>
            <br />
            <input
              type="text"
              id="attendeeEmails"
              value={attendeeEmails}
              onChange={e => setAttendeeEmails(e.target.value)}
            />
            <br />
            <label>
              <input
                type="checkbox"
                checked={createMeet}
                onChange={(e) => setCreateMeet(e.target.checked)}
              />
              Add Google Meet Conference
            </label>
            <br />
            <button type="submit">Create Event</button>
          </form>
        }

        <hr style={{ margin: "40px 0" }} />
        <h2>Upcoming Meetings</h2>
        <button onClick={fetchUpcomingMeetings} style={{ padding: "10px 15px", cursor: "pointer", background: "#17a2b8", color: "white", border: "none", borderRadius: "4px", marginBottom: "20px" }}>
          Fetch Upcoming Meetings
        </button>

        {upcomingMeetings && (
          <div style={{ textAlign: "left", padding: "10px", background: "#fff3cd", borderRadius: "8px" }}>
            {upcomingMeetings.length === 0 ? (
              <p>No upcoming meetings found.</p>
            ) : (
              <ul>
                {upcomingMeetings.map((event) => {
                  const meetingDate = event.start.dateTime ? new Date(event.start.dateTime).toLocaleString() : new Date(event.start.date).toLocaleDateString();
                  const summary = event.summary || "Untitled Event";
                  const attendeeString = event.attendees ? event.attendees.map(a => a.email).join(", ") : "None";

                  return (
                    <li key={event.id} style={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px dashed #ccc" }}>
                      <strong>{summary}</strong>
                      <br />
                      <span>Upcoming meeting at {meetingDate}</span>
                      <br />
                      <span style={{ fontSize: "0.9em", color: "#555" }}>Invitees: {attendeeString}</span>
                      <br />
                      {event.hangoutLink ? (
                        <span>Google Meet Link: <a href={event.hangoutLink} target="_blank" rel="noopener noreferrer" style={{ color: "#0056b3", textDecoration: "underline" }}>Join Meeting</a></span>
                      ) : (
                        <span style={{ fontStyle: "italic", color: "#888" }}>(No Google Meet attached)</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        <hr style={{ margin: "40px 0" }} />
        <h2>Syllabus Extraction</h2>
        <form onSubmit={handleSyllabusUpload}>
          <label htmlFor="syllabusPdf">Upload Syllabus (PDF):</label>
          <br />
          <input
            type="file"
            id="syllabusPdf"
            accept="application/pdf"
            onChange={e => setSyllabusFile(e.target.files[0])}
          />
          <br /><br />
          <button type="submit" disabled={isExtracting}>
            {isExtracting ? "Extracting..." : "Extract Syllabus"}
          </button>
        </form>

        {extractionResult && (
          <div style={{ textAlign: "left", marginTop: "20px", padding: "10px", background: "#f4f4f4", borderRadius: "8px" }}>
            <h3>Extracted Data:</h3>
            <pre>{JSON.stringify(extractionResult.data, null, 2)}</pre>
            <button
              onClick={handleSaveSyllabus}
              style={{ padding: "10px 15px", marginTop: "10px", background: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Confirm & Save to Database
            </button>
          </div>
        )}

        <hr style={{ margin: "40px 0" }} />
        <h2>Database viewer</h2>
        <button onClick={fetchSavedClasses} style={{ padding: "10px 15px", cursor: "pointer", background: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
          Fetch Saved Classes from Database
        </button>
        <button onClick={fetchAllTopics} style={{ padding: "10px 15px", cursor: "pointer", background: "#0056b3", color: "white", border: "none", borderRadius: "4px", marginLeft: "10px" }}>
          Fetch All Topics from Database
        </button>
        <button onClick={handleClearDatabase} style={{ padding: "10px 15px", cursor: "pointer", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", marginLeft: "10px" }}>
          Clear All Database Data
        </button>

        {savedClasses.length > 0 && (
          <div style={{ textAlign: "left", marginTop: "20px", padding: "10px", background: "#eef", borderRadius: "8px" }}>
            <h3>Classes in Database:</h3>
            <pre>{JSON.stringify(savedClasses, null, 2)}</pre>
          </div>
        )}

        {allTopics.length > 0 && (
          <div style={{ textAlign: "left", marginTop: "20px", padding: "10px", background: "#e6f2ff", borderRadius: "8px" }}>
            <h3>All Topics in Database:</h3>
            <pre>{JSON.stringify(allTopics, null, 2)}</pre>
          </div>
        )}

      </div>
    </GoogleOAuthProvider>
  );
}

export default App;