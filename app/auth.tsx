import { Image, ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import signInMethod from "@/services/auth";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Metrics } from "@/constants/Metric";

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
                width: Metrics.moderateHorizontalScale(300,0.2),
                height: Metrics.moderateVerticalScale(200,0.2),
              }}
            />
            <TouchableOpacity
              style={styles.login}
              onPress={() => router.push("/(tabs)")}
            >
              <Text style={styles.loginText}>Guest Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.login}
              onPress={() =>
                signInMethod(router).then((user) => {
                  onAuthStateChanged(user); // TODO:- Checkout TS type issue (not major) Gokul. Fixed Tamaghna
                })
              }
            >
              <Text style={styles.loginText}>Institute Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.dev} onPress={() => {}}>
            <Text style={styles.devText}>{"Dev Login >"}</Text>
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
      backgroundColor: "transparent",
      height: Metrics.moderateVerticalScale(40,0.2),
      paddingHorizontal: Metrics.moderateHorizontalScale(22,0.2),
      borderRadius: Metrics.moderateHorizontalScale(10,0.1),
      borderWidth: Metrics.moderateHorizontalScale(1,0.2),
      borderColor: "#ffffff99",
      alignContent: "center",
      justifyContent: "center",
      marginTop: Metrics.moderateVerticalScale(30,0.2),
    },
    loginText: {
      color: "#d6d6ff",
      fontFamily: "WorkSans400",
      fontSize: Metrics.moderateHorizontalScale(16,0.2),
    },
    dev: {
      height: Metrics.moderateVerticalScale(40,0.2),
      position: "absolute",
      bottom: "0.5%",
      right: "4%",
      backgroundColor: "transparent",
    },
    devText: {
      color: "white",
      fontSize: Metrics.moderateHorizontalScale(14,0.2),
      fontFamily: "WorkSans400",
    },
  });
};