import { Button, View } from "tamagui";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { usePathname, useRouter } from "expo-router";
import { MotiView } from "moti";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    { icon: "home", path: "/homepage" },
    { icon: "fastfood", path: "/+not-found" },
    { icon: "notifications", path: "/(tabs)/explore" },
    { icon: "calendar-today", path: "/homepage" },
    { icon: "auto-awesome-mosaic", path: "/+not-found" },
  ];

  return (
    <View
      height={60}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal={20}
      backgroundColor={"#181818"}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Button
            key={tab.icon}
            circular
            bg={"#181818"}
            borderWidth={0}
            paddingBottom={5}
            pressStyle={{
              backgroundColor: "#00000000",
              borderColor: "#00000000",
            }}
            focusStyle={{
              backgroundColor: "#00000000",
              borderColor: "#00000000",
            }}
            hoverStyle={{
              backgroundColor: "#00000000",
              borderColor: "#00000000",
            }}
            onPress={() => {
              if (!isActive) {
                router.push(tab.path);
              }
            }}
          >
            <MotiView
              animate={{
                translateY: isActive ? -5 : 0,
              }}
              transition={{ type: "spring" }}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons
                name={tab.icon}
                size={30}
                color={isActive ? "#ffffff" : "#95a1ac"}
              />
            </MotiView>
          </Button>
        );
      })}
    </View>
  );
}
