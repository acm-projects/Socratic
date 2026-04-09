const syllabusService = require('../backend/services/syllabusService');
require('dotenv').config({ path: './backend/.env' });

async function reproduceError() {
  const syllabusText = `Number: STAT/CS/SE 3341.501
Title: Probability and Statistics in Computer Science
and Software Engineering
Term: Spring 2026
Hours: Monday & Wednesday, 5:30 - 6:45pm
Classroom: JO 3.516
Instructor Information
Name: Octavious Smiley, Assistant Professor of Instruction
Email: Octavious.Smiley@UTDallas.edu
Please include the course and section number when
emailing me
Office: FN 3.118B
Hours: Wednesday, 1-2pm
Teaching Assistant Information
Name: Oluwatade Olamide
Email: Olamide.Oluwatade@UTDallas.edu
Tutoring: The Student Success Center Peer Tutoring program is
offering drop-in tutoring (but not one-on-one appoint-
ments)
Course Information
Pre-requisite: (MATH 1326 or MATH 2414 or MATH 2419),
and (CE 2305 or CS 2305) and (MATH 2418)
Description: Axiomatic probability theory, independence, con-
ditional probability. Discrete and continuous
random variables, special distributions of impor-
tance, and expectation. Simulation of random
variables and Monte Carlo methods. Central
limit theorem. Basic statistical inference, param-
eter estimation, hypothesis testing, and linear re-
gression. Introduction to stochastic processes.
Required text: Probability and Statistics for Computer Scien-
tists, 2nd edition by Michael Baron
Non-required
text:
Probability and Statistics by Morris H. DeGroot,
Probability and Statistics: The Science of Uncer-
tainty by Michael J. Evans (The answers are in
the back of the book)
1
Learning Outcomes
Probability: Statistics: • Apply the fundamental probability rules and concepts.
• Apply common discrete and continuous probability distribu-
tions.
• Relate calculus to probability to solve probability problems.
• Learn the basics of stochastic processes and its classical ap-
plications.
• Understand common numerical summaries and exploratory
analyses of data.
• Choose the appropriate statistical analysis method to answer
a typical statistical question.
• Construct confidence intervals and perform tests of significance
to make statistical inferences.
Grading Policies
Summary: • 40%: Homework
• 12%: Exam 1
• 12%: Exam 2
• 12%: Exam 3
• 12%: Exam 4
• 12%: Attendance
Homework: • Individual submissions
• Must submit a pdf document (convert photos)
• Submit to eLearning
• Due 15 minutes prior to the start of class on
the due data (5:15pm)
• Lowest 2 homework scores will be used to score
extra credit
• No late assignments will be accepted under any
circumstance (even by a minute). This allows us
to offer opportunities for extra credit via lowest
two grades; meaning you can improperly, or fail
to, submit 2 assignments with no impact to your
HW score.
2
Exams: • Individual-based
• One side of 3x5 NoteCard is allowed
• In-class
• Required supplies to bring: SCANTRONS, form
F-1712-PAR-L (one for each exam; you will also
need a no.2 pencil and a good eraser)
• Make-up exams will be granted only in cases of
documented emergencies. They must be requested
before the end of day of scheduled exam time; oth-
erwise, no make-up will be provided. Make-ups
will be administered one week later, will cover the
same content in free-response format, and will not
include any opportunities for extra credit.
Attendance: • Attendance will be recorded on a randomly
selected sample of 6 class sessions. You may miss
one session without any impact on your grade.
Missing more than 3 sessions will result in an
automatic score of 0 for attendance.
Your attendance grade will be calculated as:
(Number of days present) + 0.5
6
For example, if you are present for 4 out of the 6
recorded days:
4 + 0.5
6 = 75%
• If your exam average is higher than your at-
tendance average, your exam average will replace
it (Class is beneficial but not mandatory).
• There will be no excuses allowed for attendance
including illnesses etc. This is already built in with
attendance not being able to hurt your grade, not
being taken everyday, and you being allowed to
miss a day no questions asked.
3
Grading Criteria
Grade Percentage Range
A [93, 100+)
A- [90, 93)
B+ [87, 90)
B [83, 87)
B- [80, 83)
C+ [70, 80)
C [65, 70)
C- [60, 65)
D+ [50, 60)
D [40, 50)
F [0, 40)
4
Course Schedule (Tentative)
Date Topic Due
Wed, Jan 21st Course overview + Probability Basics
Mon, Jan 26th Probability Basics + Typical Probability Questions
Wed, Jan 28th Combinatorics HW1
Mon, Feb 2nd Wed, Feb 4th Conditional Probability and Independence
Bayes Theorem + Monty Hall and Simpson’s Paradox HW2
Mon, Feb 9th Discrete Random Variables and an Introduction to Distributions
Wed, Feb 11th Joint Distributions and Marginal Distributions HW3
Mon, Feb 16th Wed, Feb 18th Exam 1 (Mandatory Class Attendance)
Expectations and Variance + practice questions
Mon, Feb 23rd Wed, Feb 25th Expectations and Variance + practice questions Families of Discrete Distributions
HW4
Mon, Mar 2nd Continuous Random Variables Wed, Mar 4th Families of Continuous Random Variables + practice questions
HW5
Mon, Mar 9th The Central Limit Theorem Wed, Mar 11th Exam 2 (Mandatory Class Attendance)
HW6
Mon, Mar 16th Spring Break
Wed, Mar 18th Spring Break
Mon, Mar 23rd Wed, Mar 25th Poisson, Exponential, and Gamma Connection
Markov Processes and Markov Chains
Mon, Mar 30th Markov Processes and Markov Chains Wed, Apr 1st Counting Processes
HW7
Mon, Apr 6th Wed, Apr 8th Introduction to Statistics + Parameter Estimation Exam 3 (Mandatory Class Attendance)
HW8
Mon, Apr 13th Confidence Intervals Wed, Apr 15th Confidence Intervals
HW9
Mon, Apr 20th Wed, Apr 22nd Introduction to Hypothesis Testing
Z and T-Test
Mon, Apr 27th Wed, Apr 29th χ2 Distribution and Corresponding Tests
Correlation and Regression
Mon, May 4th Course Review Wed, May 6th Exam 4 (Mandatory Class Attendance)
HW10
5
Course Policies
Electronic devices: Late work: Special assignments: Class attendance: Comet Creed: UT Dallas syllabus
policies and proce-
dures:
Calculators are permitted for exams, but not cell phones, com-
puters, tablets, etc. Limit the use of all devices during class.
No late homework will be accepted.
No special assignment is available.
Although attendance is not mandatory, you are encouraged not
to miss any class as the course will move at a fast pace. The
instructor will not make any accommodations for missing a class.
This creed was voted on by the UT Dallas student body in 2014.
It is a standard that Comets choose to live by and encourage
others to do the same:
“As a Comet, I pledge honesty, integrity, and service in all that
I do.”
The information contained in the following link constitutes the
University’s policies and procedures segment of the course syl-
labus. Please go to http://go.utdallas.edu/syllabus-policies for
those policies.
The descriptions and timelines contained in this syllabus are subject to change at the dis-
cretion of the instructor.
6`;

  try {
    console.log("Reproduction: Calling extraction with syllabus text...");
    const result = await syllabusService.extractSyllabusData(null, syllabusText);
    console.log("SUCCESS!", JSON.stringify(result, null, 2));
  } catch (error) {
    if (error.name === "ZodError") {
      console.error("Zod Validation Error Details:");
      console.error(JSON.stringify(error.errors, null, 2));
    } else {
      console.error("Error during extraction:", error);
    }
  }
}

reproduceError();
