import { useFocusEffect } from '@react-navigation/native';
import Animated, { 
  Easing, 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Metrics } from "@/constants/Metric";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const tiles = [
  {
    id: "lostnfound",
    title: "Lost & Found",
    color: ["#5499bb", "#4475a6"],
    buttons: [
      {
        key: "add",
        buttonUI: "playlist-add",
        buttonText: "Add",
        onClick: () => {},
      },
    ],
  },
  {
    id: "lhbooking",
    title: "LH Booking",
    color: ["#6471c4", "#4758ad"],
    buttons: [
      {
        key: "book",
        buttonUI: "schedule",
        buttonText: "Book",
        onClick: () => {},
      },
    ],
  },
  {
    id: "academia",
    title: "Academia",
    color: ["#8164c4", "#6243b1"],
    buttons: [
      {
        key: "drive",
        buttonUI: "storage",
        buttonText: "Drive Material",
        onClick: () => {},
      },
      {
        key: "course",
        buttonUI: "library-books",
        buttonText: "Course Structure",
        onClick: () => {},
      },
      {
        key: "calendar",
        buttonUI: "calendar-month",
        buttonText: "Academic Calender",
        onClick: () => {},
      },
    ],
  },
  {
    id: "helpline",
    title: "Helpline",
    color: ["#c464a1", "#a84388"],
    buttons: [
      {
        key: "ambulance",
        buttonUI: "health-and-safety",
        buttonText: "Ambulance",
        onClick: () => {},
      },
      {
        key: "hospital",
        buttonUI: "local-hospital",
        buttonText: "Hospital",
        onClick: () => {},
      },
    ],
  },
];

export default function Tiles() {
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(20);

  const loadState = useCallback(async () => {
    try {
      const state: { [key: string]: boolean } = {};
      for (const item of tiles) {
        const value = await AsyncStorage.getItem(`HelpfulTiles:${item.id}`);
        state[item.id] = value === "true";
      }
      setVisibleItems(state);
    } catch (e) {
      console.error("Error loading tile visibility:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadState();
    }, [loadState])
  );

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 450,
      easing: Easing.inOut(Easing.ease),
    });
    translateX.value = withTiming(0, {
      duration: 460,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));
  return (
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {tiles.map((item) => (
          visibleItems[item.id] ? (
            <LinearGradient
              colors={item.color as any}
              locations={[0, .5]}
              start={[0.1, 0.1]}
              end={[.9, .9]}
              style={styles.gradientCommon}
              key={item.id}
            >
              <ThemedView unstyled style={styles.tileContainer}>
                <ThemedView unstyled style={styles.contentStack}>
                  <ThemedText style={styles.headingText}>{item.title}</ThemedText>
                  {item.buttons.map((btn) => (
                    <LinearGradient
                      colors={item.color as any}
                      locations={[0, 1]}
                      start={[0.2, 0]}
                      end={[0.5, 1]}
                      style={styles.buttonGradient}
                      key={btn.key}>
                      <TouchableOpacity style={styles.solidButton} onPress={() => btn.onClick}>
                        <MaterialIcons name={btn.buttonUI as any} style={styles.icon} />
                        <ThemedText style={styles.titleText}>{btn.buttonText}</ThemedText>
                      </TouchableOpacity>
                    </LinearGradient>
                  ))}
                </ThemedView>
              </ThemedView>
            </LinearGradient>
          ) : null
        ))}
      </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: Metrics.moderateVerticalScale(20, 0.2),
  },
  scrollContent: {
    paddingLeft: Metrics.moderateHorizontalScale(20, 0.2),
    paddingRight: Metrics.moderateHorizontalScale(10, 0.2),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  gradientCommon: {
    height: Metrics.moderateHorizontalScale(240,.2),
    width: Metrics.moderateHorizontalScale(160,.2),
    borderRadius: Metrics.moderateHorizontalScale(16,.1),
    marginHorizontal: Metrics.moderateHorizontalScale(5,.2),
    boxShadow: '0px 5px 2px rgba(0,0,0,0.2)',
  },
  tileContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  contentStack: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    paddingTop: Metrics.moderateHorizontalScale(15, 0.2),
    paddingHorizontal: Metrics.moderateHorizontalScale(10, 0.2),
    alignItems: "center",
    gap: Metrics.moderateHorizontalScale(12, 0.2),
  },
  headingText: {
    fontSize: Metrics.moderateHorizontalScale(16, 0.2),
    fontFamily: "Kreadon700",
    color: "#ddd",
    marginBottom: 5,
  },
  titleText: {
    fontSize: Metrics.moderateHorizontalScale(13, 0.2),
    fontFamily: "Kreadon600",
    color: "#ccc",
  },
  buttonGradient: {
    height: Metrics.moderateHorizontalScale(40, 0.2),
    width: Metrics.moderateHorizontalScale(110, 0.2),
    borderRadius: Metrics.moderateHorizontalScale(14, 0.1),
    overflow: "hidden",
    boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  solidButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Metrics.moderateHorizontalScale(8, 0.2),
    paddingHorizontal: Metrics.moderateHorizontalScale(20, 0.2),
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: Metrics.moderateHorizontalScale(20, 0.2),
    color: "#ccc",
  },
});