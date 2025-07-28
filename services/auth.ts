import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Router } from "expo-router";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";

GoogleSignin.configure({
  webClientId:
    "372122265926-jako302r2cfcrk9ne6qtgt62arme3dps.apps.googleusercontent.com",
});

function showPermissionModal(): Promise<boolean> {
  return new Promise((resolve) => {
    Alert.alert(
      "Access Permissions",
      "Do you agree to provide access to your Gmail content which will be end-to-end encrypted and only available to you as a user?",
      [
        {
          text: "Cancel",
          onPress: () => resolve(false),
          style: "cancel",
        },
        {
          text: "I Accept the Terms",
          onPress: () => resolve(true),
        },
      ],
      { cancelable: false }
    );
  });
}

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
      const permissionGranted = await showPermissionModal();
      if (!permissionGranted) {
        await auth().signOut();
        await GoogleSignin.signOut();
        return null;
      }
      router.replace("/(tabs)");
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
