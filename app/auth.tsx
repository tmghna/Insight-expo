import { ImageBackground } from "react-native";
import { YStack, Button, Image } from "tamagui";
import { LinearGradient } from "@tamagui/linear-gradient";
import signInMethod from "@/services/auth";
import { LoginButton } from "@/components/ui/LoginButton";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

export default function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("Auth state changed", user);
    setUser(user);

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/Login-Background-Texture.png")}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <LinearGradient
        colors={[
          "#00000090",
          "#17136685",
          "#39015e75",
          "#130e4d70",
          "#00000080",
        ]}
        locations={[0, 0.2, 0.4, 0.8, 0.96]}
        start={[0, 0]}
        end={[0, 1]}
        flex={1}
        justifyContent="center"
      >
        <YStack
          flex={1}
          jc="center"
          ai="center"
          shadowColor="#00000033"
          shadowOffset={{ width: 0, height: 2 }}
        >
          <Image
            source={{
              width: 300,
              height: 200,
              uri: require("../assets/images/insight_logo.png"),
            }}
          />
          <LoginButton 
            mt="45" 
            onPress={() => router.push("/homepage")}
          >
            Guest Login
          </LoginButton>
          <LoginButton
            mt="30"
            onPress={() =>
              signInMethod(router).then((user) => {
                onAuthStateChanged(user); // TODO:- Checkout TS type issue (not major) Gokul
              })
            }
          >
            Student Login
          </LoginButton>
          <Button
            color={"white"}
            fontSize={14}
            fontWeight={400}
            height={40}
            px={16}
            position="absolute"
            bottom={"1.4%"}
            right={"1.5%"}
            chromeless

          >
            {"< dev login >"}
          </Button>
        </YStack>
      </LinearGradient>
    </ImageBackground>
  );
}
