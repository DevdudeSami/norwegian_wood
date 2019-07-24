# norwegian_wood
Browser dashboard/startpage. Of course named after The Beatles' hit.

![screenshot](https://raw.githubusercontent.com/DevdudeSami/norwegian_wood/master/screenshot.png)

## Setup

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

It's probably wise to backup your bookmarks every now and then. This will be especially important when new versions of this package are available. To backup your bookmarks, open the `backup.html` file. Copy and paste the text that appears to a text file and save somewhere safe.

Currently you can only backup your bookmarks but can't restore (coming soon).

## Default image
The default background featured here is from [akspic by Radhi Al-Asmakh](https://akspic.com/image/125586-sky-fractal-cosmos-astronomical_object-space/3840x2160).