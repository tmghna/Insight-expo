import React, { useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Metrics } from '@/constants/Metric';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from '@/hooks/useThemeColor';

const useResponsiveStyles = () => {
  return StyleSheet.create({
    container: {
      borderWidth: Metrics.moderateHorizontalScale(1, 0.2),
      borderColor: "#666",
      flex: 1,
      borderRadius: Metrics.moderateHorizontalScale(12,.1),
      overflow: 'hidden',
      marginVertical: Metrics.moderateVerticalScale(6,.2),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Metrics.moderateVerticalScale(4,.2),
      paddingHorizontal: Metrics.moderateHorizontalScale(16,.2),
    },
    headerText: {
      fontSize: Metrics.moderateHorizontalScale(15,.1),
      letterSpacing: Metrics.moderateHorizontalScale(1,.2),
    },
    contentContainer: {
      overflow: 'hidden',
    },
    contentInner: {
      paddingHorizontal: Metrics.moderateHorizontalScale(20,.2),
      paddingVertical: Metrics.moderateVerticalScale(12,.2),
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Metrics.moderateVerticalScale(18, 0.2),
    },
    checkbox: {
      width: Metrics.moderateHorizontalScale(16, 0.1),
      aspectRatio: 1,
      borderRadius: "50%",
      borderWidth: Metrics.moderateHorizontalScale(2, 0.1),
      borderColor: "#999",
      justifyContent: "center",
      alignItems: "center",
    },
    checkedBox: {
      backgroundColor: "#8345cf",
      borderColor: "#8345cf",
    },
    checkMark: {
      color: "white",
      fontSize: Metrics.moderateHorizontalScale(12, 0.1),
    },
    chevron: {
      fontSize: Metrics.moderateHorizontalScale(24,.1),
    }
  });
};

