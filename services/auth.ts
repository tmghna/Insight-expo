import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Router, useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "372122265926-jako302r2cfcrk9ne6qtgt62arme3dps.apps.googleusercontent.com",
});

export default async function signInMethod(router: Router) {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      const { idToken, user } = response.data;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      router.replace("/home");
      return user;
    } else {
      console.log("Unsuccessful");
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log("Sign in In Progress");
          break;
        default:
          console.log("Error Code", error.code);
      }
    } else {
      console.log("Error", error);
    }
  }
}
