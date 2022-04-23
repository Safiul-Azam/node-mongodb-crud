const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const objectId = require('mongodb').ObjectId

const port = process.env.port || 5000


//name:userDB
//password:PcvL9q7N0Y7piEvr
const uri = "mongodb+srv://userDB:PcvL9q7N0Y7piEvr@cluster0.6m4yg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    await client.connect()
    const userCollection = client.db("foodExpress").collection("user");

    app.get('/user', async(req, res)=>{
      const query = {}
      const cursor = userCollection.find(query)
      const users = await cursor.toArray() 
      res.send(users)
    })
    app.get('/user/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id:objectId(id)}
      const result = await userCollection.findOne(query)
      res.send(result)
    })
    app.post('/user', async(req, res)=>{
      const newUser = req.body
      console.log('add new user', newUser)
      const result = await userCollection.insertOne(newUser)
      res.send(result)
    })
    app.delete('/user/:id', async(req, res)=>{
      const id = req.params.id 
      const query = {_id:objectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })
  }
  finally{
    // await client.close()
  }

}
run().catch(console.dir)
//middleware part
app.use(cors())
app.use(express.json())

//get or read 
app.get('/', (req, res)=>{
    res.send('it is crud operation with mongodb')
})
app.listen(port, ()=>{
    console.log('crud operation is running')
})