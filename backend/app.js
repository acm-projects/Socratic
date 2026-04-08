const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/sessions', require('./routes/chatSessionRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/stats', require('./routes/userStatsRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/friends', require('./routes/friendRoutes'));
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/syllabus', require('./routes/syllabusRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/tutor', require('./routes/tutorRoutes'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));