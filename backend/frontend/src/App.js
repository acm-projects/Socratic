import './App.css';
import { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginButton({ onSuccess }) {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("Auth Code:", codeResponse);
      // Send codeResponse.code to your backend to exchange for tokens
      onSuccess(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
    flow: 'auth-code', // Necessary for 'offline' access/refresh tokens
    scope: 'openid email profile https://www.googleapis.com/auth/calendar',
  });

  return (
    <button onClick={() => login()}>
      Sign in & authorize Calendar
    </button>
  );
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/calendar/create-event', {
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
      const response = await axios.post("http://localhost:4000/api/syllabus/extract", formData, {
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

  const responseGoogle = response => {
    console.log(response);
    const { code } = response
    axios.post('http://localhost:4000/api/calendar/create-tokens', { code })
      .then(response => {
        console.log(response.data)
        setIsSignedIn(true);
      })
      .catch(error => console.log(error.message)
      )
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
          </div>
        )}

      </div>
    </GoogleOAuthProvider>
  );
}

export default App;