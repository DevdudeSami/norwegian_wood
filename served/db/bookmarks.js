const dbms = require('./dbms')

function add(title, link, section) {
  const db = dbms.read()
  db.bookmarks.push({id: db.nextBookmarkID, title, link, section})
  db.nextBookmarkID += 1
  dbms.save(db)
}
function remove(id) {
  const db = dbms.read()
  db.bookmarks = db.bookmarks.filter(bookmark => bookmark.id != id)
  dbms.save(db)
}
function edit(id, title, link, section) {
  const db = dbms.read()
  db.bookmarks.some(bookmark => {
    if(bookmark.id == id) {
      bookmark.title = title
      bookmark.link = link
      bookmark.section = section
      return true
    }
  })
  dbms.save(db)
}
function getAll() {
  return dbms.read().bookmarks
}

module.exports = {
  add,
  remove,
  edit,
  getAll
}
