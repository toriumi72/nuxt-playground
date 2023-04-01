// import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import {https} from "firebase-functions";

export const webhook = https.onRequest((req, res) => {
  res.send("HTTP POST request sent to the webhook URL!");
});