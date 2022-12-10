import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";
import "firebase/messaging";

// config for institute
const config = {
  apiKey: "AIzaSyCmOWm_VEzYodG_PzusXD61HmEkSyV1Kcw",
  authDomain: "thalaivan-restaurant.firebaseapp.com",
  projectId: "thalaivan-restaurant",
  storageBucket: "thalaivan-restaurant.appspot.com",
  messagingSenderId: "1084918476722",
  appId: "1:1084918476722:web:1502d45a5f59d483977eab",
  measurementId: "G-ZKVE7EMKFJ"
};

const restaurant = firebase.initializeApp(config);

restaurant.analytics();
// firebase.analytics();
const db = restaurant.firestore();
const auth = restaurant.auth();
const messaging = restaurant.messaging();
const publicKey =
  "BLA1gt_4yje_f8ttbbDAToMEeN1BT9qygiB5Bc8ShJh0qc_cTBcZUznZNd5A1XBla2lX-IMyLJhFzjIezu58jEI";

// notifications
export const getToken = async (setTokenFound) => {
  let currentToken = "";
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
    // console.log("Current Token", currentToken);
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token.", error);
  }
  // messaging.onMessage((payload) => {
  //   console.log("onmes---");
  //   // resolve(payload);
  // });
  return currentToken;
};

// messaging.getToken().then((currentToken) => {
//   if (currentToken) {
//     console.log("token", currentToken);
//   } else {
//     // Show permission request.
//     console.log(
//       "No Instance ID token available. Request permission to generate one."
//     );
//   }
//   /** When app is active */
//   firebase.messaging().onMessage(
//     (payload) => {
//       console.log(payload);
//     },
//     (e) => {
//       console.log(e);
//     }
//   );
// });

// getToken();
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log("onmes");
      resolve(payload);
    });
  });

// offline support
db.enablePersistence({ experimentalTabSynchronization: true })
  .then(() => {
    console.log("Woohoo! Multi-Tab Persistence!");
  })
  .catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.log(
        "multiple tab is opened please close this tab and use only one tab, when offline"
      );
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log(
        "Current Browser or its version doesn't support offline mode"
      );
    }
  });

export { db, auth, firebase, messaging };
