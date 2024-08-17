require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use("/",require("./routes"));

app.listen("8000",()=>{
    console.log("Server is listening at port 8000")
    connectDb();
})