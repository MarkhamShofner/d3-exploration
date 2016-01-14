var playground = {
  svgAttr: {
    outerWidth: 500, //parseFloat(d3.select('.svgContain').style('width')),
    outerHeight: 500, //;parseFloat(d3.select('.svgContain').style('height')),
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

    filter1: "GDP growth (annual %)",
    filter2: "GNI per capita, PPP (current international $)",
    // filter2: "Foreign direct investment, net (BoP, current US$)",
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
  render: function(data1, data2) {
    var self = this;
    // set domains based on input data
    self.page.scales.xScale.domain(d3.extent(data2, function(d) {
      return d.value;
    }));
    self.page.scales.yScale.domain(d3.extent(data2, function(d) {
      return d.value;
    }));
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
      .attr("cx", function(d) {
        return self.page.scales.xScale(d.value);
      })
      .attr("cy",
        function(d) {
          return self.page.scales.yScale(d.value2);
        })
      .attr("r", 5);
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
    console.log(self);

    var url1 = 'http://localhost:3000/data1';
    var url2 = 'http://localhost:3000/data2';

    d3.json(url1, function (error, results) {

      var data1 = [];
      var data2 = [];
      // console.log(error);
      data1 = results[1];
      $.getJSON(url2, function(data) {
        // console.log(data);
        // console.log(data[1]);
        data2 = data[1];


        for (var i = 0; i<data1.length; i ++) {
          // console.log(data1[i]);
          data1[i]["value2"] = data2[i].value;
        }

        self.render(data1, data2);

        console.log(data1);
        console.log(data2);
      });
    });

    // // Import Data
    // d3.csv("./raw_data/Popular_indicators_Data0.csv", type, function(data) {
    //   data1 = [];
    //   data2 = [];
    //   console.log(data);
    //   for (var i = 0; i < data.length; i++) {
    //     if (self.filtered.filter1 === data[i]["Series Name"]) {
    //       data1.push(data[i]);
    //     } else if (self.filtered.filter2 === data[i]["Series Name"]) {
    //       data2.push(data[i]);
    //     } else {}
    //   }
    //
    //   for (var j = 0; j < data1.length; j++) {
    //     data1[j].second_filter = data2[j][self.filtered.yColumn];
    //   }
    //   console.log(data1);
    //   self.render(data1, data2);
    // });

    // set data #s/strings to floats
    // function type(d) {
    //   d[self.filtered.xColumn] = parseFloat(d[self.filtered.xColumn]);
    //   d[self.filtered.yColumn] = parseFloat(d[self.filtered.yColumn]);
    //   d[self.filtered.rColumn] = parseFloat(d[self.filtered.rColumn]);
    //   return d;
    // }

  },
  initialize: function() {
    this.setPlayground();
    this.retrieveData();
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



//all countries against one indicators
// http://api.worldbank.org/countries/all/indicators/SP.POP.TOTL?format=json




// function render (data1, data2) {
//   console.log(data1);
//   console.log(data2);
// }

//


// $.getJSONp(url, function( data ) {
//   console.log(data);
// });


// $.ajax({
//   type: "GET",
//   url: "http://localhost:3000/data",
//   data: {},
//   dataType: "json"
// })
//   .always(function(data,err){
//     console.log(data);
//     console.log(err);
//   })
//   .fail(function(err) {
//     console.log("error here");
//     // console.log(err);
//   })
//   ;
