var playground = {
  svgAttr: {
    outerWidth: 350, //parseFloat(d3.select('.svgContain').style('width')),
    outerHeight: 350, //;parseFloat(d3.select('.svgContain').style('height')),
    margin: {
      left: 90,
      right: 30,
      top: 90,
      bottom: 30
    },
    circleRadius: 2,
    rMin: 2,
    rMax: 7,
  },
  filtered: {
    xColumn: "2010 [YR2010]",
    yColumn: "2011 [YR2011]",
    rColumn: "2012 [YR2012]",
    colorColumn: "Series Name",
  },
  page: {
    scales: {},
  },
  setPlayground: function() {
    var innerWidth = outerWidth - this.svgAttr.margin.left - this.svgAttr.margin.right;
    var innerHeight = outerHeight - this.svgAttr.margin.top - this.svgAttr.margin.bottom;

    // create svg element based on set variable measures
    this.page.svg = d3.select("body").append("svg")
      .attr("width", this.svgAttr.outerWidth)
      .attr("height", this.svgAttr.outerHeight);
    // create g element in svg for axes
    this.page.g = this.page.svg.append("g")
      .attr("transform", "translate(" + this.svgAttr.margin.left + "," + this.svgAttr.margin.top + ")");
    this.page.xAxisG = this.page.g.append("g")
      .attr("transform", "translate(0," + innerHeight + ")");
    this.page.yAxisG = this.page.g.append("g");

    // set scales using size ranges for elements
    this.page.scales.xScale = d3.scale.linear().range([0, innerWidth]);
    this.page.scales.yScale = d3.scale.linear().range([innerHeight, 0]);
    this.page.scales.rScale = d3.scale.linear().range([this.svgAttr.rMin, this.svgAttr.rMax]);

    // set axes
    this.page.xAxis = d3.svg.axis().scale(this.page.scales.xScale).orient("bottom")
      .ticks(5); // Use approximately 5 ticks marks.
    // .tickFormat(d3.format("s")); // Use intelligent abbreviations, e.g. 5M for 5 Million
    // .outerTickSize(0);          // Turn off the marks at the end of the axis.
    this.page.yAxis = d3.svg.axis().scale(this.page.scales.yScale).orient("left");

  },
  render: function (data1, data2) {
    // set domains based on input data
    this.page.scales.xScale.domain(d3.extent(data1, function(d) {
      return d[xColumn];
    }));
    this.page.scales.yScale.domain(d3.extent(data2, function(d) {
      return d[yColumn];
    }));
    this.page.scales.rScale.domain(d3.extent(data1, function(d) {
      return d[rColumn];
    }));
    this.page.scales.colorScale = d3.scale.category20();

    // apply x/yAxis functionality to respective x/yAxisG group d3 element
    this.page.xAxisG.call(this.page.xAxis);
    this.page.yAxisG.call(this.page.yAxis);

    // Bind data
    circles = this.page.g.selectAll("circle").data(data1);
    // Enter
    circles.enter().append("circle");

    // Update
    circles
      .attr("cx", function(d) {
        return xScale(d[this.filtered.xColumn]);
      })
      .attr("cy",
        function(d) {
          return yScale(d.second_filter);
        })
      .attr("r",
        function(d) {
          return rScale(d[this.filtered.rColumn]);
        })
      .attr("fill",
        function(d) {
          return colorScale(d[this.filtered.colorColumn]);
        });

    // Exit
    circles.exit().remove();
  },
  retrieveData: function(){

  },
  initialize: function() {
    this.setPlayground();
    // this.retrieveData();
    // this.render();
  }
};

$(document).ready(function() {
  playground.initialize();
});


// var filter1 = function getField() {
//   console.log("filter1");
//   return d3.select("select").node().value;
// }();
//
// d3.select("select").on("change",function(){
//   var filter1 = this.getField();
// });
