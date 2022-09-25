const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Set up for MongoDB
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;

const Password = require("./validation/Password");
const Validate = require("./validation/Validation");

// SET UP link to MONGO_URL in .env file
const mongoUrl = process.env.MONGO_URL;
let DBNAME = process.env.DBNAME;
let COLLECTION = process.env.COLLECTION;

const app = express();

// ENABLE JSON
app.use(express.json());

// ENABLE CORS
app.use(cors());
console.log(mongoUrl, DBNAME);
async function main() {
  // Connect to the database
  let db = await MongoUtil.connect(mongoUrl, DBNAME);
  console.log("Database is connected");

  app.get("/user", async (req, res) => {
    try {
        let data = await db.collection(COLLECTION).find().toArray();
        res.status(200);
        res.send(data);
    } catch (error) {
        res.status(500);
        res.send("Error Reading");
    }
  });
  app.post("/user", async (req, res) => {
    try {
        let username = req.body.username || "";
        let email = req.body.email || "";
        let password = req.body.password || "";
        let contact = req.body.contact || "";
        let own_cars = req.body.own_cars || false;

        Validate.validateRegForm({username, password, email, contact});

        console.log("HASHED")
        password = Password.hashedPassword(password);

        console.log(username, email, password, contact, own_cars);
        
        res.status(200);
        res.send("Testing");
    } catch (error) {
        res.status(500);
        res.send("Error writing to DB");
    }
  });
}
main();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running...", PORT);
});
