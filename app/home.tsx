import { Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Home() {
  const router = useRouter();

  const user = auth().currentUser;
  const handleSignOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      router.replace("/auth");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Hello {user?.displayName}</Text>
      {/* <TouchableOpacity onPress={handleSignOut}/> */}
        {/* //TODO:- Some active theme - Harshita Sign Out */}
      <TouchableOpacity onPress={handleSignOut}>
        <Text style={{ fontSize: 16, color: "blue", marginTop: 20 }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
