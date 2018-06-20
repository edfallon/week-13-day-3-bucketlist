const express = require('express');
const parser = require('body-parser');
const server = express();


server.use(parser.json());
server.use(parser.urlencoded({extended: true}));
server.use(express.static("client/build"));

const MongClient = require("mongodb").MongClient;

MongoClient.connect("mongodb://localhost:27017",
function(err, client){
  if(err){
    console.log(err);
    return;
  }

const db = client.db(“bucket_list”);
 console.log(“Connected to database!“);






server.listen(3000, function(){
  console.log(“Listening on port 3000”);
});

});
