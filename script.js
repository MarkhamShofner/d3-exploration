// var scale = d3.scale.linear()
//   .domain([0, 1])
//   .range([0, 100]);

var outerWidth = 350;
var outerHeight = 350;
var circleRadius = 2;
var xColumn = "2010 [YR2010]";
var yColumn = "2011 [YR2011]";

var svg = d3.select("body").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);

var xScale = d3.scale.linear().range([0, outerWidth]);
var yScale = d3.scale.linear().range([outerHeight, 0]);

function render(data) {
  xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
  yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));

  // Bind data
  var circles = svg.selectAll("circle").data(data);
  // Enter
  circles.enter().append("circle")
    .attr("r", 3);
  // Update
  circles
    .attr("cx", function(d) {
      return xScale(d["2010 [YR2010]"]);
    })
    .attr("cy", function(d) {
      return yScale(d["2011 [YR2011]"]);
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
  d["2010 [YR2010]"] = parseFloat(d["2010 [YR2010]"]);
  d["2011 [YR2011]"] = parseFloat(d["2011 [YR2011]"]);
  // console.log(d["2010"]);
  return d;
}
