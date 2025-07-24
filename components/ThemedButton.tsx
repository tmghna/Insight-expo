import React, { ReactNode, useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  StyleProp,
  Animated,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Metrics } from '@/constants/Metric';

type ButtonType = 'primary' | 'secondary' | 'outline';

export type ThemedButtonProps = {
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  lightColor?: string;
  darkColor?: string;
  unstyled?: boolean;
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;   // Container styles
  activeOpacity?: number;
};

export function ThemedButton({
  children,
  onPress,
  lightColor,
  darkColor,
  unstyled = false,
  type = 'primary',
  style,
  activeOpacity = 1,
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackground');
  const textColor = useThemeColor({}, 'text');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 100,
      bounciness: 1,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 4,
    }).start();
  };

  const containerStyle: StyleProp<ViewStyle> = unstyled
    ? style
    : [
        styles.button,
        type === 'primary' && { backgroundColor },
        type === 'secondary' && styles.secondary,
        type === 'outline' && [styles.outline, { borderColor: textColor }],
        style,
      ];

  return (
    <Pressable
      onPress={(e) => {
        onPress?.(e);
      }} 
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        { opacity: pressed && !unstyled ? activeOpacity : 1, }
      ]} 
      {...otherProps}
    >
      <Animated.View
        style={[
          { transform: [{ scale: scaleAnim }] },
          !unstyled && containerStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 3px 4px rgba(0,0,0,0.15)',
  },
  secondary: {
    backgroundColor: '#666',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: Metrics.moderateHorizontalScale(1,.2),
  },
});