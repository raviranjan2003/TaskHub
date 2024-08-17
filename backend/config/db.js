const mongoose = require('mongoose');

const connectDb = () => {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected !");
    })
    .catch(err => console.log("DB connection issues ", err));
}

module.exports = connectDb;