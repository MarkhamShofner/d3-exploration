var url = 'http://api.worldbank.org/country?per_page=1000&format=json';
//
// d3.json(url, function (error, results) {
//   // var bars = canvas.selectAll("select")
//   //   .data(results.data)
//   //   .enter()
//   //     .append("rect")
//   //     .attr("width", function(d) { return widthScale(d.totalHits); })
//   //     .attr("height", 50)
//   //     .attr("y", function(d, i){return i*70;});
//   console.log(results);
//   console.log(error);
// });

// $.getJSONp(url, function( data ) {
//   console.log(data);
// });

$.ajax({
  type: "GET",
  url: "http://localhost:3000/data",
  data: {},
  dataType: "json"
})
  .always(function(data,err){
    console.log(data);
    console.log(err);
  })
  .fail(function(err) {
    console.log("error here");
    // console.log(err);
  })
  ;
