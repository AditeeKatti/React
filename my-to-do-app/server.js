require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri ='mongodb://localhost:27017/mytodoapp';

const client = new MongoClient(uri);

client.connect(err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');
});

module.exports = client;

//  app.get('/api/todos', async (req, res) => {
//     const todos = await client.db().collection('todos').find().toArray();
//     res.json(todos);
//   });
  
//   app.post('/api/todos', async (req, res) => {
//     const todo = req.body;
//     await client.db().collection('todos').insertOne(todo);
//     res.json(todo);
//   });
  
