import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Metrics } from "@/constants/Metric";

export function ContactsAccordion() {
  const styles = useResponsiveStyles();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const items = [
    {
      key: "Health and Emergency",
      description: "Health Center and Emergency Contacts",
      name: ["Dr Gurpreet Singh", "Dr. Harshdeep Kaur"],
      designation: ["Chief Medical Officer", "Lady Medical Officer"],
      number: ["9417360233", "9877705117"],
      email: ["gurpreet", "-"],
    },
    {
      key: "Student Representative",
      description: "SRC and other Official Student Contacts",
      name: ["Agantuk Saha", "Deep Sehgal"],
      designation: ["Convenor", "General Secretary"],
      number: ["1", "2"],
      email: ["a", "b"],
    },
    {
      key: "Academic Officials",
      description: "Contacts for Dean, Dean Acad etc...",
      name: ["A", "B", "C"],
      designation: ["a", "b", "c"],
      number: ["1", "2", "3"],
      email: ["-", "-", "-"],
    },
    {
      key: "Others",
      description: "Other Useful Contacts",
      name: ["A"],
      designation: ["B"],
      number: ["1"],
      email: ["c"],
    },
    {
      key: "Faculty",
      description: "All Faculties",
      name: ["A", "B"],
      office: ["AB2-1F2", "-"],
      department: ["M", "P"],
      email: ["q", "e"],
    },
  ];

  const [contentHeight, setContentHeight] = useState<{ [key: string]: number }>(
    {}
  );
  const animation = useRef<{ [key: string]: Animated.Value }>({});
  const toggle = (key: string) => {
    const isOpen = !!openSections[key];

    Animated.timing(animation.current[key], {
      toValue: isOpen ? 0 : 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    setOpenSections((prev) => ({
      ...prev,
      [key]: !isOpen,
    }));
  };

  items.forEach((item) => {
    if (!animation.current[item.key]) {
      animation.current[item.key] = new Animated.Value(0);
    }
  });
  return (
    <>
      {items.map((item) => {
        const isOpen = openSections[item.key] ?? false;
        const openingRotation = animation.current[item.key].interpolate({
          inputRange: [0, 0.7, 0.9, 1],
          outputRange: ["0deg", "210deg", "170deg", "180deg"],
        });
        const closingRotation = animation.current[item.key].interpolate({
          inputRange: [0, 0.1, 0.3, 1],
          outputRange: ["0deg", "-30deg", "10deg", "180deg"],
        });
        const rotation = isOpen ? openingRotation : closingRotation;
        const outputRangeMax =
          Metrics.moderateVerticalScale(30, 0.2) +
          (item.name.length / 2.5) *
            items.length *
            Metrics.moderateVerticalScale(35, 0.2);

        const animatedHeight = {
          height: animation.current[item.key].interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight[item.key] || 0],
          }),
        };
        const renderContent = (item) => {
          return item.key === "Faculty"
            ? item.name.map((_, index) => (
                <View key={index}>
                  <Text style={styles.contentName}>{item.name[index]}</Text>
                  {item.office && (
                    <Text style={styles.contentText}>{item.office[index]}</Text>
                  )}
                  {item.department && (
                    <Text style={styles.contentText}>
                      {item.department[index]}
                    </Text>
                  )}
                  <Text
                    style={styles.contentText}
                    onPress={async () => {
                      const emailURL = `mailto:${item.email[index]}@iisermohali.ac.in`;
                      const canOpen = await Linking.canOpenURL(emailURL);
                      if (canOpen) {
                        await Linking.openURL(emailURL);
                      } else {
                        Alert.alert("Error", "No email app found.");
                      }
                    }}
                  >
                    {item.email[index]}
                  </Text>
                </View>
              ))
            : item.name.map((_, index) => (
                <View key={index}>
                  <Text style={styles.contentName}>{item.name[index]}</Text>
                  {item.designation && (
                    <Text style={styles.contentText}>
                      {item.designation[index]}
                    </Text>
                  )}
                  <View style={styles.row}>
                    {item.number && (
                      <Text
                        style={styles.contentText}
                        onPress={async () => {
                          const phoneURL = `tel:${item.number[index]}`;
                          const canOpen = await Linking.canOpenURL(phoneURL);
                          if (canOpen) {
                            await Linking.openURL(phoneURL);
                          } else {
                            Alert.alert("Error", "Can't open phone dialer.");
                          }
                        }}
                      >
                        {item.number[index]}
                      </Text>
                    )}
                    <Text style={styles.contentText}>{" / "}</Text>
                    <Text
                      style={styles.contentText}
                      onPress={async () => {
                        const emailURL = `mailto:${item.email[index]}@iisermohali.ac.in`;
                        const canOpen = await Linking.canOpenURL(emailURL);
                        if (canOpen) {
                          await Linking.openURL(emailURL);
                        } else {
                          Alert.alert("Error", "No email app found.");
                        }
                      }}
                    >
                      {item.email[index]}
                    </Text>
                  </View>
                </View>
              ));
        };

        return (
          <View key={item.key} style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => toggle(item.key)}
            >
              <View style={styles.header}>
                <View style={styles.headerText}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.heading}
                  >
                    {item.key}
                  </Text>
                </View>
                <Animated.View
                  style={{
                    transform: [{ rotate: rotation }],
                    width: Metrics.moderateHorizontalScale(27, 0.2),
                    height: Metrics.moderateVerticalScale(27, 0.2),
                  }}
                >
                  <MaterialIcons name="expand-more" style={styles.chevron} />
                </Animated.View>
              </View>
            </TouchableOpacity>
            {!isOpen ? (
              <Text style={styles.description}>{item.description}</Text>
            ) : null}
            {contentHeight[item.key] == null && (
              <View
                style={{
                  position: "absolute",
                  opacity: 0,
                  zIndex: -1,
                  left: 0,
                  right: 0,
                }}
                onLayout={(event) => {
                  const height = event.nativeEvent.layout.height;
                  setContentHeight((prev) => ({ ...prev, [item.key]: height }));
                }}
              >
                <View style={styles.contentInner}>{renderContent(item)}</View>
              </View>
            )}
            <Animated.View style={[styles.contentContainer, animatedHeight]}>
              <View style={styles.contentInner}>{renderContent(item)}</View>
            </Animated.View>
          </View>
        );
      })}
    </>
  );
}

const useResponsiveStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "column",
      flex: 1,
      backgroundColor: "#0000",
      borderRadius: Metrics.moderateHorizontalScale(12, 0.1),
      overflow: "visible",
      marginVertical: Metrics.moderateVerticalScale(6, 0.2),
      width: Metrics.screenWidth * 0.85,
      height: "auto",
      alignSelf: "center",
      justifyContent: "space-between",
      paddingHorizontal: Metrics.moderateHorizontalScale(16, 0.2),
      paddingVertical: Metrics.moderateVerticalScale(4, 0.2),
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: Metrics.moderateHorizontalScale(15, 0.2),
      backgroundColor: "#00000000",
      marginBottom: Metrics.moderateVerticalScale(10, 0.2),
    },
    headerText: {
      //flexDirection: 'row',
      alignSelf: "stretch",
      justifyContent: "space-between",
      flexShrink: 1,
    },
    heading: {
      color: "white",
      fontWeight: "400",
      fontSize: Metrics.moderateHorizontalScale(25, 0.1),
      fontFamily: "WorkSans",
      letterSpacing: Metrics.moderateHorizontalScale(1, 0.2),
    },
    description: {
      color: "#95a1ac",
      fontWeight: 400,
      fontFamily: "WorkSans",
      fontSize: Metrics.moderateHorizontalScale(14, 0.1),
      letterSpacing: 0,
      textAlign: "justify",
    },
    contentContainer: {
      overflow: "scroll",
      backgroundColor: "#00000000",
      marginTop: 0,
    },
    contentInner: {
      flexDirection: "column",
      gap: Metrics.moderateVerticalScale(15, 0.2),
    },
    contentName: {
      color: "#fff",
      fontSize: Metrics.moderateHorizontalScale(18, 0.1),
      fontWeight: "400",
      fontFamily: "WorkSans",
      overflow: "hidden",
    },
    contentText: {
      color: "#95a1ac",
      fontSize: Metrics.moderateHorizontalScale(14, 0.1),
      fontWeight: "400",
      fontFamily: "WorkSans",
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    chevron: {
      color: "#fff",
      fontSize: Metrics.moderateHorizontalScale(25, 0.1),
    },
  });
};
