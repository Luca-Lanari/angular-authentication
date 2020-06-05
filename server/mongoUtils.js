const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const mongodb = 'mongodb://localhost:27017';
const dbName = 'authentication_db';

module.exports = {
  connection(closure) {
    return MongoClient.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
      if (err) return console.log(err);
      const db = client.db(dbName);
      closure(db);
    });
  },

  getDb() {
    return dbName;
  },
};

