importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js");
const config = {
  apiKey: "AIzaSyCmOWm_VEzYodG_PzusXD61HmEkSyV1Kcw",
  authDomain: "thalaivan-restaurant.firebaseapp.com",
  projectId: "thalaivan-restaurant",
  storageBucket: "thalaivan-restaurant.appspot.com",
  messagingSenderId: "1084918476722",
  appId: "1:1084918476722:web:1502d45a5f59d483977eab",
  measurementId: "G-ZKVE7EMKFJ"
};
const msg = firebase.initializeApp(config);

const messaging = msg.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/images/logo.jpg",
    data: {
      url: "https://fcqst.csb.app/home/dashboard/allorder"
    }
  };
  self.clients
    .matchAll({
      includeUncontrolled: true,
      type: "window"
    })
    .then((clients) => {
      if (clients && clients.length) {
        // Send a response - the clients
        // array is ordered by last focused
        console.log("postMessage");
        // clients[0].postMessage(payload);
        clients.forEach((client) => client.postMessage(payload));
      }
    });
  // self.registration.hideNotification();
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// Listen to the request
// self.addEventListener("message", (event) => {
//   // if (event.data && event.data.type === "INCREASE_COUNT") {
//   //   // Select who we want to respond to
//   // }
//   console.log("background-addEvent", event);
//   self.clients
//     .matchAll({
//       includeUncontrolled: true,
//       type: "window"
//     })
//     .then((clients) => {
//       if (clients && clients.length) {
//         // Send a response - the clients
//         // array is ordered by last focused
//         clients[0].postMessage(payload.notification);
//       }
//     });
// });
