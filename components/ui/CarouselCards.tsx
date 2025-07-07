import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import { Image, Text, Button } from "tamagui";
import { Metrics } from "@/constants/Metric";
import { useRouter } from "expo-router";

const width = Metrics.screenWidth;
const CARD_WIDTH = width * 0.85;
const SIDE_SPACING = (width - CARD_WIDTH) / 2; // to center cards

const data = [
  {
    id: "1",
    image: {
      uri: "https://i.postimg.cc/SNWHZmNy/hceyyyryrinsight.png",
    },
    description: "card1",
    textcolor: "#111",
  },
  {
    id: "2",
    image: require("@/assets/images/Card.png"),
    description: "card2",
    textcolor: "#fff",
  },
  {
    id: "3",
    image: require("@/assets/images/Card.png"),
    description: "card3",
    textcolor: "#FFF",
  },

];

export function NotifCards() {
  const scrollX = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleCardPress = (index: number) => {
    scrollRef.current?.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  };

  return (
    <Animated.ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      snapToInterval={CARD_WIDTH}
      decelerationRate="fast"
      contentContainerStyle={{
        paddingHorizontal: SIDE_SPACING,
      }}
    >
      {data.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ];

          const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return {
            transform: [{ scale }],
            opacity,
          };
        });

        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleCardPress(index)}
            activeOpacity={1}
          >
            <Animated.View style={[styles.card, animatedStyle]}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={[styles.cardTitle, {color: item.textcolor}]}>{item.description}</Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </Animated.ScrollView>
  );
};

const facilities = [
  {
    id: "Market",
    image: require("@/assets/images/market2.png"),
    push: "/+not-found",
  },
  {
    id: "Complaints",
    image: require("@/assets/images/complaints2.png"),
    push: "/+not-found",
  },
  {
    id: "Contacts",
    image: require("@/assets/images/menu2.png"),
    push: "/contacts",
  },
  {
    id: "Timings",
    image: require("@/assets/images/time2.png"),
    push: "/+not-found",
  },
];

const BOX_WIDTH = 135;
const BOX_HEIGHT = 60;

export function CampusFacilityCards() {
  const router = useRouter();

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(20);

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
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {facilities.map((item) => (
        <Animated.View key={item.id} style={[animatedStyle, styles.animatedCard]}>
          <TouchableOpacity
            onPress={() => router.push(item.push as any)}
            style={styles.campusCard}
            activeOpacity={0.8}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
              {item.id}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  // Notif styles
  card: {
    width: CARD_WIDTH,
    height: Metrics.moderateScale(160,.2),
    marginVertical: Metrics.moderateScale(20,.2),
    borderRadius: Metrics.moderateScale(20,.1),
    backgroundColor: "#111",
    justifyContent: "flex-end",
    alignItems: "center", 
    boxShadow: '0px 5px 4px rgba(0,0,0,0.3)',
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: Metrics.moderateScale(20,.1),
  },
  cardTitle: {
    position: 'absolute',
    fontSize: Metrics.moderateScale(18,.2),
    fontWeight: "400",
    fontFamily: "Nunito",
    paddingBottom: Metrics.moderateScale(20,.2),
  },
  container: {
    flex: 0,
    flexDirection: "row",
  },
  scrollContent: {
    paddingLeft: Metrics.moderateScale(20,.2),
    paddingRight: Metrics.moderateScale(10,.2),
    alignItems: "center",
  },
  animatedCard: {
    marginRight: Metrics.moderateScale(10,.2),
  },
  campusCard: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    borderRadius: Metrics.moderateScale(16,.1),
    backgroundColor: "#1f1f1f",
    borderColor: "#1f1f1f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-evenly'
  },
  image: {
    width: "25%",
    aspectRatio: 1,
    borderRadius: Metrics.moderateScale(8,.1),
    resizeMode: "cover",
  },
  text: {
    // flexShrink: 1,
    fontSize: Metrics.moderateScale(14,.2),
    color: "#fff",
    fontWeight: '400',
    fontFamily: "Nunito",
    letterSpacing: Metrics.moderateScale(1,.2),
  },
});
