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
  const animation = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120], // Needs to be responsive. Tamaghna
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 0.1, 0.3, 1],
    outputRange: ['0deg', '-30deg', '10deg', '180deg'],
  });

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
          <Text style={styles.contentText}>• Market</Text>
          <Text style={styles.contentText}>• Library</Text>
          <Text style={styles.contentText}>• Contacts</Text>
          <Text style={styles.contentText}>• Complaints</Text>
        </View>
      </Animated.View>
    </View>
  );
}

export function HelpfulTiles() {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120], // You can adjust this depending on how much content there is
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

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
          <Text style={styles.contentText}>Lost & Found</Text>
          <Text style={styles.contentText}>Emergency Contacts</Text>
          <Text style={styles.contentText}>Book Material</Text>
          {/* <Text style={styles.contentText}>Laundry</Text> */}
        </View>
      </Animated.View>
    </View>
  );
}

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
  contentText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
});
