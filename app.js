/*const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const passport = require('passport');*/
import Express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import passport from 'passport';
import dotenv from 'dotenv';
import auth from './server/routes/authentication/api';
import MongoUtils from './server/mongoUtils';
import './server/config/passport';
import { async } from 'rxjs/internal/scheduler/async';

const app = new Express();
const server = http.createServer(app);

dotenv.config();
//require('dotenv').config();
//require('./server/mongoUtils');


const api = '/api';
/*const auth = require('./server/routes/authentication/api');*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize());
app.use(passport.session());
//require('./server/config/passport');
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

export default new Promise(async (resolve) => {
  await MongoUtils.connect();
  server.listen(port, async function listen() {
    console.log(`Running on ${process.env.DB_HOST}:${port}`)

    // Export the server and app
    resolve({ server, app });
  });
})
//server.listen(port, () => console.log(`Running on ${process.env.DB_HOST}:${port}`));

