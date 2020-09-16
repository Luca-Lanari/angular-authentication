import mongoose from 'mongoose';
import { resolve } from 'path';

const mongodb = `mongodb://${process.env.DB_HOST}:27017`;
class MongoUtils {
  static async connect() {
    await this.checkMongoConnection();
    // await mongoose.connect(`${mongodb}/${process.env.DB_NAME}`, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false
    // })
    // .then(() => {
    //   console.log('Successfully connected to mongoose --> ', mongoose.connection.readyState);
    // })
    // .catch(err => console.error.bind(console, 'connection error: ', err));
    
/*    let db = mongoose.connection;,
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Successfully connected to mongoose --> ', mongoose.connection.readyState);
    });
*/
  }
  static checkMongoConnection() {
    return new Promise((resolve, reject) => {
      mongoose.connect(`${mongodb}/${process.env.DB_NAME}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
      let db = mongoose.connection;
      resolve(
        db.once('open', () => {
        console.log('Successfully connected to mongoose --> ', mongoose.connection.readyState);
      }));
      reject(
        db.on('error', console.error.bind(console, 'connection error:')));
    });
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

