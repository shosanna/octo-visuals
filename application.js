$(document).ready(function(){
  // styling all the headings with pink color
  d3.selectAll("h1").style("color", "#ef7591");
  
  var dataset = [1, 33, 42, 24, 8]
  d3.select(".col-md-8").selectAll("p")
                   .data(dataset)
                   .enter()
                   .append("p")
                   .text(function(d) { return d; });
  
});
