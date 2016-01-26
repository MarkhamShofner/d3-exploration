var express = require("express");
var request = require("request");
var cors = require("cors");

var app = express();

app.use(express.static(__dirname + "/public"));



app.get("/data/:id", cors(), function (req, res) {

  request("http://api.worldbank.org/countries/all/indicators/" + req.params.id +"?per_page=10000&format=json&MRV=1", function (err, data) {
    console.log(err);
    console.log(data);
    var parsed = JSON.parse(data.body);
    res.json(parsed);
  });
});


app.get("/data1", cors(), function (req, res) {

  request("http://api.worldbank.org/countries/all/indicators/SP.DYN.LE00.IN?per_page=10000&format=json&MRV=1", function (err, data) {
    var parsed = JSON.parse(data.body);
    res.json(parsed);
  });
});

app.get("/data2", cors(), function (req, res) {

  request("http://api.worldbank.org/countries/all/indicators/IT.NET.USER.P2?per_page=10000&format=json&MRV=1", function (err, data) {
    var parsed = JSON.parse(data.body);
    res.json(parsed);
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on port 3k");
});
