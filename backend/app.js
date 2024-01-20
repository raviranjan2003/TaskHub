const express = require('express');
const connectDb = require('./config/db');

const app = express();
app.use(express.json());


app.use("/",require("./routes"));

app.listen("8000",()=>{
    console.log("Server is listening at port 8000")
    connectDb();
})