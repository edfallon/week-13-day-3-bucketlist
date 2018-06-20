const express = require('express');
const parser = require('body-parser');
const server = express();


server.use(parser.json());
server.use(parser.urlencoded({extended: true}));
server.use(express.static("client/build"));

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017",
function(err, client){
  if(err){// checking if there is an error
    console.log(err);
    return;
  }

const db = client.db("bucket_list");//connecting to the database
 console.log("Connected to database!");





server.listen(3000, function(){// starts the server when you are econnected to the database
  console.log("Listening on port 3000");
});

});
