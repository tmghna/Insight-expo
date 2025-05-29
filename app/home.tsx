import { Button, YStack, Text } from "tamagui";
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
    <YStack f={1} ai={"center"} jc={"center"}>
      <Text>Hello {user?.displayName}</Text>
      <Button onPress={handleSignOut} theme={"active"}>
        Sign Out
      </Button>
    </YStack>
  );
}
