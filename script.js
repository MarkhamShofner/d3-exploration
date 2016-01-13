
var outerWidth = 500;
var outerHeight = 500;
var circleRadius = 2;
var xColumn = "2010 [YR2010]";
var yColumn = "2011 [YR2011]";
var rColumn = "2012 [YR2012]";
var colorColumn = "Series Name";
// var filter1 = "Foreign direct investment, net (BoP, current US$)";

// tethering size of the circle to another variable
var rMin = 2;
var rMax = 7;

var svg = d3.select("body").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);

var xScale = d3.scale.linear().range([0, outerWidth]);
var yScale = d3.scale.linear().range([outerHeight, 0]);
var rScale = d3.scale.linear().range([rMin, rMax]);

function render(data) {
  xScale.domain(d3.extent(data, function(d) {
    return d[xColumn];
  }));
  yScale.domain(d3.extent(data, function(d) {
    return d[yColumn];
  }));
  rScale.domain(d3.extent(data, function(d) {
    return d[rColumn];
  }));
  var colorScale = d3.scale.category20();

  // Bind data
  var circles = svg.selectAll("circle").data(data);
  // Enter
  circles.enter().append("circle");
  // .attr("r", 3);

  // Update
  circles
    // TODO - figure out how to bring in GDP, also to scale the domains based on filters
    // .filter(function(d) {
    //   return filter1 === d["Series Name"];
    // })
    .attr("cx", function(d) {
      return xScale(d[xColumn]);
    })
    .attr("cy",
    function(d) {
      return yScale(d[yColumn]);
    })
    .attr("r",
    function(d) {
      return rScale(d[rColumn]);
    })
    .attr("fill",
    function(d) {
      return colorScale(d[colorColumn]);
    });


  // Exit
  circles.exit().remove();
}


// Data from database: World Development Indicators
// Last Updated: 12/22/2015

d3.csv("./raw_data/Popular_indicators_Data.csv", type, function(data) {
  render(data);
});

function type(d) {
  // d["Indicator Name"] = parseFloat(d["Indicator Name"]);
  d[xColumn] = parseFloat(d[xColumn]);
  d[yColumn] = parseFloat(d[yColumn]);
  d[rColumn] = parseFloat(d[rColumn]);
  return d;
}
