import React, { useState, useRef } from "react";
import {
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Metrics } from "@/constants/Metric";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from '@/hooks/useThemeColor';

export function ContactsAccordion() {
  const styles = useResponsiveStyles();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor(
    { light: '#f6f6f6', dark: '#222' },
    'background'
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
        const renderContent = (item: any) => {
          return item.key === "Faculty"
            ? item.name.map((_: any, index: any) => (
                <ThemedView unstyled key={index}>
                  <ThemedText style={styles.contentName}>{item.name[index]}</ThemedText>
                  {item.office && (
                    <ThemedText type="footer" style={styles.contentText}>{item.office[index]}</ThemedText>
                  )}
                  {item.department && (
                    <ThemedText type="footer" style={styles.contentText}>
                      {item.department[index]}
                    </ThemedText>
                  )}
                  <ThemedText
                    type="footer"
                    style={[styles.contentText, styles.link]}
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
                  </ThemedText>
                </ThemedView>
              ))
            : item.name.map((_: any, index: any) => (
                <ThemedView unstyled key={index}>
                  <ThemedText 
                    type="subText"
                    style={styles.contentName}
                  >
                    {item.name[index]}
                  </ThemedText>
                  {item.designation && (
                    <ThemedText type="footer" style={styles.contentText}>
                      {item.designation[index]}
                    </ThemedText>
                  )}
                  <ThemedView unstyled style={styles.row}>
                    {item.number && (
                      <ThemedText
                        type="footer"
                        style={[styles.contentText, styles.link]}
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
                      </ThemedText>
                    )}
                    <ThemedText type="footer" style={styles.contentText}>{" / "}</ThemedText>
                    <ThemedText
                      type="footer"
                      style={[styles.contentText, styles.link]}
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
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              ));
        };

        return (
          <ThemedView key={item.key} style={[styles.container, {backgroundColor: primaryColor}]}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => toggle(item.key)}
            >
              <ThemedView unstyled style={styles.header}>
                <ThemedView unstyled style={styles.headerText}>
                  <ThemedText
                    type="subtitle"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.key}
                  </ThemedText>
                </ThemedView>
                <Animated.View style={{transform: [{ rotate: rotation }] }}>
                  <MaterialIcons name="expand-more" style={[styles.chevron, {color: iconColor}]} />
                </Animated.View>
              </ThemedView>
            </TouchableOpacity>
            {!isOpen ? (
              <ThemedText 
                type="footer"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.description}
              >
                {item.description}
              </ThemedText>
            ) : null}
            {contentHeight[item.key] == null && (
              <ThemedView
                unstyled
                onLayout={(event) => {
                  const height = event.nativeEvent.layout.height;
                  setContentHeight((prev) => ({ ...prev, [item.key]: height }));
                }}
              >
                <ThemedView unstyled style={styles.contentInner}>
                  {renderContent(item)}
                </ThemedView>
              </ThemedView>
            )}
            <Animated.View style={[styles.contentContainer, animatedHeight]}>
              <ThemedView unstyled style={styles.contentInner}>{renderContent(item)}</ThemedView>
            </Animated.View>
          </ThemedView>
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
      borderRadius: Metrics.moderateHorizontalScale(12, 0.1),
      overflow: "visible",
      marginVertical: Metrics.moderateVerticalScale(6, 0.2),
      width: Metrics.screenWidth * 0.85,
      height: "auto",
      alignSelf: "center",
      justifyContent: "space-between",
      paddingHorizontal: Metrics.moderateHorizontalScale(16, 0.2),
      paddingVertical: Metrics.moderateVerticalScale(10, 0.2),
      borderWidth: Metrics.moderateHorizontalScale(1,0.2),
      borderColor: '#42a6c2aa',
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: Metrics.moderateVerticalScale(10, 0.2),
    },
    headerText: {
      alignSelf: "stretch",
      justifyContent: "space-between",
      flexShrink: 1,
    },
    description: {
      fontSize: Metrics.moderateHorizontalScale(14, 0.2),
      textAlign: "justify",
    },
    contentContainer: {
      overflow: "scroll",
    },
    contentInner: {
      flexDirection: "column",
      gap: Metrics.moderateVerticalScale(5, 0.2),
    },
    contentName: {
      overflow: "hidden",
      letterSpacing: Metrics.moderateHorizontalScale(1,0.2)
    },
    contentText: {
      fontSize: Metrics.moderateHorizontalScale(14, 0.2),
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    chevron: {
      fontSize: Metrics.moderateHorizontalScale(24, 0.2),
    },
    link: {
      color: "#42a6c2",
      textDecorationLine: 'underline'
    }
  });
};
