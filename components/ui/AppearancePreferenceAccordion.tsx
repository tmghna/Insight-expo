import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function CampusFacilities() {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const items = [
    { key: 'market', label: 'Market', onCheck: () => {} },
    { key: 'complaints', label: 'Complaints', onCheck: () => {} },
    { key: 'contacts', label: 'Contacts', onCheck: () => {} },
    { key: 'map', label: 'Campus Map', onCheck: () => {} },
    { key: 'timings', label: 'Timings', onCheck: () => {} },
  ];

  const toggleCheckbox = (key: string, callback: () => void) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      if (newState[key]) {
        callback(); // Only call if checked
      }
      return newState;
    });
  };
  // Tracker for height anim
  const animation = useRef(new Animated.Value(0)).current;
  // Tracker for chevron rotation anim
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  const triggerAnimation = (toOpen: boolean) => {
    if (toOpen) {
      closeAnim.setValue(1); // reset the close anim
      Animated.timing(openAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      openAnim.setValue(0); // reset the open anim
      Animated.timing(closeAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    // Animate height
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Animate rotation
    triggerAnimation(isOpen);
  }, [isOpen]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 35*items.length], // Needs to be responsive. Tamaghna
  });
  // Open and close with jerks
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
};

export function HelpfulTiles() {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const items = [
    { key: 'lostnfound', label: 'Lost & Found', onCheck: () => {} },
    { key: 'contacts', label: 'Emergency Contacts', onCheck: () => {} },
    { key: 'bookmaterial', label: 'Book Material', onCheck: () => {} },
    { key: 'laundry', label: 'Laundry', onCheck: () => {} },
  ];

  const toggleCheckbox = (key: string, callback: () => void) => {
    setCheckedItems(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      if (newState[key]) {
        callback(); // Only call if checked
      }
      return newState;
    });
  };
  // Tracker for height anim
  const animation = useRef(new Animated.Value(0)).current;
  // Tracker for chevron rotation anim
  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(1)).current;

  const triggerAnimation = (toOpen: boolean) => {
    if (toOpen) {
      closeAnim.setValue(1); // reset the close anim
      Animated.timing(openAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      openAnim.setValue(0); // reset the open anim
      Animated.timing(closeAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const toggle = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    // Animate height
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    // Animate rotation
    triggerAnimation(isOpen);
  }, [isOpen]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 35*items.length], // Needs to be responsive. Tamaghna
  });
  // Open and close with jerks
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
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2c2c2c',
  },
  headerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  contentContainer: {
    overflow: 'hidden',
    backgroundColor: '#1c1c1c',
  },
  contentInner: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contentText: {
    color: '#ccc',
    fontSize: 14,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 6,
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
  }
});
