This is the "player" component of the website that allows to play segmented videos (created
earlier by the editor).

# Prerequisite

Run `yarn` to install all required npm packages.

# Start development server (singleton mode)

This mode starts the player in singleton mode.

1. `./serve-develop.sh`

2. open `http://localhost:3000` in your browser
 
3. copy to clipboard the content of any "sections.json" file from composers dir (e.g. `composers/ravel/pavane/thiollier/sections.json`),

and click `Submit` button

NOTE: this mode supports hot-reloading; each change will be visible in the browser.

# Run with gatsby (website mode)

This mode starts the player in website's environment. 

1. `./build.sh`

2. `./serve-build.sh`

3. `cd ../gatsby; ./develop.sh`

NOTE: no hot-reload; each change requires rebuilding and restarting of both the player 
      and the website!