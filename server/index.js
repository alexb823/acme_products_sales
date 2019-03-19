const Sequelize = require('sequelize');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { Product } = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(res.sendStatus(204))
    .catch(next);
});

app.post('/api/products', (req, res, next) => {
  Product.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
});

//handle 404
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

module.exports = app;
