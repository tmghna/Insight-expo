import { useFocusEffect } from '@react-navigation/native';
import { YStack, XStack, Text } from "tamagui";
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

const tiles = [
  {
    id: 'lostnfound',
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
    id: 'lhbooking',
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
    id: 'academia',
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
    id: 'helpline',
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
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(20);

  const loadState = useCallback(async () => {
      try {
        const state: { [key: string]: boolean } = {};
        for (const item of tiles) {
          const value = await AsyncStorage.getItem(`HelpfulTiles:${item.id}`);
          state[item.id] = value === 'true';
        }
        setVisibleItems(state);
      } catch (e) {
        console.error('Error loading tile visibility:', e);
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
          ) : null
        ))}
      </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: Metrics.moderateVerticalScale(20,.2),
  },
  scrollContent: {
    paddingLeft: Metrics.moderateHorizontalScale(20,.2),
    paddingRight: Metrics.moderateHorizontalScale(10,.2),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  gradientCommon: {
    height: Metrics.moderateHorizontalScale(240,.2),
    width: Metrics.moderateHorizontalScale(160,.2),
    borderRadius: Metrics.moderateHorizontalScale(16,.1),
    marginHorizontal: Metrics.moderateHorizontalScale(5,.2),
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
    paddingTop: Metrics.moderateHorizontalScale(15,.2),
    paddingHorizontal: Metrics.moderateHorizontalScale(10,.2),
    alignItems: "center",
    gap: Metrics.moderateHorizontalScale(12,.2),
  },
  headingText: {
    fontSize: Metrics.moderateHorizontalScale(16,.2),
    fontWeight: "700",
    fontFamily: "Kreadon",
    color: "#ddd",
    marginBottom: 5,
  },
  titleText: {
    fontSize: Metrics.moderateHorizontalScale(13,.2),
    fontWeight: "600",
    fontFamily: "Kreadon",
    color: "#ccc",
  },
  buttonGradient: {
    height: Metrics.moderateHorizontalScale(40,.2),
    width: Metrics.moderateHorizontalScale(110,.2),
    borderRadius: Metrics.moderateHorizontalScale(14,.1),
    overflow: "hidden",
    boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
  },
  solidButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Metrics.moderateHorizontalScale(8,.2),
    paddingHorizontal: Metrics.moderateHorizontalScale(20,.2),
    backgroundColor: "transparent",
  },
  icon: {
    fontSize: Metrics.moderateHorizontalScale(20,.2),
    color: "#ccc",
  },
});
