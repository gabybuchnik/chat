const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;
const dbURL = 'mongodb://127.0.0.1:27017';


const onConnect = (err, databases) => {
    if (err) {
        return console.error("ERROR ECCURED", err);
    }
    const dbName = 'connections';
    const db = databases.db(dbName);
    const collectionName = 'chat';
    const collection = db.collection(collectionName);

    // app.get('/messages', (req, res) => {
    //     console.log("get!!");
    //     res.status(200).send("get successfully!");

    // });

    app.post('/message', (req, res) => {
        const { name, message} = req.body;
        try {
            collection.insertOne({ name, message });
            res.status(200).send("Message added successfully!");
        }
        catch (err) {
            res.status(500).send(err);

        }
    });

    app.get('/messages',async (req,res)=>{
        const arr = await collection.find().toArray();
        console.log(arr[0]);
        res.status(200).send(arr);

    });
}

mongo.MongoClient.connect(dbURL, onConnect);
app.listen(port, () => console.log(`Server is running on port: ${port}`));
