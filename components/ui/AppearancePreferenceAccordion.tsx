// Responsive version of your CampusFacilities & HelpfulTiles component

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

const useResponsiveStyles = () => {
  const { width } = useWindowDimensions();
  const paddingHorizontal = width < 360 ? 12 : width < 400 ? 16 : 20;
  const fontSize = width < 360 ? 13 : 14;

  return StyleSheet.create({
    container: {
      width: width - 32,
      alignSelf: 'center',
      backgroundColor: '#222',
      borderRadius: 12,
      overflow: 'hidden',
      marginVertical: 6,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: paddingHorizontal,
      backgroundColor: '#222',
    },
    headerText: {
      color: 'white',
      fontWeight: '500',
      fontSize: fontSize + 2,
      fontFamily: 'Nunito',
    },
    contentContainer: {
      overflow: 'hidden',
      backgroundColor: '#1c1c1c',
    },
    contentInner: {
      paddingHorizontal: paddingHorizontal*1.2,
      paddingVertical: 10,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18,
    },
    contentText: {
      color: '#ccc',
      fontSize: fontSize,
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    checkbox: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2,
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
      fontSize: 14,
    },
  });
};

export function CampusFacilities() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const items = [
    { key: 'market', label: 'Market', onCheck: () => {} },
    { key: 'complaints', label: 'Complaints', onCheck: () => {} },
    { key: 'contacts', label: 'Contacts', onCheck: () => {} },
    { key: 'map', label: 'Campus Map', onCheck: () => {} },
    { key: 'timings', label: 'Timings', onCheck: () => {} },
  ];
  const outputRangeMax = 24 + items.length * 35;

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  const toggleCheckbox = (key, callback) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      if (newState[key]) callback();
      return newState;
    });
  };

  const triggerAnimation = (toOpen) => {
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
            <MaterialIcons name="expand-more" size={24} color="#aaa" />
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
}

export function HelpfulTiles() {
  const styles = useResponsiveStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const items = [
    { key: 'lostnfound', label: 'Lost & Found', onCheck: () => {} },
    { key: 'contacts', label: 'Emergency Contacts', onCheck: () => {} },
    { key: 'bookmaterial', label: 'Book Material', onCheck: () => {} },
    { key: 'laundry', label: 'Laundry', onCheck: () => {} },
  ];
  const outputRangeMax = 24 + items.length * 35;

  const animation = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  const toggleCheckbox = (key, callback) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      if (newState[key]) callback();
      return newState;
    });
  };

  const triggerAnimation = (toOpen) => {
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
            <MaterialIcons name="expand-more" size={24} color="#aaa" />
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
}
