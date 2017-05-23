# Reverse game

Simple game to convert all red squares to green squares. My attempt to learn the "new" tools and methods.

![](./www/img/Reverse_main_screen.png "screnshot")

# Dev Environment
The main point for me to create this game was to better learn React.js. In the proccess, i learned a little more than just React.js:
- Node.js and NMP
- Cordova and Phonegap (basic understaning)
- React Hot Loader (edit the code; have it hot loaded; and not lose any state of the components between loads)
- Bootstrap and react.bootstrap in particular

If you are interested to play with this project, or make your own, follow the steps below.

### Run the app in the browser / simulator

Run this to start the development webpack server:

```
npm start
```

You can then open the app in your browser by visiting [localhost:8080](http://localhost:8080)

Open it in the iOS Simulator by running (in another terminal):

```
cordova platform add ios
```

```
npm run ios
```

Or in the Android emulator with:

```
cordova platform add android
```

```
npm run android
```

(both of which are just calling `cordova run ios` and `cordova run android`)

In this mode, the app will live-reload changes to React components using [react-hot-loader](https://github.com/gaearon/react-hot-loader) and CSS changes using the Webpack CSS loader.

### Build the app for production

To build the app without the development hot module reloading server:

```
npm run build [ -- ios || android]
```

i.e.:

```
npm run prepare -- ios
npm run prepare -- android
```

This will switch your `config.xml` file to production mode, build the app bundle to `/www` using Webpack, and run `cordova build` for you.

After that, the normal Cordova / PhoneGap commands can be used such as `phonegap serve`, or `cordova run ios`, etc.

# License

MIT. Copyright (c) 2016 Mark Rogov.
