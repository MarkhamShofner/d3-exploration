
// var scale = d3.scale.linear()
//   .domain([0, 1])
//   .range([0, 100]);

var svg = d3.select("body").append("svg")
  .attr("width", 350)
  .attr("height", 350);

var rect = svg.append("rect")
  .attr("width", 20)
  .attr("height", 20);

function render(data) {
  // Bind data
  var circles = svg.selectAll("circle").data(data);

  // Enter
  circles.enter().append("circle")
    .attr("r", 10);

  // Update
  circles
    .attr("cx", function(d) {
      return d["2015"];
    })
    .attr("cy", 50);
    // .attr("cy", function(d) {
    //   return d.y;
    // });

  // Exit
  circles.exit().remove();
}



// "Data Source","World Development Indicators",
// "Last Updated Date","2015-12-22",

d3.csv("./raw_data/12-22-2015_data.csv", type, function(myArrayOfObjects) {
  myArrayOfObjects.forEach(function(d) {
    if (d["Indicator Name"] === "Population, ages 0-14 (% of total)") {
      console.log(d["Country Name"] + " " + d["Indicator Name"] + ": " + d["2010"]);
      render(d["2010"]);
    }
  });
  render(myArrayOfObjects);
});

function type(d) {
  // d["Indicator Name"] = parseFloat(d["Indicator Name"]);
  d["2010"] = parseFloat(d["2010"]);
  // console.log(d["2010"]);
  return d;
}
