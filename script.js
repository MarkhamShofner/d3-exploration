var playground = {
  self: this,
  // base size/positioning variables
  outerWidth: 500,
  outerHeight: 500,
  margin: {
    left: 90,
    top: 30,
    right: 90,
    bottom: 30
  },
  circleRadius: 2,

  // tethering size of the circle to another variable
  rMin: 2,
  rMax: 7,

  // TODO figure out self referential nature here
  // innerWidth: outerWidth - self.margin.left - self.margin.right,
  // innerHeight: outerHeight - self.margin.top - self.margin.bottom,

  // dataset columns
  xColumn: "2010 [YR2010]",
  yColumn: "2011 [YR2011]",
  rColumn: "2012 [YR2012]",
  colorColumn: "Series Name",

  // filtered rows
  filter2: "GDP growth (annual %)",
  filter1: "GNI per capita, PPP (current international $)",
  // filter2: "Foreign direct investment, net (BoP, current US$)",


  initialize: function(){

  }
};



// $(document).ready(function(){
//   playground.initialize();
// });

//
//
//
// var filter1 = function getField() {
//   console.log("filter1");
//   return d3.select("select").node().value;
// }();
//
// d3.select("select").on("change",function(){
//   var filter1 = this.getField();
// });
//
//
//
// // create svg element based on set variable measures
// var svg = d3.select("body").append("svg")
//   .attr("width", outerWidth)
//   .attr("height", outerHeight);
// // create g element in svg for axes
// var g = svg.append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// var xAxisG = g.append("g")
//   .attr("transform", "translate(0," + innerHeight + ")");
// var yAxisG = g.append("g");
//
// // set scales using size ranges for elements
// var xScale = d3.scale.linear().range([0, innerWidth]);
// var yScale = d3.scale.linear().range([innerHeight, 0]);
// var rScale = d3.scale.linear().range([rMin, rMax]);
//
// // set axes
// var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
//   .ticks(5); // Use approximately 5 ticks marks.
// // .tickFormat(d3.format("s")); // Use intelligent abbreviations, e.g. 5M for 5 Million
// // .outerTickSize(0);          // Turn off the marks at the end of the axis.
// var yAxis = d3.svg.axis().scale(yScale).orient("left");
//
// //render data
// function render(dataS, data1, data2) {
//   // set domains based on input data
//   xScale.domain(d3.extent(data1, function(d) {
//     return d[xColumn];
//   }));
//   yScale.domain(d3.extent(data2, function(d) {
//     return d[yColumn];
//   }));
//   rScale.domain(d3.extent(data1, function(d) {
//     return d[rColumn];
//   }));
//   var colorScale = d3.scale.category20();
//
//   // apply x/yAxis functionality to respective x/yAxisG group d3 element
//   xAxisG.call(xAxis);
//   yAxisG.call(yAxis);
//
//   // var data = [data1, data2];
//
//   // Bind data
//   var circles = g.selectAll("circle").data(data1);
//   // Enter
//   circles.enter().append("circle");
//
//   // Update
//   circles
//     .attr("cx", function(d) {
//       return xScale(d[xColumn]);
//     })
//     .attr("cy",
//       function(d) {
//         return yScale(d.second_filter);
//       })
//     .attr("r",
//       function(d) {
//         return rScale(d[rColumn]);
//       })
//     .attr("fill",
//       function(d) {
//         return colorScale(d[colorColumn]);
//       });
//
//   // Exit
//   circles.exit().remove();
// }
//
//
// // Data from database: World Development Indicators
// // Last Updated: 12/22/2015
//
// // Import Data
// d3.csv("./raw_data/Popular_indicators_Data0.csv", type, function(data) {
//   data1 = [];
//   data2 = [];
//   for (var i = 0; i < data.length; i++) {
//     if (filter1 === data[i]["Series Name"]) {
//       data1.push(data[i]);
//     } else if (filter2 === data[i]["Series Name"]) {
//       data2.push(data[i]);
//     } else {}
//   }
//   // console.log(data1);
//   // console.log(data2);
//   dataS = [];
//   for (var j = 0; j < data1.length; j++) {
//     data1[j].second_filter = data2[j][yColumn];
//   }
//   console.log(data1);
//   render(dataS, data1, data2);
// });
//
// // set data #s/strings to floats
// function type(d) {
//   d[xColumn] = parseFloat(d[xColumn]);
//   d[yColumn] = parseFloat(d[yColumn]);
//   d[rColumn] = parseFloat(d[rColumn]);
//   return d;
// }
