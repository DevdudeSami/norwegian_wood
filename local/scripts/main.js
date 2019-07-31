var random = [
  "live long and prosper",
  "do or do not, there is not try",
  "hello, world",
  "hello, cosmos"
];

$(function() {
  $("#search").focus();
  $("#search").on('keydown', function (e) {
    if (e.keyCode == 13) search();
  });

  $("#search").attr("placeholder", (random[getRandomInt(random.length)]))
});

function search() {
  var searchTerm = $("#search").val().toLowerCase();
  let filteredLinks = links.filter(l => l.title == searchTerm);
  if(filteredLinks.length != 0) {
    window.location = filteredLinks[0].link;
    return;
  }

  if(isURL(searchTerm)) window.location.href = processURL(searchTerm);
  else window.location.href = `http://www.google.com/search?q=${searchTerm}`;
}

function goToBookmark(url) {
  window.location = url;
}

function processURL(url) {
  if(url.substring(0, 7) != "http://" && url.substring(0, 8) != "https://") {
    return "http://" + url;
  }

  return url;
}

function isURL(string) {
    var urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    return urlRegex.test(string)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
