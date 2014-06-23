$(document).ready(function() {

  $("input").change(function() {
    var username = $(this).val();
    var all_repos = $.get("https://api.github.com/users/" + username + "/repos")
      .done(function(data) {
        window.names = getNames(data);
        getCommits(window.names, username, function(commits) {
          console.log(commits);
        });


        console.log(names)

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
  d3.select(".repos-chart").selectAll("div")
    .data(data)
    .enter()
    .append("div")
    .attr("class", "bar")
}
