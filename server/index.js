const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) =>{
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'))
})


module.exports = app;
