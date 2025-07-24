import { ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  return (
    <ImageBackground
      source={require("../../assets/images/Login-Background-Texture.png")}
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
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#00000033",
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <Text>Insight Tabs Index</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
