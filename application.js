$(document).ready(function() {

  $("input").change(function() {
    var username = $(this).val();
    var all_repos = $.get("https://api.github.com/users/" + username + "/repos")
      .done(function(data) {
        window.names = getNames(data);
        getCommits(window.names, username, function(commits) {
          drawChart(commits); 
        });
      });
  });
});

function getNames(data) {
  var names = [];
  for (var i = 0; i < data.length; i++) {
    names.push(data[i]["name"])
  }

  return names;
}

function getCommits(names, user, callback) {
  var count = names.length,
      curr = 0,
      acc = []

  for (var i = 0; i < names.length; i++) {
    $.get("https://api.github.com/repos/" + user + "/" + names[i] + "/commits")
      .done(function(data) {
        acc.push(data.length),
        curr++;
        if (curr === count) {
          callback(acc);
        }
      });
  }
}

function drawChart(data) {
  var w = 500;
  var h = 100;
  var padding = 1;

  var svg = drawSVG(w, h);
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("x", function(d,i) {
      return i * (w / data.length) 
    })
    .attr("y", function(d){
      return h - d;
    })
    .attr("height", function(d) {
      return d;
    })
    .attr("width", w / data.length - padding);

    drawLabels(w,h,data,svg);
}

function drawSVG(w, h) {
  var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  return svg;
}

function drawLabels(w,h,data,svg) {
  svg.selectAll("text") 
     .data(data)
     .enter()
     .append("text")
     .text(function(d) {
       return d;
     })
    .attr("x", function(d,i) {
      return i * (w / data.length) + (w / data.length / 2)
    })
    .attr("y", function(d){
      return h - d;
    })
    .attr("font-size", "11px")
}

