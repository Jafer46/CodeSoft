const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//creating database connection
const dbconnection = async() => {
    try{
        const connect = mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "db connected",
        );
    }catch(err){
        console.log(err);
    }
}           


module.exports = dbconnection;