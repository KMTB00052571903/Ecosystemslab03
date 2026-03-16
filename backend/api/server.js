// api/server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: '✅ API funcionando!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;