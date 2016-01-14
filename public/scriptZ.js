var url1 = 'http://localhost:3000/data1';
var url2 = 'http://localhost:3000/data2';

//all countries against one indicators
// http://api.worldbank.org/countries/all/indicators/SP.POP.TOTL?format=json

var data1 = [];
var data2 = [];


function render (data1, data2) {
  console.log(data1);
  console.log(data2);
}

//
d3.json(url1, function (error, results) {
  // console.log(error);
  data1 = results[1];
  $.getJSON(url2, function(data) {
    // console.log(data);
    // console.log(data[1]);
    data2 = data[1];
    render (data1, data2);
  });
});

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
