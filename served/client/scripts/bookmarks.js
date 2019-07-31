var linksDiv;
var links;

var editingBookmarkID = null;

$(function() {
  linksDiv = $("#links");

  links = JSON.parse(window.localStorage.getItem("bookmarks"));
  console.log(links);
  linksRecieved(links);

  getLinks();

  $("#bookmarkSection").on('keydown', function (e) {
    if (e.keyCode == 13) addBookmark();
  });
});

function displayLinks(sections) {
  if (localStorage.getItem("bookmarks") === null) { return; }

  linksDiv.html("");

  Object.keys(sections).forEach(key => {
    var sectionComponent = $(`<div class="bookmarksSection" id="${key}"><h3>${key}</h3></div>"`);

    sections[key].forEach(bookmark => {
      var linkComponent = $(`<span class="link"><img src="https://www.google.com/s2/favicons?domain=${bookmark.link}" /><a href="${bookmark.link}">${bookmark.title}</a></span>`);

      var editButton = $(`<span class="linkButton" id="editButton")>e</span>`);
      editButton.hide();
      editButton.click(function() {
        startEditingBookmark(bookmark);
      })
      editButton.appendTo(linkComponent);

      var deleteButton = $(`<span class="linkButton" id="deleteButton")>x</span>`);
      deleteButton.hide();
      deleteButton.click(function() {
        removeBookmark(bookmark.id);
      })
      deleteButton.appendTo(linkComponent);

      linkComponent.hover(
        function(){ $(this).children(".linkButton").show(); },
        function(){ $(this).children(".linkButton").hide(); }
      );

      linkComponent.appendTo(sectionComponent);
    })

    sectionComponent.appendTo(linksDiv);
  });
}

function getLinks() {
  $.ajax({
    type: "POST",
    url: serverUrl + "bookmarks",
    data: {
      key
    },
    success: linksRecieved,
  });
}

function linksRecieved(ls) {
  $("#search").focus();

  window.localStorage.setItem("bookmarks", JSON.stringify(ls));

  var linksWithSections = {};
  var foundSections = [];
  
  links = ls;

  autocomplete(document.getElementById("search"), links);

  for(var i in links) {
    if(foundSections.includes(links[i].section)) {
      linksWithSections[links[i].section].push(links[i]);
    } else {
      linksWithSections[links[i].section] = [links[i]];
      foundSections.push(links[i].section);
    }
  }

  displayLinks(linksWithSections);
}

function addBookmark() {
  if(editingBookmarkID !== null) {
    editBookmark(editingBookmarkID);
    return;
  }

  var title = $("#bookmarkTitle").val();
  var link = $("#bookmarkLink").val();
  var section = $("#bookmarkSection").val();

  $.ajax({
    type: "POST",
    url: serverUrl + "bookmarks/add",
    data: {
      key,
      bookmark: {title, link, section}
    },
    success: getLinks,
  });
  
  $("#bookmarkTitle").val("");
  $("#bookmarkLink").val("");
  $("#bookmarkSection").val("");
}

function startEditingBookmark(bookmark) {
  editingBookmarkID = bookmark.id;
  $("#bookmarkTitle").val(bookmark.title);
  $("#bookmarkLink").val(bookmark.link);
  $("#bookmarkSection").val(bookmark.section);
}

function editBookmark(id) {
  var title = $("#bookmarkTitle").val();
  var link = $("#bookmarkLink").val();
  var section = $("#bookmarkSection").val();

  $.ajax({
    type: "POST",
    url: serverUrl + "bookmarks/edit",
    data: {
      key,
      id,
      bookmark: {title, link, section}
    },
    success: getLinks,
  });

  editingBookmarkID = null;
  $("#bookmarkTitle").val("");
  $("#bookmarkLink").val("");
  $("#bookmarkSection").val("");
}

function removeBookmark(id) {
  $.ajax({
    type: "POST",
    url: serverUrl + "bookmarks/remove",
    data: {
      key,
      id
    },
    success: getLinks,
  });
}
