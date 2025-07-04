import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { Image, Text } from "tamagui";
import { Metrics } from "@/constants/Metric";

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

export default function NotifCards() {
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
            activeOpacity={0.95}
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
}

const styles = StyleSheet.create({
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
});
