const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Aditee:happy@myapp?retryWrites=true&w=majority';

async function connect() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('<database>');
  const tasks = db.collection('tasks');
  return { client, tasks };
}

module.exports = connect;
