const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const dbconnection = async() => {
    try{
        const connect = mongoose.connect(process.env.CONNECTIONSTRING);
        console.log(
            "db connected",
        );
    }catch(err){
        console.log(err);
    }
    
}           


module.exports = dbconnection;