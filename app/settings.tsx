import React from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { CampusFacilities, HelpfulTiles } from '@/components/ui/AppearancePreferenceAccordion';
import { Metrics } from '@/constants/Metric';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedButton } from '@/components/ThemedButton';
import { useThemeColor } from '@/hooks/useThemeColor';

const Settings = () => {
  // const [campusOpen, setCampusOpen] = useState(false);
  // const [tilesOpen, setTilesOpen] = useState(false);
  const router = useRouter();
  const styles = useResponsiveStyles();
  const isWide = Metrics.screenWidth >= 600;
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={["top"]}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" style={[styles.backButtonIcon, {color: iconColor}]} />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Settings</ThemedText>
        </ThemedView>

        {/* Profile Section */}
        <ThemedView style={styles.profileSection}>
          <ThemedView style={styles.avatarSection}>
            <ThemedView style={styles.avatar}>
              <MaterialIcons name="person" style={styles.avatarIcon} />
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.profileText}>
            <ThemedText 
              type="subtitle"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              User Name
            </ThemedText>
            <ThemedText 
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              xxxxxx@iisermohali.ac.in
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.buttonSection}>
            <ThemedButton style={styles.logoutIcon} onPress={() => {}}>
              <MaterialIcons name="logout" style={[styles.logoutIconIcon, {color: iconColor}]} />
              <ThemedText>Log out</ThemedText>
            </ThemedButton>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.divider} />

        {/* Permissions */}
        <ThemedView style={styles.headingContainer}>
          <ThemedView style={styles.bullet} />
          <ThemedText type="subtitle">Permissions</ThemedText>
        </ThemedView>
        <TouchableOpacity>
          <ThemedText style={styles.subText}>Give Notification Access &gt;</ThemedText>
        </TouchableOpacity>

        {/* Preferences */}
        <ThemedView style={styles.headingContainer}>
          <ThemedView style={styles.bullet} />
          <ThemedText type="subtitle">Preferences</ThemedText>
        </ThemedView>
        <ThemedText style={styles.subText}>Homepage Appearances</ThemedText>
        {isWide ? (
          <ThemedView style={styles.wideAppearance}>
            <CampusFacilities />
            <HelpfulTiles />
          </ThemedView>
        ) : (
          <ThemedView style={{ flexDirection: "column" }}>
            <CampusFacilities />
            <HelpfulTiles />
          </ThemedView>
        )}

        <ThemedView style={styles.divider} />
        {/* Footer Section */}
        <ThemedView>
          <ThemedText type="subText" style={{marginTop: Metrics.moderateVerticalScale(10,.2)}}>Dev Blog</ThemedText>
          <ThemedButton style={styles.githubLink} onPress={() => Linking.openURL('https://github.com/IISERM/Insight-expo')}>
            <AntDesign name="github" style={[styles.githubIcon, {color: iconColor}]} />
            <ThemedText type="footer" style={{opacity: 1}}>Github</ThemedText>
          </ThemedButton>

          <ThemedText type="subText" style={{marginTop: Metrics.moderateVerticalScale(10,.2)}}>Updates</ThemedText>
          <ThemedText type="footer">Version 4.0.0</ThemedText>
          
          <ThemedText type="footer" style={{marginTop: Metrics.moderateVerticalScale(16,0.2)}}> 
            An Initiative by The Turing Club
          </ThemedText>
          <ThemedText type="footer">Convener: Gokul P B</ThemedText>
          <ThemedText type="footer">
            Co-Convener:{'\n'} Harshita{'\n'} Aniket
          </ThemedText>
          <ThemedText type="footer">&lt;/&gt; Developer Team:</ThemedText>
          <ThemedText type="footer">
            {'\n'}{'\n'}{'\n'}
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const useResponsiveStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Metrics.moderateHorizontalScale(15,.2),
      paddingTop: Metrics.moderateVerticalScale(20,.2),
    },
    header: {
      paddingBottom: Metrics.moderateVerticalScale(20, 0.2),
      paddingLeft: Metrics.moderateHorizontalScale(6, 0.2),
      flexDirection: "row",
      alignItems: "center",
    },
    backButtonIcon: {
      fontSize: Metrics.moderateHorizontalScale(20,.2),
    },
    backButton: {
      marginRight: Metrics.moderateHorizontalScale(20, 0.2),
    },
    title: {
      fontSize: Metrics.moderateHorizontalScale(18,.2),
    },
    profileSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: Metrics.moderateHorizontalScale(8, 0.2),
      alignItems: "center",
    },
    avatarSection: {
      flex: 0,
      justifyContent: "center",
    },
    avatar: {
      width: Metrics.moderateHorizontalScale(48, 0.2),
      height: Metrics.moderateHorizontalScale(48, 0.2),
      borderRadius: "50%",
      backgroundColor: "#8345cf",
      justifyContent: "center",
      alignItems: "center",
    },
    avatarIcon: {
      fontSize: Metrics.moderateHorizontalScale(28, 0.1),
      color: "#FFF",
    },
    profileText: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    buttonSection: {
      height: "100%",
      justifyContent: "flex-start",
      alignItems: "center",
      flex: 0,
    },
    logoutIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: Metrics.moderateVerticalScale(6,.2),
      paddingHorizontal: Metrics.moderateHorizontalScale(10,.2),
      borderRadius: Metrics.moderateHorizontalScale(8,.1),
    },
    logoutIconIcon: {
      marginRight: Metrics.moderateHorizontalScale(6,.2),
      fontSize: Metrics.moderateHorizontalScale(16,.2),
    },
    headingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: Metrics.moderateVerticalScale(10, 0.2),
      marginBottom: Metrics.moderateVerticalScale(8, 0.2),
    },
    bullet: {
      width: Metrics.moderateHorizontalScale(6, 0.1),
      height: Metrics.moderateVerticalScale(20, 0.1),
      borderRadius: Metrics.moderateHorizontalScale(2, 0.1),
      backgroundColor: "#8345cf",
      marginRight: Metrics.moderateHorizontalScale(10, 0.2),
    },
    subText: {
      paddingLeft: Metrics.moderateHorizontalScale(16,.2), 
      marginBottom: Metrics.moderateHorizontalScale(5,.2)
    },
    wideAppearance: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: Metrics.moderateHorizontalScale(10, 0.2),
    },
    githubLink: {
      alignSelf: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: Metrics.moderateVerticalScale(5,.2),
      paddingVertical: Metrics.moderateVerticalScale(5,.2),
      paddingHorizontal: Metrics.moderateHorizontalScale(8,.2),
      borderRadius: Metrics.moderateHorizontalScale(8,.1),
    },
    githubIcon: {
      marginRight: Metrics.moderateHorizontalScale(6,.2),
      fontSize: Metrics.moderateHorizontalScale(16,.1),
    },
    divider: {
      height: Metrics.moderateVerticalScale(1, 0.2),
      backgroundColor: "#A678F1",
      marginVertical: Metrics.moderateVerticalScale(10, 0.2),
      opacity: 0.2,
      marginHorizontal: Metrics.moderateHorizontalScale(-15, 0.2),
    },
  });
};