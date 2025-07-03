import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native';
import { Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Metrics } from '@/constants/Metric';

const useResponsiveStyles = () => {

  return StyleSheet.create({
    container: {
      width: '100%',
      alignSelf: 'center',
      backgroundColor: '#222',
      borderRadius: Metrics.moderateScale(12,.1),
      overflow: 'hidden',
      marginVertical: Metrics.moderateScale(6,.2),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Metrics.moderateScale(4,.2),
      paddingHorizontal: Metrics.moderateScale(16,.2),
      backgroundColor: '#222',
    },
    headerText: {
      color: 'white',
      fontWeight: '400',
      fontSize: Metrics.moderateScale(14,.1),
      fontFamily: 'Nunito',
    },
    contentContainer: {
      overflow: 'hidden',
      backgroundColor: '#1c1c1c',
    },
    contentInner: {
      paddingHorizontal: Metrics.moderateScale(20,.2),
      paddingVertical: Metrics.moderateScale(12,.2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Metrics.moderateScale(18,.2),
    },
    contentText: {
      color: '#ccc',
      fontSize: Metrics.moderateScale(13,.1),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    checkbox: {
      width: Metrics.moderateScale(16,.1),
      height: Metrics.moderateScale(16,.1),
      borderRadius: '50%',
      borderWidth: Metrics.moderateScale(2,.1),
      borderColor: '#999',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkedBox: {
      backgroundColor: '#8345cf',
      borderColor: '#8345cf',
    },
    checkMark: {
      color: 'white',
      fontSize: Metrics.moderateScale(12,.1),
    },
    chevron: {
      color: '#aaa',
      fontSize: Metrics.moderateScale(24,.1),
    }
  });
};

export function CampusFacilities() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState(false); // waits till async load data

  const items = [
    { key: 'market', label: 'Market', onCheck: () => {} },
    { key: 'complaints', label: 'Complaints', onCheck: () => {} },
    { key: 'contacts', label: 'Contacts', onCheck: () => {} },
    { key: 'map', label: 'Campus Map', onCheck: () => {} },
    { key: 'timings', label: 'Timings', onCheck: () => {} },
  ];
  const outputRangeMax = Metrics.moderateScale(24,.1) + items.length * Metrics.moderateScale(35,.1);

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

useEffect(() => {
  (async () => {
    try {
      const savedState: { [key: string]: boolean } = {};
      for (const item of items) {
        const value = await AsyncStorage.getItem(`CampusFacilities:${item.key}`);
        console.log(`${item.key}:`, value); // Debug
        savedState[item.key] = value === 'true';
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
    await AsyncStorage.setItem(`CampusFacilities:${key}`, JSON.stringify(newValue));
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

  const toggle = () => setIsOpen(prev => !prev);

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
    outputRange: ['0deg', '210deg', '170deg', '180deg'],
  });
  const closingRotation = closeAnim.interpolate({
    inputRange: [0, 0.1, 0.3, 1],
    outputRange: ['0deg', '-30deg', '10deg', '180deg'],
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

      <Animated.View style={[styles.contentContainer, { height: animatedHeight }]}>
        <View style={styles.contentInner}>
          {items.map(item => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.contentText}>{item.label}</Text>
              <TouchableOpacity
                onPress={() => toggleCheckbox(item.key, item.onCheck)}
                style={[
                  styles.checkbox,
                  checkedItems[item.key] && styles.checkedBox,
                ]}>
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
};

export function HelpfulTiles() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [isLoaded, setIsLoaded] = useState(false); // waits till async load data

  const items = [
    { key: 'lostnfound', label: 'Lost & Found', onCheck: () => {} },
    { key: 'contacts', label: 'Emergency Contacts', onCheck: () => {} },
    { key: 'bookmaterial', label: 'Book Material', onCheck: () => {} },
    { key: 'laundry', label: 'Laundry', onCheck: () => {} },
  ];
  const outputRangeMax = Metrics.moderateScale(24,.1) + items.length * Metrics.moderateScale(35,.1);

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
  (async () => {
    try {
      const savedState: { [key: string]: boolean } = {};
      for (const item of items) {
        const value = await AsyncStorage.getItem(`HelpfulTiles:${item.key}`);
        console.log(`${item.key}:`, value); // Debug
        savedState[item.key] = value === 'true';
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

  const toggle = () => setIsOpen(prev => !prev);

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
    outputRange: ['0deg', '210deg', '170deg', '180deg'],
  });
  const closingRotation = closeAnim.interpolate({
    inputRange: [0, 0.1, 0.3, 1],
    outputRange: ['0deg', '-30deg', '10deg', '180deg'],
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

      <Animated.View style={[styles.contentContainer, { height: animatedHeight }]}>
        <View style={styles.contentInner}>
          {items.map(item => (
            <View key={item.key} style={styles.row}>
              <Text style={styles.contentText}>{item.label}</Text>
              <TouchableOpacity
                onPress={() => toggleCheckbox(item.key, item.onCheck)}
                style={[
                  styles.checkbox,
                  checkedItems[item.key] && styles.checkedBox,
                ]}>
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
};
