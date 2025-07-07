// HelpfulTiles.tsx
import { YStack, XStack, Text } from "tamagui";
import { MotiScrollView } from "moti";
import { Easing } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Metrics } from "@/constants/Metric";

const tiles = [
  {
    id: '1',
    title: "Lost & Found",
    color: ["#5499bb", "#4475a6"],
    buttons: [
      {
        key: 'add',
        buttonUI: "playlist-add",
        buttonText: 'Add',
        onClick: () => {}
      }
    ],
  },
  {
    id: '2',
    title: "LH Booking",
    color: ["#5c6bc1","#4758ad"], 
    buttons: [
      {
        key: 'book',
        buttonUI: "schedule",
        buttonText: "Book",
        UIcolor: '#341840',
        onClick: () => {}
      }
    ],
  },
  {
    id: '3',
    title: "Academia",
    color: ["#795cc1","#6043b1"],
    buttons: [
      {
        key: 'drive',
        buttonUI: "storage",
        buttonText: 'Drive Material',
        UIcolor: '#341840',
        onClick: () => {}
      },
      {
        key: 'course',
        buttonUI: "library-books",
        buttonText: 'Course Structure',
        UIcolor: '#341840',
        onClick: () => {}
      },
      {
        key: 'calendar',
        buttonUI: "calendar-month",
        buttonText: 'Academic Calender',
        UIcolor: '#341840',
        onClick: () => {}
      }
    ],
  },
  {
    id: '4',
    title: "Helpline",
    color: [ "#c15c9c", "#a84388"],
    buttons: [
      {
        key: 'ambulance',
        buttonUI: "health-and-safety",
        buttonText: 'Ambulance',
        UIcolor: '#341840',
        onClick: () => {}
      },
      {
        key: 'hospital',
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
            key={item.id}
          >
            <XStack style={styles.tileContainer}>
              <YStack style={styles.contentStack}>
                <Text style={styles.headingText}>{item.title}</Text>
                {item.buttons.map((btn) => (
                  <LinearGradient
                    colors={item.color as any}
                    locations={[0, 1]}
                    start={[0., 0]}
                    end={[0.8, 1]}
                    style={styles.buttonGradient}
                    key={btn.key}>
                    <TouchableOpacity style={styles.solidButton} activeOpacity={0.8} onPress={() => btn.onClick}>
                      <MaterialIcons name={btn.buttonUI as any} style={styles.icon} />
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
    paddingVertical: Metrics.moderateScale(20,.2),
  },
  gradientCommon: {
    height: Metrics.moderateScale(240,.2),
    width: Metrics.moderateScale(160,.2),
    borderRadius: Metrics.moderateScale(16,.1),
    marginHorizontal: Metrics.moderateScale(5,.2),
    boxShadow: '0px 5px 4px rgba(0,0,0,0.3)',
  },
  tileContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  contentStack: {
    flex: 1,
    width: "100%",
    paddingTop: Metrics.moderateScale(15,.2),
    paddingHorizontal: Metrics.moderateScale(10,.2),
    alignItems: "center",
    gap: Metrics.moderateScale(12,.2),
  },
  headingText: {
    fontSize: Metrics.moderateScale(16,.2),
    fontWeight: "700",
    fontFamily: "Kreadon",
    color: "#ddd",
    marginBottom: 5,
  },
  titleText: {
    fontSize: Metrics.moderateScale(13,.2),
    fontWeight: "600",
    fontFamily: "Kreadon",
    color: "#ccc",
  },
  buttonGradient: {
    height: Metrics.moderateScale(40,.2),
    width: Metrics.moderateScale(110,.2),
    borderRadius: Metrics.moderateScale(14,.1),
    overflow: "hidden",
    boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
  },
  solidButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Metrics.moderateScale(8,.2),
    paddingHorizontal: Metrics.moderateScale(20,.2),
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: Metrics.moderateScale(20,.2),
    color: "#ccc",
  },
});
