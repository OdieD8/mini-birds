var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongo = require("mongojs");
var ObjectId = mongo.ObjectId;
var Bird = require("./birdsModel");

Bird.find({}, function(err, results){
    
});

var newBird = new Bird({
    scientificName: "Genus Menus Birdus Maximus",
    color: "Blood Red",
    region: "Sparta",
    firstSightingEver: "09/01/1901",
    food: "bird seed",
    foodDetais: [{
        name: "seed",
        type: "food",
        genus: "genus"
    }],
    wingspan: 5,
    endangered: true,
    nest: {
        materials: ["woodchips","grass"],
        size: 7,
        timeToBuild: 2,
        locationDesc: "Hill"
    }
});  

newBird.save(newBird, function(err, results) {
   console.log("New Bird Saved"); 
});
                      
var app = express();
var db = mongo("birdsDB");

app.use(bodyParser.json());
app.use(cors());
var sightings = db.collection("sightings");

app.post("/api/sighting", function(req, res, next) {
    sightings.insert(req.body, function(err, results) {
        if(err) res.send(err);
        else res.send(results);
        });
    });
app.get("/api/sighting", function(req, res, next) {
    sightings.find(req.query, function(err, results) {
        if(err) res.send(err);
        else res.send(results);
        });
    });
app.put("/api/sighting", function(req, res, next) {
    console.log(req.query);
    console.log(req.body);
    sightings.update({ _id: ObjectId(req.query._id) }, {$set: req.body}, function(err, results) {
        if(err) res.send(err);
        else res.send(results);
        });
    });
app.delete("/api/sighting", function(req, res, next) {
    sightings.remove({ _id: ObjectId(req.query._id)}, function(err, results) {
        if(err) res.send(err);
        else res.send(results);
        });
    });









var port = 8500;
app.listen(port, function() {
    console.log("listening on port:", port);
});