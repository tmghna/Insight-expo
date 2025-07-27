import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NavBar from "@/components/NavBar";
import { useRouter } from "expo-router";
import { Metrics } from "@/constants/Metric";
import { NotifCards, CampusFacilityCards } from "@/components/ui/CarouselCards";
import Tiles from "../components/ui/HelpfulTiles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from '@/hooks/useThemeColor';
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [loginType, setLoginType] = useState("guest");
  const user = auth().currentUser;

  useEffect(() => {
    // If user is signed in with email, mark as Institute, otherwise guest
    if (user?.email && !user.isAnonymous) {
      setLoginType("institute");
    } else {
      setLoginType("guest");
    }
  }, [user]);
  
  const isWide = Metrics.screenWidth >= 600;
  const styles = useResponsiveLayout();
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useColorScheme() === 'dark' ? "#fff" : "#222";

  return (
    <SafeAreaView style={{flex: 1, backgroundColor}} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <TouchableOpacity activeOpacity={0.9} style={styles.avatar} onPress={ () => router.push('/settings')}>
            {loginType === "institute" ? (
              <Image source={{uri: user?.photoURL} as ImageSourcePropType} style={styles.profilePhoto} />
            ) : (
            <MaterialIcons name="person" style={styles.avatarIcon} />
            )}
          </TouchableOpacity>
          <ThemedView style={styles.profileInfo}>
            <ThemedText type="footer" style={styles.greetingText}>
              Hello,
            </ThemedText>
            <ThemedText type='subtitle'>
              {((user?.displayName ?? "Guest").split(" ")[0]).trim()}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Notification Section */}
        <ThemedText type='subtitle' style={styles.sectionHeader}>
          Notifications
        </ThemedText>
        <ThemedView style={styles.notifScroll}>
          <NotifCards/>
        </ThemedView>

        {/* Events Section */}
        {/* <TouchableOpacity activeOpacity={0.8} style={styles.eventButton} onPress={() => {}}>
          <Image
            source={require("../assets/images/Card.png")}
            style={styles.eventImage}
          />
        </TouchableOpacity> */}

        {/* Campus Facilities */}
        {/* <YStack flex={1}> */}
          <ThemedText type='subtitle' style={{paddingTop: 0, flexDirection: "row", alignSelf: "flex-start",}}>
            Campus Facilities
          </ThemedText>
          <ThemedView style={[styles.notifScroll, {paddingVertical: Metrics.moderateHorizontalScale(20,.2)}]}>
            <CampusFacilityCards/>
          </ThemedView>
        {/* </YStack> */}

        {/* Manthan Button */}
        <TouchableOpacity
          style={[styles.manthanButton, {width: isWide ? "60%" : "80%", borderColor}]}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Image
            source={require("../assets/images/newspaper.png")}
            style={styles.manthanImage}
          />
          <ThemedText style={styles.manthanText}>
            Manthan Times
          </ThemedText>
        </TouchableOpacity>

        {/* Helpful Tiles */}
        <ThemedText type='subtitle' style={styles.sectionHeader}>Helpful</ThemedText>
        <ThemedView style={styles.notifScroll}>
          <Tiles/>
        </ThemedView>

      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
}

const useResponsiveLayout = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      paddingHorizontal: Metrics.moderateHorizontalScale(20,0.2),
    },
    header: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Metrics.moderateHorizontalScale(20,0.2),
      gap: Metrics.moderateHorizontalScale(10,0.2),
    },
    profileInfo: {
      flexDirection: "column",
      flex: 1,
      alignItems: "flex-start",
    },
    greetingText: {
      fontSize: Metrics.moderateHorizontalScale(16,0.2),
      letterSpacing: Metrics.moderateHorizontalScale(1,0.2),
    },
    avatar: {
      flex: 0,
      width: Metrics.moderateHorizontalScale(50,0.2),
      height: Metrics.moderateHorizontalScale(50,0.2),
      borderRadius: '20%',
      backgroundColor: '#8345cf',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profilePhoto: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      overflow: "hidden",
      borderRadius: Metrics.moderateHorizontalScale(10,0.2) //20% of 50
    },
    avatarIcon: {
      fontSize: Metrics.moderateHorizontalScale(30,0.1),
      color: '#FFF',
    },
    sectionHeader: {
      paddingTop: Metrics.moderateHorizontalScale(20, 0.2),
      flexDirection: "row",
      alignSelf: "flex-start",
      letterSpacing: Metrics.moderateHorizontalScale(1,0.2),
    },
    notifScroll: {
      alignItems: "center",
      justifyContent: 'center',
      flex: 1,
      marginHorizontal: Metrics.moderateHorizontalScale(-20,0.2),
    },
    eventImage: {
      width: "100%",
      height: "100%",
    },
    eventButton: {
      width: Metrics.screenWidth * 0.85,
      height: Metrics.moderateHorizontalScale(120, 0.2),
      borderRadius: Metrics.moderateHorizontalScale(18, 0.2),
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      marginTop: Metrics.moderateHorizontalScale(10, 0.2),
      boxShadow: "0px 5px 4px rgba(0,0,0,0.3)",
    },
    manthanButton: {
      flexDirection: "row",
      height: Metrics.moderateHorizontalScale(50, 0.2),
      borderRadius: Metrics.moderateHorizontalScale(24, 0.2),
      backgroundColor: "#857cc9ff",
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: Metrics.moderateHorizontalScale(1,0.2),
      boxShadow: '0px 4px 5px rgba(0,0,0,0.3)',
    },
    manthanImage: {
      opacity: 0.2,
      width: "80%",
      height: "100%",
      resizeMode: "cover",
      position: "absolute",
      overflow: "hidden",
    },
    manthanText: {
      fontSize: Metrics.moderateHorizontalScale(22, 0.2),
      fontFamily: "OldEnglishFive",
      color: "#ffffffcb",
      textShadowColor: "#1f1f1f",
      textShadowOffset: { width: Metrics.moderateHorizontalScale(2,0.2), height: Metrics.moderateHorizontalScale(2,0.2) },
      textShadowRadius: Metrics.moderateHorizontalScale(2,0.2),
    },
  });
};