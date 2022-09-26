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

  // === GET ALL USER : PATH/user (GET)
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

  // === REGISTER NEW USER : PATH/user (POST)
  app.post("/user", async (req, res) => {
    try {
      let username = req.body.username || "";
      let email = req.body.email || "";
      let password = req.body.password || "";
      let contact = req.body.contact || "";
      let own_cars = req.body.own_cars || false;

      let formData = {
        username,
        email,
        password,
        contact,
        own_cars,
      };
      let validationResult = Validate.validateRegForm(formData);

      console.log("HASHED");
      formData.password = Password.hashedPassword(password);

      // console.log(username, email, password, contact, own_cars, own_cars);
      if (validationResult) {
        // register new user
        let result = await db.collection(COLLECTION).insertOne(formData);
        res.status(200);
        res.send("Testing");
      } else {
        res.status(401);
        res.send("Form Error");
      }
    } catch (error) {
      res.status(500);
      res.send("Error writing to DB");
    }
  });

  // === UPDATE EXISTING USER : PATH/user (PUT)
  app.put("/user/:userId", async (req, res) => {
    try {
      let username = req.body.username || "";
      let email = req.body.email || "";
      let contact = req.body.contact || "";

      let userId = req.params.userId || "";
      let [userData] = await db.collection(COLLECTION).find(
          { _id: ObjectId(userId) }
      ).toArray()
      console.log(userData)

      let formData = {
        username,
        email,
        contact,
      };
      let validationResult = Validate.validateUpdateForm(formData);

      console.log(formData);

      if (validationResult) {
        // update existing user
        await db.collection(COLLECTION).updateOne(
          {
              _id: ObjectId(userId)
          },
          {
              "$set": formData
          }
      );

        res.status(200);
        res.send("Testing");
      } else {
        res.status(401);
        res.send("Form Error");
      }
    } catch (error) {
      res.status(500);
      res.send("Error writing to DB");
    }
  });
}
main();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is running...", PORT);
});
