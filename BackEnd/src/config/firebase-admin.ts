import admin from "firebase-admin";
import serviceAccount from "../../secondbrain-b5493-firebase-adminsdk-fbsvc-c42ac6b112.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
});

export default admin;
