// base size/positioning variables
var outerWidth = 500;
var outerHeight = 500;
var margin = { left: 90, top: 30, right: 90, bottom: 30 };
var circleRadius = 2;

// tethering size of the circle to another variable
var rMin = 2;
var rMax = 7;

var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

// dataset columns
var xColumn = "2010 [YR2010]";
var yColumn = "2011 [YR2011]";
var rColumn = "2012 [YR2012]";
var colorColumn = "Series Name";

// filtered rows
var filter1 = "GDP growth (annual %)";
var filter2 = "GNI per capita, PPP (current international $)";
var filter3 = "Foreign direct investment, net (BoP, current US$)";
var filter1 = "Internet users (per 100 people)";

// create svg element based on set variable measures
var svg = d3.select("body").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);
// create g element in svg for axes
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xAxisG = g.append("g")
  .attr("transform", "translate(0," + innerHeight + ")");
var yAxisG = g.append("g");

// set scales using size ranges for elements
var xScale = d3.scale.linear().range([0, innerWidth]);
var yScale = d3.scale.linear().range([innerHeight, 0]);
var rScale = d3.scale.linear().range([rMin, rMax]);

// set axes
var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
  .ticks(5);                   // Use approximately 5 ticks marks.
  // .tickFormat(d3.format("s")); // Use intelligent abbreviations, e.g. 5M for 5 Million
  // .outerTickSize(0);          // Turn off the marks at the end of the axis.
var yAxis = d3.svg.axis().scale(yScale).orient("left");

//render data
function render(data) {
  // set domains based on input data
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

  // apply x/yAxis functionality to respective x/yAxisG group d3 element
  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  // Bind data
  var circles = g.selectAll("circle").data(data);
  // Enter
  circles.enter().append("circle");

  // Update
  circles
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

// Import Data
d3.csv("./raw_data/Popular_indicators_Data.csv", type, function(data) {
  data1 = [];
  for (var i = 0; i < data.length; i++) {
    if (filter1 === data[i]["Series Name"]) {
      data1.push(data[i]);
    } else {}
  }
  console.log(data1);
  render(data1);
});

// set data #s/strings to floats
function type(d) {
  d[xColumn] = parseFloat(d[xColumn]);
  d[yColumn] = parseFloat(d[yColumn]);
  d[rColumn] = parseFloat(d[rColumn]);
  return d;
}
