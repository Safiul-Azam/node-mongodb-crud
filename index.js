const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.port || 5000


//name:userDB
//password:PcvL9q7N0Y7piEvr
const uri = "mongodb+srv://userDB:PcvL9q7N0Y7piEvr@cluster0.6m4yg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
  try{
    await client.connect()
    const userCollection = client.db("foodExpress").collection("user");
    const user = {name:'safiul azam', email:'safiul@gmail.com'}
    const result = await userCollection.insertOne(user)
    console.log('result to a created user',result.insertedId)
  }
  finally{
    await client.close()
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