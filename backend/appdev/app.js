

const express = require('express'); //express.js framework for backend
const createError = require('http-errors'); //https errors 404 not found
const morgan = require('morgan'); //logs details of request from terminal
require('dotenv').config(); //process env file

const app = express(); //initializes app to configure everything
app.use(express.json()); //send JSOM
app.use(express.urlencoded({ extended: false })); //pareses requests with urlencoded
app.use(morgan('dev')); //morgan logs in the dev format which will give color codded errors

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route')); //api routes

//handles errors and starts server
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
