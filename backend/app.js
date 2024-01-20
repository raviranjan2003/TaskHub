const express = require('express');

const app = express();
app.use(express.json());


app.use("/",require("./routes/index"));

app.listen("8000",()=>{
    console.log("Server is listening at port 8000")
})