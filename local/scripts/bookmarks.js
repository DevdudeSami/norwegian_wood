var linksDiv;
var links;

var editingBookmarkID = null;

$(function() {
  linksDiv = $("#links");

  var linksQuery = window.localStorage.getItem("bookmarks");
  if(linksQuery === null) {
    links = [];
    window.localStorage.setItem("nextID", 0);
    save();
  }
  else links = JSON.parse(linksQuery);
  processLinks();

  $("#bookmarkSection").on('keydown', function (e) {
    if (e.keyCode == 13) addBookmark();
  });
});

function displayLinks(sections) {
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

function processLinks() {
  var linksWithSections = {};
  var foundSections = [];
  
  autocomplete(document.getElementById("search"), links);

  for(var l of links) {
    console.log(l)
    if(foundSections.includes(l.section)) {
      linksWithSections[l.section].push(l);
    } else {
      linksWithSections[l.section] = [l];
      foundSections.push(l.section);
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

  links.push({id: nextID(), title, link, section});
  save();
  processLinks();
  
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
  console.log("dsflksdnf", links[id])
  links[id] = {id, title, link, section}
  save()
  processLinks();

  editingBookmarkID = null;
  $("#bookmarkTitle").val("");
  $("#bookmarkLink").val("");
  $("#bookmarkSection").val("");
}

function removeBookmark(id) {
  links.splice(id,1);
  save();
  processLinks();
}

function save() {
  window.localStorage.setItem("bookmarks", JSON.stringify(links));
}

function nextID() {
  const id = parseInt(window.localStorage.getItem("nextID"));
  window.localStorage.setItem("nextID", id+1);
  return id;
}