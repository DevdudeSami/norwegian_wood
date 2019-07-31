# norwegian_wood
Browser dashboard/startpage. Of course named after The Beatles' hit.

![screenshot](https://raw.githubusercontent.com/DevdudeSami/norwegian_wood/master/screenshot.png)

## Versions

Currently two versions exist of the app: a fully local version that does not sync bookmarks with a database, and a Node.js served version which does. The served version allows you to host it either on your local network or on some VPS e.g. and be able to access your dashboard from anywhere.

## Served version setup

Follow these instructions if you plan to use the served version (*recommended*).

### Dependencies for the server

You need [Node.js](https://nodejs.org/en/) in order to host the server. Follow the instructions to install it from their website.

Once it's installed, verify its version by running the following in a terminal:

```
$ node -v # tested on node v12.4.0
$ npm -v # tested with npm 6.9.0
```

*Optional*: In order to manage the node process running in the background of your machine, you can use [pm2](https://www.npmjs.com/package/pm2). Install it by running:

```
$ npm install -g pm2
```

### Setting up the server

1) Clone or download this repo to your machine: ```git clone https://github.com/DevdudeSami/norwegian_wood```
2) To install required packages, run:

```
$ cd norwegian_wood/served
$ npm install
```

3) Change the *extremely secure* password and key by:

	- Open `server.js` and change the `password` constant to something memorable (although you can always change it from here if needed)
	- In the same file, change the `allowedKey` constant to a long random string (consider this an exercise at keyboard mashing)
	- Copy the key that you *so securely* created, and open the `client/scripts/main.js` file and set the `key` variable to the same value

4) If all goes well, you should now be able to run: ```node server.js``` and go to [http://localhost:8080](http://localhost:8080)

5) *Optional*: You can now use [pm2](https://www.npmjs.com/package/pm2) to run the server in the background:

	- If the node server is still running, stop it by hitting Ctrl-C
	- Run ```pm2 start server.js```
	- The server will now be running as a background process
	- Other useful pm2 commands are `list`, `stop`, and `restart`

## Local version setup

1) Clone or download to your machine: ```git clone https://github.com/DevdudeSami/norwegian_wood```
2) Open the `index.html` file in your browser and set it as your homepage (you may need to download an extension to set as new tab page for Chrome)

## Usage

Add a new bookmark by filling in its title, url, and section in the bottom text fields and **hitting the Enter key while in the section field**.

Edit a bookmark by hovering over it and clicking the green **e** button that appears. Its info will appear in the text fields. Edit the fields and hit Enter again while in the section field.

Delete a bookmark by hovering over it and clicking the red **x** key.

## Customisation

To change the background replace the `bg.jpg` file with your new image file making sure to keep the name. Alternatively go to `styles/style.css` and edit the url in line 7.

To change the random placeholders in the search bar, go to `scripts/main.js` and edit the `random` list at the top.

The default weather city is Glasgow. Change this by going into `scripts/weather` and replacing `glasgow` by the city you want.

## Backup

It's probably wise to backup your bookmarks every now and then. This will be especially important when new versions of this package are available. 

### Local version

To backup your bookmarks, open the `backup.html` file. Copy and paste the text that appears to a text file and save somewhere safe.

Currently you can only backup your bookmarks but can't restore (coming soon).

### Served version

Just copy the ```served/db/db.json``` file somewhere safe. You can restore bookmarks by replacing it in the same location.

**Restoring bookmarks from local to served**: If you're migrating from local to served, copy the text that appears when you open `backup.html` in a browser to the `bookmarks` object in `served/db/db.json` and set the `nextBookmarkID` value to one over the largest `id` in your bookmarks. The `db.json` file should look like:

```{"bookmarks": <output of backup.html here>, "nextBookmarkID": <largest id plus one here>}```

## Default image
The default background featured here is from [akspic by Radhi Al-Asmakh](https://akspic.com/image/125586-sky-fractal-cosmos-astronomical_object-space/3840x2160).