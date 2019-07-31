const express = require('express')
const cookieParser = require('cookie-parser');
const engine = require('consolidate');

const bookmarks = require('./db/bookmarks')

const dbms = require('./db/dbms')

const password = "<Your password here, this is obviously extremely secure>"
const allowedKey = '<Put your key here>'

const port = 8080 // You can change this

app = express()

app.set('views', __dirname + '/client');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use("/styles", express.static(__dirname + '/client/styles'));
app.use("/scripts", express.static(__dirname + '/client/scripts'));
app.use("/favicon.ico", express.static(__dirname + '/client/favicon.ico'));

const bodyParser = require('body-parser')
app.use(bodyParser.json())       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());

const accessDeniedMessage = "Access Denied!"
function verify(key) {
  return key == allowedKey
}

app.get('/', (request, response) => {
  if(request.cookies.allowedKey == allowedKey) {
    response.render('index.html');
  } else {
    response.render('denied.html');
  }
})

app.post('/check', (request, response) => {
  if(request.body.passphrase == password) {
    var farFuture = new Date(new Date().getTime() + (1000*60*60*24*365*10)); // ~10y
    response.cookie('allowedKey', allowedKey, { expires: farFuture });

    response.redirect('/');
  } else {
    response.render('denied.html');
  }
})

app.post('/bookmarks/add', (request, response) => {
  if(!verify(request.body.key)) { return response.send(accessDeniedMessage) }

  let bookmark = request.body.bookmark

  bookmarks.add(bookmark.title, bookmark.link, bookmark.section)
  response.send()
})
app.post('/bookmarks/remove', (request, response) => {
  if(!verify(request.body.key)) { return response.send(accessDeniedMessage) }

  bookmarks.remove(request.body.id)
  response.send()
})
app.post('/bookmarks/edit', (request, response) => {
  if(!verify(request.body.key)) { return response.send(accessDeniedMessage) }

  let bookmark = request.body.bookmark

  bookmarks.edit(request.body.id, bookmark.title, bookmark.link, bookmark.section)
  response.send()
})
app.post('/bookmarks', (request, response) => {
  if(!verify(request.body.key)) { return response.send(accessDeniedMessage) }

  response.send(bookmarks.getAll())
})

app.listen(8080)
