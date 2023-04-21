const client = require('./server');

async function connect() {
  await client.connect();
  const db = client.db('<database>');
  const tasks = db.collection('tasks');
  return { client, tasks };
}

module.exports = connect;

