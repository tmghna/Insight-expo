import { GoogleSignin, isErrorWithCode, isSuccessResponse, statusCodes } from "@react-native-google-signin/google-signin"
import { GoogleAuthProvider, getAuth, signInWithCredential } from "@react-native-firebase/auth"
import { initializeApp } from "@react-native-firebase/app"
import { firebaseConfig } from "./firebaseConfig"

GoogleSignin.configure({
    webClientId: '372122265926-jako302r2cfcrk9ne6qtgt62arme3dps.apps.googleusercontent.com',
})

const firebaseApp = initializeApp(firebaseConfig)

export default async function signInMethod() {
    // console.log("Hello")
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
        const response = await GoogleSignin.signIn()

        if(isSuccessResponse(response))    {
            const { idToken, user } = response.data
            const { name, email, photo } = user;
            console.log(name)
        } else {
            console.log("Unsuccessful")
        }
    } catch (error) {
        if (isErrorWithCode(error)) {
            switch (error.code) {
                case statusCodes.IN_PROGRESS:
                    console.log("Sign in In Progress")
                    break;
                default:
                    console.log("Error Code", error.code)
            }
        } else {
            console.log("Error", error)
        }
    }

}