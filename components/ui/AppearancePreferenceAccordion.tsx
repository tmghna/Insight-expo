import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Metrics } from "@/constants/Metric";

const useResponsiveStyles = () => {
  return StyleSheet.create({
    container: {
      // width: '100%',
<<<<<<< HEAD
      borderWidth: Metrics.moderateHorizontalScale(1,.2),
      borderColor: '#666',
      flex: 1,
      backgroundColor: '#222',
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
      backgroundColor: '#222',
    },
    headerText: {
      color: 'white',
      fontWeight: '400',
      fontSize: Metrics.moderateHorizontalScale(15,.1),
      fontFamily: 'Nunito',
      letterSpacing: Metrics.moderateHorizontalScale(1,.2),
=======
      borderWidth: Metrics.moderateHorizontalScale(1, 0.2),
      borderColor: "#666",
      flex: 1,
      backgroundColor: "#222",
      borderRadius: Metrics.moderateHorizontalScale(12, 0.1),
      overflow: "hidden",
      marginVertical: Metrics.moderateVerticalScale(6, 0.2),
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: Metrics.moderateVerticalScale(4, 0.2),
      paddingHorizontal: Metrics.moderateHorizontalScale(16, 0.2),
      backgroundColor: "#222",
    },
    headerText: {
      color: "white",
      fontWeight: "400",
      fontSize: Metrics.moderateHorizontalScale(15, 0.1),
      fontFamily: "Nunito",
      letterSpacing: Metrics.moderateHorizontalScale(1, 0.2),
>>>>>>> 6ecc9d5d25ba667ddd324712e8bbe975170b642a
    },
    contentContainer: {
      overflow: "hidden",
      backgroundColor: "#1c1c1c",
    },
    contentInner: {
<<<<<<< HEAD
      paddingHorizontal: Metrics.moderateHorizontalScale(20,.2),
      paddingVertical: Metrics.moderateVerticalScale(12,.2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Metrics.moderateVerticalScale(18,.2),
    },
    contentText: {
      color: '#ccc',
      fontSize: Metrics.moderateHorizontalScale(14,.1),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    checkbox: {
      width: Metrics.moderateHorizontalScale(16,.1),
      aspectRatio: 1,
      borderRadius: '50%',
      borderWidth: Metrics.moderateHorizontalScale(2,.1),
      borderColor: '#999',
      justifyContent: 'center',
      alignItems: 'center',
=======
      paddingHorizontal: Metrics.moderateHorizontalScale(20, 0.2),
      paddingVertical: Metrics.moderateVerticalScale(12, 0.2),
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Metrics.moderateVerticalScale(18, 0.2),
    },
    contentText: {
      color: "#ccc",
      fontSize: Metrics.moderateHorizontalScale(14, 0.1),
      fontWeight: "400",
      fontFamily: "Nunito",
    },
    checkbox: {
      width: Metrics.moderateHorizontalScale(16, 0.1),
      aspectRatio: 1,
      borderRadius: "50%",
      borderWidth: Metrics.moderateHorizontalScale(2, 0.1),
      borderColor: "#999",
      justifyContent: "center",
      alignItems: "center",
>>>>>>> 6ecc9d5d25ba667ddd324712e8bbe975170b642a
    },
    checkedBox: {
      backgroundColor: "#8345cf",
      borderColor: "#8345cf",
    },
    checkMark: {
<<<<<<< HEAD
      color: 'white',
      fontSize: Metrics.moderateHorizontalScale(12,.1),
    },
    chevron: {
      color: '#aaa',
      fontSize: Metrics.moderateHorizontalScale(24,.1),
    }
=======
      color: "white",
      fontSize: Metrics.moderateHorizontalScale(12, 0.1),
    },
    chevron: {
      color: "#aaa",
      fontSize: Metrics.moderateHorizontalScale(24, 0.1),
    },
>>>>>>> 6ecc9d5d25ba667ddd324712e8bbe975170b642a
  });
};

export function CampusFacilities() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoaded, setIsLoaded] = useState(false); // waits till async load data

  const items = [
<<<<<<< HEAD
    { key: 'market', label: 'Market', onCheck: () => {} },
    { key: 'complaints', label: 'Complaints', onCheck: () => {} },
    { key: 'contacts', label: 'Contacts', onCheck: () => {} },
    { key: 'campus map', label: 'Campus Map', onCheck: () => {} },
    { key: 'timings', label: 'Timings', onCheck: () => {} },
  ];
  const outputRangeMax = Metrics.moderateVerticalScale(24,.2) + items.length * Metrics.moderateVerticalScale(35,.2);
=======
    { key: "market", label: "Market", onCheck: () => {} },
    { key: "complaints", label: "Complaints", onCheck: () => {} },
    { key: "contacts", label: "Contacts", onCheck: () => {} },
    { key: "campus map", label: "Campus Map", onCheck: () => {} },
    { key: "timings", label: "Timings", onCheck: () => {} },
  ];
  const outputRangeMax =
    Metrics.moderateVerticalScale(24, 0.2) +
    items.length * Metrics.moderateVerticalScale(35, 0.2);
