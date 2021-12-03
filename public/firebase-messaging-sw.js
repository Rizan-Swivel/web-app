importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
const firebaseConfig = {
     apiKey: "AIzaSyBDBq73db3AzYPi8SqEwho-4yeahW6o5F4",
    authDomain: "soy-academy-286104.firebaseapp.com",
    databaseURL: "https://soy-academy-286104.firebaseio.com",
    projectId: "soy-academy-286104",
    storageBucket: "soy-academy-286104.appspot.com",
    messagingSenderId: "28788601269",
    appId: "1:28788601269:web:91bdd198fc76d1f9d6a9fc",
    measurementId: "G-0L6027FBNW"
  };
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               return registration.showNotification("my notification title");
          });
     return promiseChain;
});

self.addEventListener("notificationclick", function(event) {
     console.log(event);
});