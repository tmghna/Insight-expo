import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {Text} from 'tamagui';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {CampusFacilities, HelpfulTiles} from '@/components/ui/AppearancePreferenceAccordion';
import { Metrics } from '@/constants/Metric';

const Settings = () => {
  // const [campusOpen, setCampusOpen] = useState(false);
  // const [tilesOpen, setTilesOpen] = useState(false);
  const router = useRouter();
  const styles = useResponsiveStyles();

  return (
    // This safeview bgcolor is an issue for light-theme. Tamaghna
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }} edges={["top"]}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" style={styles.backButtonIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" style={styles.avatarIcon} />
            </View>
          </View>
          <View style={styles.profileText}>
            <Text 
              numberOfLines={1}
              ellipsizeMode='tail'
              style={styles.name}
            >
              User Name
            </Text>
            <Text 
              numberOfLines={1}
              ellipsizeMode='tail'
              style={styles.email}>xxxxxx@iisermohali.ac.in</Text>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.logoutIcon} onPress={() => {}}>
              <MaterialIcons name="logout" style={styles.logoutIconIcon} />
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />

        {/* Permissions */}
        <View style={styles.headingContainer}>
          <View style={styles.bullet} />
          <Text style={styles.sectionHeader}>Permissions</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.subText}>Give Notification Access &gt;</Text>
        </TouchableOpacity>

        {/* Preferences */}
        <View style={styles.headingContainer}>
          <View style={styles.bullet} />
          <Text style={styles.sectionHeader}>Preferences</Text>
        </View>
        <Text style={styles.subText}>Homepage Appearances</Text>
        <CampusFacilities/>
        <HelpfulTiles/>

        <View style={styles.divider} />
        {/* Footer Section */}
        <View>
          <Text style={styles.footerText}>Dev Blog</Text>
          <TouchableOpacity style={styles.githubLink} onPress={() => Linking.openURL('https://github.com/IISERM/Insight-expo')}>
            <AntDesign name="github" style={styles.githubIcon} />
            <Text style={styles.linkText}>Github</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Updates</Text>
          <Text style={styles.regularText}>Version 4.0.0</Text>

          <Text style={[styles.regularText, { marginTop: Metrics.moderateHorizontalScale(16,.2) }]}>
            An Initiative by The Turing Club
          </Text>
          <Text style={styles.regularText}>Convener: Gokul P B</Text>
          <Text style={styles.regularText}>
            Co-Convener:{'\n'} Harshita{'\n'} Aniket
          </Text>
          <Text style={styles.regularText}>&lt;/&gt; Developer Team:</Text>
          <Text style={styles.regularText}>
            {'\n'}{'\n'}{'\n'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Settings;

const useResponsiveStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111',
      paddingHorizontal: Metrics.moderateHorizontalScale(15,.2),
      paddingTop: Metrics.moderateVerticalScale(20,.2),
    },
    header: {
      paddingBottom: Metrics.moderateVerticalScale(20,.2),
      paddingLeft: Metrics.moderateHorizontalScale(6,.2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonIcon: {
      fontSize: Metrics.moderateHorizontalScale(20,.2),
      color: '#FFF',
    },
    backButton: {
      marginRight: Metrics.moderateHorizontalScale(20,.2),
    },
    title: {
      fontSize: Metrics.moderateHorizontalScale(18,.2),
      fontWeight: '400',
      color: 'white',
      fontFamily: 'Nunito'
    },
    profileSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: Metrics.moderateHorizontalScale(8,.2),
      alignItems: 'center',
    },
    avatarSection: {
      flex: 0,
      justifyContent: 'center',
    },
    avatar: {
      width: Metrics.moderateHorizontalScale(48,.2),
      height: Metrics.moderateHorizontalScale(48,.2),
      borderRadius: '50%',
      backgroundColor: '#8345cf',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarIcon: {
      fontSize: Metrics.moderateHorizontalScale(28,.1),
      color: '#FFF',
    },
    profileText: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    name: {
      color: '#FFFFFF',
      fontSize: Metrics.moderateHorizontalScale(18,.2),
      fontWeight: '500',
      fontFamily: "WorkSans",
    },
    email: {
      color: '#AAA',
      fontSize: Metrics.moderateHorizontalScale(14,.2),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    buttonSection: {
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0,
    },
    logoutIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#222',
      paddingVertical: Metrics.moderateVerticalScale(6,.2),
      paddingHorizontal: Metrics.moderateHorizontalScale(12,.2),
      borderRadius: Metrics.moderateHorizontalScale(8,.1),
    },
    logoutIconIcon: {
      marginRight: Metrics.moderateHorizontalScale(6,.2),
      color:'#FFF',
      fontSize: Metrics.moderateHorizontalScale(16,.2),
    },
    logoutText: {
      color: '#DDD',
      fontWeight: '400',
      fontSize: Metrics.moderateHorizontalScale(14,.2),
      fontFamily: 'Nunito',
    },
    headingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Metrics.moderateVerticalScale(20,.2),
      marginBottom: Metrics.moderateVerticalScale(8,.2),
    },
    bullet: {
      width: Metrics.moderateHorizontalScale(6,.1),
      height: Metrics.moderateVerticalScale(20,.1),
      borderRadius: Metrics.moderateHorizontalScale(2,.1),
      backgroundColor: '#8345cf',
      marginRight: Metrics.moderateHorizontalScale(10,.2),
    },
    sectionHeader: {
      color: '#FFF',
      fontSize: Metrics.moderateHorizontalScale(20,.2),
      fontWeight: '400',
      fontFamily:"WorkSans",
    },
    subText: {
      color: '#999',
      fontSize: Metrics.moderateHorizontalScale(14,.2),
      lineHeight: Metrics.moderateHorizontalScale(18,.1),
      fontWeight: '400',
      fontFamily: 'Nunito',
      paddingLeft: Metrics.moderateHorizontalScale(16,.2), 
    },
    githubLink: {
      alignSelf: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#222',
      marginTop: Metrics.moderateVerticalScale(5,.2),
      paddingVertical: Metrics.moderateVerticalScale(5,.2),
      paddingHorizontal: Metrics.moderateHorizontalScale(8,.2),
      borderRadius: Metrics.moderateHorizontalScale(8,.1),
    },
    githubIcon: {
      marginRight: Metrics.moderateHorizontalScale(6,.2),
      opacity: 0.8,
      fontSize: Metrics.moderateHorizontalScale(16,.1),
      color: '#FFF',
    },
    linkText: {
      color: '#CCC',
      fontSize: Metrics.moderateHorizontalScale(12,.2),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    footerText: {
      color: '#DDD',
      fontSize: Metrics.moderateHorizontalScale(18,.2),
      fontWeight: '400',
      fontFamily: 'WorkSans',
      marginTop: Metrics.moderateVerticalScale(10,.2)
    },
    regularText: {
      color: '#999',
      fontSize: Metrics.moderateHorizontalScale(12,.2),
      lineHeight: Metrics.moderateVerticalScale(18,.1),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    divider: {
      height: Metrics.moderateVerticalScale(1,.2),
      backgroundColor: '#A678F1',
      marginVertical: Metrics.moderateVerticalScale(10,.2),
      opacity: 0.2,
      marginHorizontal: Metrics.moderateHorizontalScale(-15,.2)
    },
  });
};