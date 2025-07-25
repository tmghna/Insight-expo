import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Router, useRouter } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";

GoogleSignin.configure({
  webClientId:
    "372122265926-jako302r2cfcrk9ne6qtgt62arme3dps.apps.googleusercontent.com",
});

export default async function signInMethod(router: Router): Promise<FirebaseAuthTypes.User | null> {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();

    if (isSuccessResponse(response)) {
      const { idToken, user } = response.data;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const signedInUser = userCredential.user;
      if (!signedInUser.email?.endsWith("@iisermohali.ac.in")) {
        await auth().signOut(); //Immediate signout with alert
        await GoogleSignin.signOut();
        Alert.alert(
          "Login Error: Wrong Email", 
          "It seems that you tried to login through a non-institute email ID."
        );
        return null;
      }
      router.replace("/homepage");
      return signedInUser;
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
  return null;
}
