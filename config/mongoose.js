const mongoose = require('mongoose');
const secure = require('./secure');

// connect to the mongodb database
mongoose.connect(secure.mongoUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting to the db"));

db.once('open', ()=>{
    console.log("database successfull connected to mongodb")
})

module.exports=db;