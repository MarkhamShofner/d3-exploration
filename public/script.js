// set up an object that represents the future action in the svg playground
var playground = {
  svgAttr: {
    outerWidth: 650, //parseFloat(d3.select('.svgContain').style('width')),
    outerHeight: 650, //parseFloat(d3.select('.svgContain').style('height')),
    margin: {
      left: 90,
      right: 90,
      top: 40,
      bottom: 50
    },
    circleRadius: 4,
  },
  //static choices pre-user selections
  filtered: {
    filter1: "IT.NET.USER.P2",
    filter2: "IT.NET.USER.P2",
  },
  page: {
    scales: {},
  },
  setPlayground: function() {
    var innerWidth = this.svgAttr.outerWidth - this.svgAttr.margin.left - this.svgAttr.margin.right;
    var innerHeight = this.svgAttr.outerHeight - this.svgAttr.margin.top - this.svgAttr.margin.bottom;

    // create svg element based on set variable measures
    this.page.svg = d3.select(".svgEl").append("svg")
      .attr("width", this.svgAttr.outerWidth)
      .attr("height", this.svgAttr.outerHeight);
    // create g element in svg for axes
    this.page.g = this.page.svg.append("g")
      .attr("transform", "translate(" + this.svgAttr.margin.left + "," + this.svgAttr.margin.top + ")");
    this.page.xAxisG = this.page.g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight + ")");
    this.page.yAxisG = this.page.g.append("g")
      .attr("class", "y axis");

    // set scales using size ranges for elements
    this.page.scales.xScale = d3.scale.linear().range([0, innerWidth]);
    this.page.scales.yScale = d3.scale.linear().range([innerHeight, 0]);

    // set axes
    this.page.xAxis = d3.svg.axis().scale(this.page.scales.xScale).orient("bottom")
      .ticks(4)
      .tickFormat(d3.format("s")) // Use intelligent abbreviations, e.g. 5M for 5 Million
      .outerTickSize(0); // Turn off the marks at the end of the axis.
    this.page.yAxis = d3.svg.axis().scale(this.page.scales.yScale).orient("left")
      .tickFormat(d3.format("s"))
      .outerTickSize(0);

    // set axes labels
    this.page.xAxisLabel = this.page.svg.append('text').attr('class', 'axisTitle')
      .attr('transform', 'translate(' + (this.svgAttr.outerWidth / 2) + ',' + (this.svgAttr.outerHeight - 10) + ')')
      .attr('text-anchor', 'middle');
    this.page.yAxisLabel = this.page.svg.append('text').attr('class', 'axisTitle')
      .attr('transform', 'translate(' + (20) + ',' + (this.svgAttr.outerHeight / 2) + ')rotate(-90)')
      .attr('text-anchor', 'middle');

    // assign infoBox html property to object
    this.page.infoBox = d3.select(".infoBox");
  },
  // lots of help from chase gruber in this portion
  render: function(data1) {
    var self = this;
    // set domains based on input data
    self.page.scales.xScale.domain(d3.extent(data1, function(d) {
      return d.value;
    }));
    self.page.scales.yScale.domain(d3.extent(data1, function(d) {
      return d.value2;
    }));

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
      .attr("r", this.svgAttr.circleRadius);

    // add listeners for mouseover event to call hover function
    circles
      .on("mouseover", function(d) {
        self.entityHover(d);
      });

    // adjust axes labels to match filtered options
    this.page.xAxisLabel.text($("#firstFilter option:selected" ).text());
    this.page.yAxisLabel.text($("#secondFilter option:selected" ).text());

    // Exit
    circles.exit().remove();
  },
  // function to make calls to WB API
  retrieveData: function() {
    var self = this;
    var url1 = 'http://localhost:3000/data/' + this.filtered.filter1;
    var url2 = 'http://localhost:3000/data/' + this.filtered.filter2;
    // var url1 = 'https://worldbankindicators.herokuapp.com/data/' + this.filtered.filter1;
    // var url2 = 'https://worldbankindicators.herokuapp.com/data/' + this.filtered.filter2;

    // make calls to retrieve world bank data
    d3.json(url1, function(error, results) {
      var data1 = [];
      var data2 = [];
      data1 = results[1];
      // augment the first call's data using data from the second call
      $.getJSON(url2, function(data) {
        data2 = data[1];
        dataC = [];
        for (var i = 0; i < data1.length; i++) {
          data1[i].value2 = data2[i].value;
          data1[i].value = parseFloat(data1[i].value);
          data1[i].value2 = parseFloat(data1[i].value2);
          if (!isNaN(data1[i].value) && !isNaN(data1[i].value2)) {
            console.log("true values");
            dataC.push(data1[i]);
          }
        }
        console.log("break");
        self.render(dataC);
      });
    });

  },
  // retrieve dropdown options
  getFirstField: function() {
    return d3.select("#firstFilter").node().value;
  },
  getSecondField: function() {
    return d3.select("#secondFilter").node().value;
  },
  // set listeners to retriever data (and then render) when a filter changes
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
  // display related information based on hover
  entityHover: function(d) {
    var self = this;
    var infoBox = playground.page.infoBox;
    infoBox.style("display", "block");
    infoBox.select(".entity").text(d.country.value);
    infoBox.select(".indicator2").text("Y: " + d3.round(d.value2, 2)); //self.filtered.filter2);
    infoBox.select(".indicator1").text("X: " + d3.round(d.value, 2)); //self.filtered.filter1);
  },
  // initialize the playground and make first call
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
