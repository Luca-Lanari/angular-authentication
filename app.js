const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const api = '/api';
const auth = require('./server/routes/authentication/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize());
app.use(api, auth);
app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({'message': `${err.name}: ${err.message}`});
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));