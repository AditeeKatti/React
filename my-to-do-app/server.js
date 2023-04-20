require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');

});

//  app.get('/api/todos', async (req, res) => {
//     const todos = await client.db().collection('todos').find().toArray();
//     res.json(todos);
//   });
  
//   app.post('/api/todos', async (req, res) => {
//     const todo = req.body;
//     await client.db().collection('todos').insertOne(todo);
//     res.json(todo);
//   });
  
