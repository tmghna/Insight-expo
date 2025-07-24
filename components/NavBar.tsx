import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { usePathname, useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Metrics } from "@/constants/Metric";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from '@/components/ThemedButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useEffect } from "react";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    { icon: "home", path: "/homepage" },
    { icon: "fastfood", path: "/+not-found" },
    { icon: "notifications", path: "/(tabs)/explore" },
    { icon: "calendar-today", path: "/+not-found" },
    { icon: "auto-awesome-mosaic", path: "/+not-found" },
  ];
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ThemedView style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        const translateY = useSharedValue(0);

        useEffect(() => {
          translateY.value = withSpring(isActive ? -5 : 0, {
            damping: 15,
            stiffness: 150,
          });
        }, [isActive]);

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: translateY.value }],
        }));

        return (
          <ThemedButton
            unstyled
            key={tab.icon}
            style={styles.button}
            onPress={() => {
              if (!isActive) {
                router.push(tab.path as any);
              }
            }}
          >
            <Animated.View style={[styles.iconWrapper, animatedStyle]}>
              <MaterialIcons
                name={tab.icon as any}
                style={[styles.buttonIcon, { color: iconColor }]}
                opacity={isActive ? 1 : 0.6}
              />
            </Animated.View>
          </ThemedButton>
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: Metrics.moderateVerticalScale(60,.2),
    flexDirection: "row",
    gap: Metrics.moderateHorizontalScale(5,.2),
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    borderRadius: '50%',
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    fontSize: Metrics.moderateHorizontalScale(30,.2)
  }

});