>>>>>>> 6ecc9d5d25ba667ddd324712e8bbe975170b642a

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    (async () => {
      try {
        const savedState: { [key: string]: boolean } = {};
        for (const item of items) {
<<<<<<< HEAD
          let value = await AsyncStorage.getItem(`CampusFacilities:${item.key}`);
          console.log(`${item.key}:`, value); // Debug
          if (value === null) {
            await AsyncStorage.setItem(`CampusFacilities:${item.key}`, 'true');
            value = 'true';
          }
          savedState[item.key] = value === 'true';
=======
          let value = await AsyncStorage.getItem(
            `CampusFacilities:${item.key}`
          );
          console.log(`${item.key}:`, value); // Debug
          if (value === null) {
            await AsyncStorage.setItem(`CampusFacilities:${item.key}`, "true");
            value = "true";
          }
          savedState[item.key] = value === "true";
>>>>>>> 6ecc9d5d25ba667ddd324712e8bbe975170b642a
        }
        setCheckedItems(savedState);
      } catch (e) {
        console.error("Error loading checkbox state:", e);
      } finally {
        setIsLoaded(true); // renders after this
      }
    })();
  }, []);

  const toggleCheckbox = async (key: string, callback: () => void) => {
    const newValue = !checkedItems[key];
    const newState = { ...checkedItems, [key]: newValue };
    setCheckedItems(newState);
    await AsyncStorage.setItem(
      `CampusFacilities:${key}`,
      JSON.stringify(newValue)
    );
    if (newValue) callback();
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
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={toggle}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Campus Facilities</Text>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <MaterialIcons name="expand-more" style={styles.chevron} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[styles.contentContainer, { height: animatedHeight }]}
      >
        <View style={styles.contentInner}>
          {items.map((item) => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.contentText}>{item.label}</Text>
              <TouchableOpacity
                onPress={() => toggleCheckbox(item.key, item.onCheck)}
                style={[
                  styles.checkbox,
                  checkedItems[item.key] && styles.checkedBox,
                ]}
              >
                {checkedItems[item.key] && (
                  <MaterialIcons name="check" style={styles.checkMark} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

export function HelpfulTiles() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isLoaded, setIsLoaded] = useState(false); // waits till async load data

  const items = [
<<<<<<< HEAD
    { key: 'lostnfound', label: 'Lost & Found', onCheck: () => {} },
    { key: 'lhbooking', label: 'LH Booking', onCheck: () => {} },
    { key: 'academia', label: 'Academia', onCheck: () => {} },
    { key: 'helpline', label: 'Helpline', onCheck: () => {} },
  ];
  const outputRangeMax = Metrics.moderateVerticalScale(24,.2) + items.length * Metrics.moderateVerticalScale(35,.2);
=======
    { key: "lostnfound", label: "Lost & Found", onCheck: () => {} },
    { key: "lhbooking", label: "LH Booking", onCheck: () => {} },
    { key: "academia", label: "Academia", onCheck: () => {} },
    { key: "helpline", label: "Helpline", onCheck: () => {} },
  ];
  const outputRangeMax =
    Metrics.moderateVerticalScale(24, 0.2) +
    items.length * Metrics.moderateVerticalScale(35, 0.2);
>>>>>>> 6ecc9d5d25ba667ddd324712e8bbe975170b642a

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
<<<<<<< HEAD
  (async () => {
    try {
      const savedState: { [key: string]: boolean } = {};
      for (const item of items) {
        let value = await AsyncStorage.getItem(`HelpfulTiles:${item.key}`);
        console.log(`${item.key}:`, value); // Debug
        if (value === null) {
          await AsyncStorage.setItem(`HelpfulTiles:${item.key}`, 'true');
          value = 'true';
        }
        savedState[item.key] = value === 'true';
=======
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
>>>>>>> 6ecc9d5d25ba667ddd324712e8bbe975170b642a
      }
    })();
  }, []);

  const toggleCheckbox = async (key: string, callback: () => void) => {
    const newValue = !checkedItems[key];
    const newState = { ...checkedItems, [key]: newValue };
    setCheckedItems(newState);
    await AsyncStorage.setItem(`HelpfulTiles:${key}`, JSON.stringify(newValue));
    if (newValue) callback();
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
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={toggle}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Helpful Tiles</Text>
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <MaterialIcons name="expand-more" style={styles.chevron} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[styles.contentContainer, { height: animatedHeight }]}
      >
        <View style={styles.contentInner}>
          {items.map((item) => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.contentText}>{item.label}</Text>
              <TouchableOpacity
                onPress={() => toggleCheckbox(item.key, item.onCheck)}
                style={[
                  styles.checkbox,
                  checkedItems[item.key] && styles.checkedBox,
                ]}
              >
                {checkedItems[item.key] && (
                  <MaterialIcons name="check" style={styles.checkMark} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
