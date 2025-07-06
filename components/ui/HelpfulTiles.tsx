// HelpfulTiles.tsx
import { YStack, XStack, Text } from "tamagui";
import { MotiScrollView } from "moti";
import { Easing } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

const tiles = [
  {
    id: "Lost and Found",
    color: ["#5499bb", "#4475a6"],
    buttons: [
      {
        buttonUI: "playlist-add",
        buttonText: 'Add',
        UIcolor: '#341840',
        onClick: () => {}
      }
    ],
  },
  {
    id: "LH Booking",
    color: ["#5c6bc1","#4758ad"], 
    buttons: [
      {
        buttonUI: "schedule",
        buttonText: "Book",
        UIcolor: '#341840',
        onClick: () => {}
      }
    ],
  },
  {
    id: "Academic Links",
    color: ["#795cc1","#6043b1"],
    buttons: [
      {
        buttonUI: "storage",
        buttonText: 'Drive Material',
        UIcolor: '#341840',
        onClick: () => {}
      },
      {
        buttonUI: "library-books",
        buttonText: 'Course Structure',
        UIcolor: '#341840',
        onClick: () => {}
      },
      {
        buttonUI: "calendar-month",
        buttonText: 'Academic Calender',
        UIcolor: '#341840',
        onClick: () => {}
      }
    ],
  },
  {
    id: "Helpline",
    // color: ["#95d9ee", "#92f3e7"],
    color: [ "#c15c9c", "#a84388"],
    buttons: [
      {
        buttonUI: "health-and-safety",
        buttonText: 'Ambulance',
        UIcolor: '#341840',
        onClick: () => {}
      },
      {
        buttonUI: "local-hospital",
        buttonText: 'Hospital',
        UIcolor: '#341840',
        onClick: () => {}
      }
    ],
  },
]

export default function Tiles() {
  return (
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
        contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'flex-start'}}
      >
        {tiles.map((item) => (
          <LinearGradient
            colors={item.color as any}
            locations={[0, .5]}
            start={[0.1, 0.1]}
            end={[.9, .9]}
            style={styles.gradientCommon}
          >
            <XStack style={styles.tileContainer}>
              <YStack style={styles.contentStack}>
                <Text style={styles.headingText}>{item.id}</Text>
                {item.buttons.map((btn) => (
                  <LinearGradient
                    colors={item.color as any}
                    locations={[0, 1]}
                    start={[0., 0]}
                    end={[0.8, 1]}
                    style={styles.buttonGradient}>
                    <TouchableOpacity style={styles.solidButton} activeOpacity={0.8} onPress={() => btn.onClick}>
                      <MaterialIcons name={btn.buttonUI as any} style={[styles.icon, {color: "#ccc"}]} />
                      <Text style={styles.titleText}>{btn.buttonText}</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                ))}
              </YStack>
            </XStack>
          </LinearGradient>
        ))}
      </MotiScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "row",
    // paddingHorizontal: 10,
    paddingTop: 20,
  },
  gradientCommon: {
    height: 250,
    width: 180,
    borderRadius: 20,
    marginHorizontal: 5,
    boxShadow: '0px 5px 4px rgba(0,0,0,0.3)',
  },
  tileContainer: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  contentStack: {
    flex: 1,
    width: "100%",
    paddingTop: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 12,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Kreadon",
    color: "#ddd",
    marginBottom: 5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Kreadon",
    color: "#ddd",
  },
  buttonGradient: {
    height: 40,
    width: 110,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
  },
  solidButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: 20,
  },
});
