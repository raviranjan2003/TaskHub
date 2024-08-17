require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/",require("./routes"));

app.listen("8000",()=>{
    console.log("Server is listening at port 8000")
    connectDb();
})