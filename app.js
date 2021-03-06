const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.get('/', (_req, res) => {
  res.send('Let`s do this');
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Opps, something went wrong',
    data: 'Not found',
  });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 404).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

module.exports = app;
