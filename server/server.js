const express = require("express");
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user  = require("./routes/User");
require('dotenv').config()  

const app  = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api/user',user);

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT,async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected")
      } catch (error) {
        console.error(error);
      }
    console.log("server running on ", PORT)
})