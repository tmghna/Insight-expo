import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { usePathname, useRouter } from "expo-router";
import { useRef, useEffect } from "react";

const tabs = [
  { icon: "home", path: "/homepage" },
  { icon: "fastfood", path: "/+not-found" },
  { icon: "notifications", path: "/(tabs)/explore" },
  { icon: "calendar-today", path: "/+not-found" },
  { icon: "auto-awesome-mosaic", path: "/+not-found" },
];

export default function NavBar() {
  const router = useRouter();
  const styles = useStyles();
  const pathname = usePathname();
  

  return (
    <View style={styles.footer}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.icon}
            style={styles.tab}
            onPress={() => {
              if (!isActive) {
                router.push(tab.path as any);
              }
            }}
          >
            <AnimatedTabIcon  icon={tab.icon} isActive={isActive} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const AnimatedTabIcon = ({
  icon,
  isActive,
}: {
  icon: string;
  isActive: boolean;
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: isActive ? -5 : 0,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialIcons
        name={icon}
        size={30}
        color={isActive ? "#ffffff" : "#95a1ac"}
      />
    </Animated.View>
  );
};

const useStyles = () => {
  return StyleSheet.create({
    footer: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      backgroundColor: "#181818",
    },
    tab: {
      backgroundColor: "#181818",
      borderWidth: 0,
      paddingBottom: 5,
    },
  });
};
