// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api/",
  redirectUrl: "http://localhost:4200",
  firebase: {
    apiKey: "AIzaSyCaktIl3mMzna0VvTrnKUbHZppZMjgqk3Q",
    authDomain: "sports-6a7d7.firebaseapp.com",
    databaseURL: "https://sports-6a7d7.firebaseio.com",
    projectId: "sports-6a7d7",
    storageBucket: "sports-6a7d7.appspot.com",
    messagingSenderId: "832089119697"
  }
};
