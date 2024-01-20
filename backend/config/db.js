const mongoose = require('mongoose');

const connectDb = () => {
    mongoose
    .connect("mongodb+srv://ravidemo3:Ravi2003@cluster0.drwb5mc.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>{
        console.log("MongoDB connected !");
    })
    .catch(err => console.log("DB connection issues ", err));
}

module.exports = connectDb;