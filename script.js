//
//
// var myArrayOfObjects = [
//   { x: 100, y: 100},
//   { x: 130, y: 120},
//   { x: 80 , y: 180},
//   { x: 180, y: 80 },
//   { x: 180, y: 40 }
// ];
//
// myArrayOfObjects.forEach(function (d){
//   console.log(d.x + ", " + d.y);
// });


// "Data Source","World Development Indicators",
// "Last Updated Date","2015-12-22",
d3.csv("./raw_data/test_Aruba.csv", type, function (myArrayOfObjects){
  myArrayOfObjects.forEach(function (d){
    console.log(d["Country Name"] + " " + d["Indicator Name"] + ": " + d["2010"]);
  });
});

function type(d){
  // d["Indicator Name"] = parseFloat(d["Indicator Name"]);
  d["2010"] = parseFloat(d["2010"]);
  // console.log(d["2010"]);
  return d;
}
