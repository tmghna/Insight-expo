import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { usePathname } from 'expo-router';
import { Metrics } from '@/constants/Metric';

type Props = {
  icon: string;
  size: number;
  path: string;
  onPress: () => void;
};

export function TabBarButton({ icon, size, path, onPress }: Props) {
  const iconColor = useThemeColor({}, 'icon');
  const translateY = useSharedValue(0);
  const pathname = usePathname();
  const isFocused = pathname === '/' ? path === 'index' : pathname === `/${path}`;
  const scale = useSharedValue(1);
  
  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 20,
      stiffness: 250,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 200,
    });
  };

  useEffect(() => {
    translateY.value = withSpring(isFocused ? Metrics.moderateVerticalScale(-5,0.2) : 0, {
      damping: 10,
      stiffness: 150,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value}, { scale: scale.value }],
  }));

  return (
    <Pressable 
      onPress={onPress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
      style={styles.button}
    >
      <Animated.View style={[styles.iconWrapper, animatedStyle]}>
        <MaterialIcons
          name={icon as any}
          size={Metrics.moderateHorizontalScale(size,0.2)}
          color={iconColor}
          style={{ opacity: isFocused ? 1 : 0.6 }}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Metrics.moderateVerticalScale(10,0.2),
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
