import mongoose from 'mongoose';

const mongodb = `mongodb://${process.env.DB_HOST}:27017`;
const dbName = 'authentication_db';

class MongoUtils {
  static async connect() {
    await mongoose.connect(`${mongodb}/${dbName}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log('Successfully connected to mongoose --> ', mongoose.connection.readyState);
    })
    .catch(err => console.error.bind(console, 'connection error: ', err));
    
/*    let db = mongoose.connection;,
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Successfully connected to mongoose --> ', mongoose.connection.readyState);
    });
*/
  }
}

export default MongoUtils;



/*const mongoose = require('mongoose');
const mongodb = `mongodb://${process.env.DB_HOST}:27017`;
const dbName = 'authentication_db';

mongoose.connect(`${mongodb}/${dbName}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Successfully connected to mongoose --> ', mongoose.connection.readyState);
});

module.exports = mongoose;*/

