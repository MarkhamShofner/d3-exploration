var express = require("express");
var request = require("request");
var cors = require("cors");

var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/data", cors(), function (req, res) {

  request("http://api.worldbank.org/country?per_page=1000&format=json", function (err, data) {
    var parsed = JSON.parse(data.body);
    res.json(parsed);
  });
});

app.listen(3000, function(){
  console.log("listening on port 3k");
});

// write separate routes if know which data sets are needed

// also possible to pass back variables to use in the API call
