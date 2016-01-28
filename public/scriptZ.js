// set up an object that represents the future action in the svg playground
var playground = {
  svgAttr: {
    outerWidth: 500, //parseFloat(d3.select('.svgContain').style('width')),
    outerHeight: 500, //parseFloat(d3.select('.svgContain').style('height')),
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
    //static choices pre-user selections
    filter1: "NY.GDP.MKTP.KD.ZG",
    filter2: "NY.GDP.MKTP.KD.ZG",
  },
  page: {
    scales: {},
  },
  setPlayground: function() {
    var innerWidth = this.svgAttr.outerWidth - this.svgAttr.margin.left - this.svgAttr.margin.right;
    var innerHeight = this.svgAttr.outerHeight - this.svgAttr.margin.top - this.svgAttr.margin.bottom;

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
  render: function(data1) {
    var self = this;
    // set domains based on input data
    self.page.scales.xScale.domain(d3.extent(data1, function(d) {
      return d.value;
    }));
    self.page.scales.yScale.domain(d3.extent(data1, function(d) {
      // console.log(d.value2);
      return d.value2;
    }));
    // console.log(self.page.scales.xScale.domain());
    // console.log(self.page.scales.yScale.domain());

    // self.page.scales.rScale.domain(d3.extent(data1, function(d) {
    //   return d.value;
    // }));
    // self.page.scales.colorScale = d3.scale.category20();

    // apply x/yAxis functionality to respective x/yAxisG group d3 element
    self.page.xAxisG.call(self.page.xAxis);
    self.page.yAxisG.call(self.page.yAxis);

    // Bind data
    circles = self.page.g.selectAll("circle").data(data1);
    // Enter
    circles.enter().append("circle");

    // Update
    circles
      .transition().duration(1000)
      .attr("cx", function(d) {
        return self.page.scales.xScale(d.value);
      })
      .attr("cy",
        function(d) {
          return self.page.scales.yScale(d.value2);
        })
      .attr("r", 5);

    circles
      .on("mouseover", function(d){
        console.log(d);
        // create viz div based on d
      });
    // function(d) {
    //   return self.page.scales.rScale(d.value);
    // });
    // .attr("fill",
    //   function(d) {
    //     return self.page.scales.colorScale(d[self.filtered.colorColumn]);
    //   });

    // Exit
    circles.exit().remove();
  },
  retrieveData: function() {
    var self = this;
    var url1 = 'http://localhost:3000/data/' + this.filtered.filter1;
    var url2 = 'http://localhost:3000/data/' + this.filtered.filter2;
    // var url1 = 'https://worldbankindicators.herokuapp.com/data/' + this.filtered.filter1;
    // var url2 = 'https://worldbankindicators.herokuapp.com/data/' + this.filtered.filter2;

    d3.json(url1, function(error, results) {
      var data1 = [];
      var data2 = [];
      data1 = results[1];
      $.getJSON(url2, function(data) {
        data2 = data[1];
        for (var i = 0; i < data1.length; i++) {
          data1[i]["value2"] = data2[i].value;
        }
        self.render(data1);
      });
    });

  },
  getFirstField: function() {
    return d3.select("#firstFilter").node().value;
  },
  getSecondField: function() {
    return d3.select("#secondFilter").node().value;
  },
  changeListen1: function() {
    var self = this;
    d3.select("#firstFilter").on("change", function() {
      self.filtered.filter1 = self.getFirstField();
      self.retrieveData();
    });
  },
  changeListen2: function() {
    var self = this;
    d3.select("#secondFilter").on("change", function() {
      self.filtered.filter2 = self.getSecondField();
      self.retrieveData();
    });
  },
  initialize: function() {
    this.setPlayground();
    this.retrieveData();
    this.changeListen1();
    this.changeListen2();
  }
};

$(document).ready(function() {
  playground.initialize();
});