export function CampusFacilities() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoaded, setIsLoaded] = useState(false); // waits till async load data
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor(
    { light: '#f6f6f6', dark: '#222' },
    'background'
  );

  const items = [
    { key: "market", label: "Market" },
    { key: "complaints", label: "Complaints" },
    { key: "contacts", label: "Contacts" },
    { key: "campus map", label: "Campus Map" },
    { key: "timings", label: "Timings" },
  ];
  const outputRangeMax =
    Metrics.moderateVerticalScale(24, 0.2) +
    items.length * Metrics.moderateVerticalScale(35, 0.2);

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      try {
        const savedState: { [key: string]: boolean } = {};
        for (const item of items) {
          let value = await AsyncStorage.getItem(
            `CampusFacilities:${item.key}`
          );
          console.log(`${item.key}:`, value); // Debug
          if (value === null) {
            await AsyncStorage.setItem(`CampusFacilities:${item.key}`, "true");
            value = "true";
          }
          savedState[item.key] = value === "true";
        }
        setCheckedItems(savedState);
      } catch (e) {
        console.error("Error loading checkbox state:", e);
      } finally {
        setIsLoaded(true); // renders after this
      }
    })();
  }, []);

  const toggleCheckbox = async (key: string) => {
    const newValue = !checkedItems[key];
    const newState = { ...checkedItems, [key]: newValue };
    setCheckedItems(newState);
    await AsyncStorage.setItem(
      `CampusFacilities:${key}`,
      JSON.stringify(newValue)
    );
  };

  const triggerAnimation = (toOpen: boolean) => {
    if (toOpen) {
      closeAnim.setValue(1);
      Animated.timing(openAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      openAnim.setValue(0);
      Animated.timing(closeAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    triggerAnimation(isOpen);
  }, [isOpen]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, outputRangeMax],
  });

  const openingRotation = openAnim.interpolate({
    inputRange: [0, 0.7, 0.9, 1],
    outputRange: ["0deg", "210deg", "170deg", "180deg"],
  });
  const closingRotation = closeAnim.interpolate({
    inputRange: [0, 0.1, 0.3, 1],
    outputRange: ["0deg", "-30deg", "10deg", "180deg"],
  });
  const rotation = isOpen ? openingRotation : closingRotation;

  return (
    <ThemedView style={[styles.container, {backgroundColor: primaryColor}]}>
      <TouchableOpacity activeOpacity={0.9} onPress={toggle}>
        <ThemedView unstyled style={styles.header}>
          <ThemedText style={styles.headerText}>Campus Facilities</ThemedText>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <MaterialIcons name="expand-more" style={[styles.chevron, {color: iconColor}]} />
          </Animated.View>
        </ThemedView>
      </TouchableOpacity>

      <Animated.View style={[styles.contentContainer, { height: animatedHeight }]}>
        <ThemedView unstyled style={styles.contentInner}>
          {items.map((item) => (
            <ThemedView unstyled key={item.key} style={styles.row}>
              <ThemedText>{item.label}</ThemedText>
              <TouchableOpacity
                onPress={() => toggleCheckbox(item.key)}
                style={[
                  styles.checkbox,
                  checkedItems[item.key] && styles.checkedBox,
                ]}
              >
                {checkedItems[item.key] && (
                  <MaterialIcons name="check" style={styles.checkMark} />
                )}
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>
      </Animated.View>
    </ThemedView>
  );
}

export function HelpfulTiles() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoaded, setIsLoaded] = useState(false); // waits till async load data
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor(
    { light: '#f6f6f6', dark: '#222' },
    'background'
  )

  const items = [
    { key: "lostnfound", label: "Lost & Found" },
    { key: "lhbooking", label: "LH Booking" },
    { key: "academia", label: "Academia" },
    { key: "helpline", label: "Helpline" },
  ];
  const outputRangeMax =
    Metrics.moderateVerticalScale(24, 0.2) +
    items.length * Metrics.moderateVerticalScale(35, 0.2);

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      try {
        const savedState: { [key: string]: boolean } = {};
        for (const item of items) {
          let value = await AsyncStorage.getItem(`HelpfulTiles:${item.key}`);
          console.log(`${item.key}:`, value); // Debug
          if (value === null) {
            await AsyncStorage.setItem(`HelpfulTiles:${item.key}`, "true");
            value = "true";
          }
          savedState[item.key] = value === "true";
        }
        setCheckedItems(savedState);
      } catch (e) {
        console.error("Error loading checkbox state:", e);
      } finally {
        setIsLoaded(true); // renders after this
      }
    })();
  }, []);

  const toggleCheckbox = async (key: string) => {
    const newValue = !checkedItems[key];
    const newState = { ...checkedItems, [key]: newValue };
    setCheckedItems(newState);
    await AsyncStorage.setItem(`HelpfulTiles:${key}`, JSON.stringify(newValue));
  };

  const triggerAnimation = (toOpen: boolean) => {
    if (toOpen) {
      closeAnim.setValue(1);
      Animated.timing(openAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      openAnim.setValue(0);
      Animated.timing(closeAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    triggerAnimation(isOpen);
  }, [isOpen]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, outputRangeMax],
  });

  const openingRotation = openAnim.interpolate({
    inputRange: [0, 0.7, 0.9, 1],
    outputRange: ["0deg", "210deg", "170deg", "180deg"],
  });
  const closingRotation = closeAnim.interpolate({
    inputRange: [0, 0.1, 0.3, 1],
    outputRange: ["0deg", "-30deg", "10deg", "180deg"],
  });
  const rotation = isOpen ? openingRotation : closingRotation;

  return (
    <ThemedView style={[styles.container, {backgroundColor: primaryColor}]}>
      <TouchableOpacity activeOpacity={0.9} onPress={toggle}>
        <ThemedView unstyled style={styles.header}>
          <ThemedText style={styles.headerText}>Helpful Tiles</ThemedText>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <MaterialIcons name="expand-more" style={[styles.chevron, {color: iconColor}]} />
          </Animated.View>
        </ThemedView>
      </TouchableOpacity>

      <Animated.View style={[styles.contentContainer, { height: animatedHeight }]}>
        <ThemedView unstyled style={styles.contentInner}>
          {items.map((item) => (
            <ThemedView unstyled key={item.key} style={styles.row}>
              <ThemedText>{item.label}</ThemedText>
              <TouchableOpacity
                onPress={() => toggleCheckbox(item.key)}
                style={[
                  styles.checkbox,
                  checkedItems[item.key] && styles.checkedBox,
                ]}
              >
                {checkedItems[item.key] && (
                  <MaterialIcons name="check" style={styles.checkMark} />
                )}
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>
      </Animated.View>
    </ThemedView>
  );
}