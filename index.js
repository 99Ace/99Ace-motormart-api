const express = require('express');
const cors = require("cors")
require("dotenv").config();
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;

// SET UP link to MONGO_URL in .env file
const mongoUrl = process.env.MONGO_URL;
let DBNAME = process.env.DBNAME;
let COLLECTION = process.env.COLLECTION

const app = express();

// ENABLE JSON
app.use(express.json());

// ENABLE CORS
app.use(cors());
console.log(mongoUrl,DBNAME)
async function main() {
    
    // Connect to the database
    let db = await MongoUtil.connect(mongoUrl, DBNAME);
    console.log ("Database is connected");

    app.use( async (req,res) => {
        let data = await db.collection(COLLECTION)
                    .find()
                    .toArray()
        res.send( data )
    })
}
main();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log("Server is running...", PORT)
})