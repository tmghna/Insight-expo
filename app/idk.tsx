// HelpfulTiles.tsx
import { YStack, XStack, Button, Text } from "tamagui";
import { MotiScrollView } from "moti";
import { Easing } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Text as RNText, StyleSheet } from "react-native";

const tiles = [
  {
    id: "1",
    color: ["#fffbc2ff", "#e7df7dff"],
    buttons:
  },
  {
    id: "2",
    color: ["#d2b2f0ff", "#ac7dd8ff"],
    buttons:
  },
  {
    id: "3",
    color: ["#95d9ddff", "#92f3e7c3"],
    buttons:
  },
  {
    id: "4",
    color: ["#f4ab6a", "#d16002"], 
    buttons:
  },

]

export default function HelpfulTiles() {
  return (
    <YStack style={styles.container}>
      <Text style={styles.headingText}>Helpful</Text>
      <MotiScrollView
        horizontal
        style={styles.scrollView}
        from={{ opacity: 0, translateX: 21 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{
          opacity: {
            delay: 0,
            easing: Easing.inOut(Easing.ease),
            type: "timing",
            duration: 280,
          },
          translateX: {
            delay: 0,
            easing: Easing.inOut(Easing.ease),
            type: "timing",
            duration: 600,
          },
        }}
      >
        {/* Tile 1 - Lost and Found */}
        <LinearGradient
          colors={["#fffbc2ff", "#e7df7dff"]}
          locations={[0, 1]}
          start={[0, -1]}
          end={[0, 1]}
          style={[styles.gradientCommon]}
        >
          <XStack style={styles.tileContainer}>
            <YStack style={styles.contentStack}>
              <Button style={styles.transparentButton}>
                <RNText numberOfLines={2} adjustsFontSizeToFit style={styles.titleText}>
                  Lost and Found
                </RNText>
                <Feather name="arrow-up-right" size={24} color="#2a2a2aff" />
              </Button>
              <YStack style={styles.infoBox}>
                <RNText adjustsFontSizeToFit style={styles.recentText}>Recent</RNText>
                <RNText numberOfLines={1} adjustsFontSizeToFit style={styles.itemText}>Name</RNText>
                <RNText numberOfLines={3} ellipsizeMode="clip" style={styles.itemText}>Item</RNText>
              </YStack>
              <Button backgroundColor="#ecdf92ff" style={styles.solidButton}>Add</Button>
            </YStack>
          </XStack>
        </LinearGradient>

        {/* Tile 2 - Academic Links */}
        <LinearGradient
          colors={["#d2b2f0ff", "#ac7dd8ff"]}
          locations={[0, 1]}
          start={[0, -1]}
          end={[0, 1]}
          style={styles.gradientCommon}
        >
          <XStack style={styles.tileContainer}>
            <YStack style={styles.academicContent}>
              <RNText numberOfLines={2} adjustsFontSizeToFit style={styles.titleText}>
                Academic Links
              </RNText>
              <Button backgroundColor="#b28ed3ff" icon={<FontAwesome5 name="google-drive" size={24} color="#e4dfa3ff" />} style={styles.solidButton}>
                Drive Material
              </Button>
              <Button backgroundColor="#b28ed3ff" icon={<FontAwesome5 name="readme" size={24} color="#e6759aff" />} style={styles.solidButton}>
                Course Structure
              </Button>
              <Button backgroundColor="#b28ed3ff" icon={<MaterialIcons name="edit-document" size={24} color="#6858ebff" />} style={styles.solidButton}>
                Drive Material
              </Button>
            </YStack>
          </XStack>
        </LinearGradient>

        {/* Tile 3 - Hospital Helpline */}
        <LinearGradient
          colors={["#95d9ddff", "#92f3e7c3"]}
          locations={[0, 1]}
          start={[0, -1]}
          end={[0, 1]}
          style={styles.gradientCommon}
        >
          <XStack style={styles.tileContainer}>
            <YStack style={styles.helplineContent}>
              <RNText numberOfLines={2} adjustsFontSizeToFit style={[styles.titleText, { alignSelf: "center" }]}>Hospital Helpline</RNText>
              <Button backgroundColor="#57b2c5ff" style={styles.solidButton}>Ambulance</Button>
              <Button backgroundColor="#57b2c5ff" style={styles.solidButton}>Hospitals</Button>
            </YStack>
          </XStack>
        </LinearGradient>

        {/* Tile 4 - Others */}
        <LinearGradient
          colors={["#f4ab6a", "#d16002"]}
          locations={[0, 1]}
          start={[0, -1]}
          end={[0, 1]}
          style={styles.gradientCommon}
        >
          <XStack style={styles.tileContainer}>
            <YStack style={styles.othersContent}>
              <RNText numberOfLines={2} adjustsFontSizeToFit style={[styles.titleText, { alignSelf: "center" }]}>Others</RNText>
              <Button backgroundColor="#fda172" style={styles.solidButton}>Laundry</Button>
            </YStack>
          </XStack>
        </LinearGradient>
      </MotiScrollView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    flex: 1,
  },
  headingText: {
    // paddingStart: 14,
    paddingBottom: 15,
    fontSize: 23,
    fontWeight: "400",
    fontFamily: "WorkSans",
    color: "#b7b7b7",
  },
  scrollView: {
    flex: 1,
    flexDirection: "row",
  },
  gradientCommon: {
    borderRadius: 20,
    // shadowColor: "#00000033",
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 10,
    padding: 10,
  },
  tileContainer: {
    borderRadius: 20,
    width: 160,
    height: 250,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: '#FFF',
    borderWidth: 2
  },
  contentStack: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  academicContent: {
    flex: 1,
    width: "70%",
    height: "78%",
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  helplineContent: {
    flex: 1,
    width: "70%",
    height: "78%",
    alignItems: "center",
  },
  othersContent: {
    flex: 1,
    width: "70%",
    height: "78%",
    alignItems: "center",
  },
  infoBox: {
    padding: 10,
    width: "70%",
    height: "78%",
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Kreadon700",
    color: "#2a2a2aff",
    alignSelf: "flex-start",
  },
  recentText: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "WorkSans600",
    color: "#141414ff",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "WorkSans400",
    color: "#95a1ac",
  },
  solidButton: {
    marginVertical: 10,
    marginHorizontal: 24,
    height: 40,
    width: 139,
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Poppins",
    elevation: 3,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 22,
    shadowRadius: 4,
    shadowColor: "#00000033",
    shadowOffset: { width: 0, height: 2 },
    textAlign: "center",
  },
  transparentButton: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
});
