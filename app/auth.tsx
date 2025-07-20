import { Image, ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import signInMethod from "@/services/auth";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const styles = useStyles();
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
      <View style={styles.background}>
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
          style={styles.background}
        >
          <View style={styles.content}>
            <Image
              source={require("../assets/images/insight_logo.png")}
              style={{
                width: 300,
                height: 200,
              }}
            />
            <TouchableOpacity
              style={styles.login}
              onPress={() => router.push("/homepage")}
            >
              <Text style={styles.loginText}>Guest Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.login}
              onPress={() =>
                signInMethod(router).then((user) => {
                  onAuthStateChanged(user); // TODO:- Checkout TS type issue (not major) Gokul
                })
              }
            >
              <Text style={styles.loginText}>Student Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.dev} onPress={() => {}}>
            <Text style={styles.devText}>{"< dev login >"}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

const useStyles = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column",
      //color: "#00000000"
    },
    content: {
      flexDirection: "column",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#00000033",
      shadowOffset: { width: 0, height: 2 },
    },
    login: {
      backgroundColor: "#ffffff00",
      height: 40,
      paddingHorizontal: 22,
      borderRadius: 10,
      borderWidth: 0.4,
      borderColor: "white",
      alignContent: "center",
      justifyContent: "center",
      marginTop: 30,
    },
    loginText: {
      color: "#d6d6ff",
      fontWeight: 300,
      fontSize: 16.3,
    },
    dev: {
      height: 40,
      paddingHorizontal: 16,
      position: "absolute",
      bottom: "1.4%",
      right: "1.5%",
      backgroundColor: "#00000000",
    },
    devText: {
      color: "white",
      fontSize: 14,
      fontWeight: 400,
    },
  });
};