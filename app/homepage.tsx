import { 
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NavBar from "@/components/NavBar";
import { useRouter } from "expo-router";
import { Metrics } from "@/constants/Metric";
import { NotifCards, CampusFacilityCards } from "@/components/ui/CarouselCards";
import Tiles from "../components/ui/HelpfulTiles";

export default function HomePage() {
  const styles = useResponsiveLayout();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {/* Header Section */}
        <View flexDirection="row" style={styles.header}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => router.push("/settings")}
          >
            <MaterialIcons name="person" style={styles.avatarIcon} />
          </TouchableOpacity>
          <View flexDirection="column" style={styles.profileInfo}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.nameText}>User Name</Text>
          </View>
        </View>

        {/* Notification Section */}
        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.notifScroll}>
          <NotifCards />
        </View>

        {/* Events Section */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.eventButton}
          onPress={() => {}}
        >
          <Image
            source={require("../assets/images/Card.png")}
            style={styles.eventImage}
          />
        </TouchableOpacity>

        {/* Campus Facilities */}
        {/* <View flexDirection='column' flex={1}> */}
        <Text style={styles.sectionHeader}>Campus Facilities</Text>
        <View
          style={[
            styles.notifScroll,
            { paddingVertical: Metrics.moderateHorizontalScale(20, 0.2) },
          ]}
        >
          <CampusFacilityCards />
        </View>
        {/* </View> */}

        {/* Manthan Button */}
        <TouchableOpacity
          style={styles.manthanButton}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Image
            source={require("../assets/images/newspaper.png")}
            style={styles.manthanImage}
          />
          <Text style={styles.manthanText}>Manthan Times</Text>
        </TouchableOpacity>

        {/* Helpful Tiles */}
        <Text style={styles.sectionHeader}>Helpful</Text>
        <View style={styles.notifScroll}>
          <Tiles />
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

const useResponsiveLayout = () => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#181818",
    },
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "#181818",
      paddingHorizontal: Metrics.moderateHorizontalScale(20,.2),
    },
    header: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: Metrics.moderateHorizontalScale(20,.2),
    },
    profileInfo: {
      flex: 1,
      alignItems: "flex-start",
    },
    greetingText: {
      fontSize: Metrics.moderateHorizontalScale(18,.2),
      fontWeight: '400',
      fontFamily: "WorkSans",
      letterSpacing: Metrics.moderateHorizontalScale(1,.2),
      color: "#95a1ac",
    },
    nameText: {
      fontSize: Metrics.moderateHorizontalScale(24,.2),
      fontWeight: "400",
      fontFamily: "WorkSans",
      color: "#ffffff",
    },
    avatar: {
      width: Metrics.moderateHorizontalScale(60,.2),
      height: Metrics.moderateHorizontalScale(60,.2),
      borderRadius: '20%',
      backgroundColor: '#8345cf',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      marginRight: Metrics.moderateHorizontalScale(10,.2),
    },
    avatarIcon: {
      fontSize: Metrics.moderateHorizontalScale(35,.1),
      color: '#FFF',
    },
    sectionHeader: {
      paddingTop: Metrics.moderateHorizontalScale(20,.2),
      flexDirection: "row",
      alignSelf: "flex-start",
      fontSize: Metrics.moderateHorizontalScale(22,.2),
      fontWeight: '400',
      letterSpacing: Metrics.moderateHorizontalScale(1,.2),
      fontFamily: "WorkSans",
      color: "#DDD",
    },
    notifScroll: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#181818',
    flex:1,
    marginHorizontal: Metrics.moderateHorizontalScale(-20,.2),
    },
    eventImage: {
      width: "100%",
      height: '100%',
    },
    eventButton: {
      width: Metrics.screenWidth*0.85,
      height: Metrics.moderateHorizontalScale(120,.2),
      borderRadius: Metrics.moderateHorizontalScale(18,.2),
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      marginTop: Metrics.moderateHorizontalScale(10,.2),
      boxShadow: '0px 5px 4px rgba(0,0,0,0.3)',
    },
    manthanButton: {
      flexDirection: 'row',
      width: '80%',
      height: Metrics.moderateHorizontalScale(50,.2),
      borderRadius: Metrics.moderateHorizontalScale(24,.2),
      backgroundColor: "#857cc9ff",
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderWidth: Metrics.moderateHorizontalScale(1,.2)
    },
    manthanImage: {
      opacity: 0.2,
      width: '80%',
      height: '100%',
      resizeMode: "cover",
      position: "absolute",
      overflow: "hidden",
    },
    manthanText: {
      fontSize: Metrics.moderateHorizontalScale(22,.2),
      fontWeight: '400',
      fontFamily: "OldEnglishFive",
      color: "#ffffffcb",
      textShadowColor: "#1f1f1f",
      textShadowOffset: { width: Metrics.moderateHorizontalScale(2,.2), height: Metrics.moderateHorizontalScale(2,.2) },
      textShadowRadius: Metrics.moderateHorizontalScale(2,.2),
    }
  });
};