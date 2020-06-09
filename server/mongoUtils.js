const mongoose = require('mongoose');
const mongodb = 'mongodb://localhost:27017';
const dbName = 'authentication_db';

mongoose.connect(`${mongodb}/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true });

let db = mongoose.connection;
console.log('ready state mongoose: ', mongoose.connection.readyState);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('ready state mongoose: ', mongoose.connection.readyState);
  console.log('Successfully connection to mongoose!');
});

module.exports = mongoose;
