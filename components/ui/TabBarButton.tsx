import { TouchableOpacity, View, StyleSheet } from 'react-native';
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
  path: string;
  onPress: () => void;
};

export function TabBarButton({ icon, path, onPress }: Props) {
  const iconColor = useThemeColor({}, 'icon');
  const translateY = useSharedValue(0);
  const pathname = usePathname();
  const isFocused = pathname === '/' ? path === 'index' : pathname === `/${path}`;

  useEffect(() => {
    translateY.value = withSpring(isFocused ? Metrics.moderateVerticalScale(-5,0.2) : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Animated.View style={[styles.iconWrapper, animatedStyle]}>
        <MaterialIcons
          name={icon as any}
          size={Metrics.moderateHorizontalScale(28,0.2)}
          color={iconColor}
          style={{ opacity: isFocused ? 1 : 0.6 }}
        />
      </Animated.View>
    </TouchableOpacity>
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
