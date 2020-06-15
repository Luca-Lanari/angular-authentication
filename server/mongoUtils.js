const mongoose = require('mongoose');
const mongodb = `mongodb://${process.env.DB_HOST}:27017`;
const dbName = 'authentication_db';

mongoose.connect(`${mongodb}/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Successfully connected to mongoose --> ', mongoose.connection.readyState);
});

module.exports = mongoose;

