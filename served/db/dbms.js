const fs = require('fs')

/*
 * Structures:
 *
 * Bookmark: {id, title, link, section}
 * To do: {id, title, time}
 * Focus: {id, title}
 *
 */

function read() {
  return JSON.parse(fs.readFileSync('db/db.json', 'utf8'))
}
function save(db) {
  fs.writeFileSync('db/db.json', JSON.stringify(db))
}
function reset() {
  const baseObject = {
    bookmarks: [],
    nextBookmarkID: 0,
  }

  save(baseObject)
}

module.exports = {
  read,
  save,
  reset
}
