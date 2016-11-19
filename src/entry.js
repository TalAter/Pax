var swURL = require('file-loader!./serviceworker.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(swURL).then(registration =>
    console.log('Service Worker registered successfully with scope: ', registration.scope)
  ).catch(err =>
    console.log('Service Worker registration failed: ', err)
  );
}
