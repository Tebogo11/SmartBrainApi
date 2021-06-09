const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
//Database Packages
const knex = require("knex");
//controllers
const registor = require("./Controllers/registor");
const signin = require("./Controllers/signin");
const profile = require("./Controllers/profile");
const image = require("./Controllers/image");
//Database connectivity
const dbpsql = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "passdaword",
    database: "smartbrain",
  },
});

//Dont trust secruity from other software(even your own)
//always check

// middleware
app.use(express.json());
app.use(cors());
app.post(
  "/signin",
  // dependency injection -> adding needed dependency
  signin.handleSignIn(dbpsql, bcrypt)
  //this will work the same as the other functions
  //just shorter
  //(req,res) will be passed to the function
);
app.post("/registor", (req, res) => {
  // dependency injection -> adding needed dependency
  registor.handleRegistor(req, res, dbpsql, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  // dependency injection -> adding needed dependency
  profile.handleFindProfile(req, res, dbpsql);
});
app.put("/image", (req, res) => {
  // dependency injection -> adding needed dependency
  image.handleImageInput(req, res, dbpsql);
});
app.post("/imageUrl", (req, res) => {
  // dependency injection -> adding needed dependency
  image.handleApiCall(req, res);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Smart Brain API Server is running on port ${PORT}`);
});

// /--> res = this is working
// /signin-- > POST = success /finally
// /register --> POST = user
// /profile/:userid -> GET = user
// /image --> PUT -> user(updated rank)
//we use a post for signin to hide the password in the body
