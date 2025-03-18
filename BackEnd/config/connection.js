const mongoose = require ('mongoose');

require('dotenv').config();

const dbconnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');
    }
    catch(e){
        console.log("Error:",e)
        process.exit(1);
    }
}

module.exports  = dbconnect;