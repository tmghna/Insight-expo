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
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" style={styles.avatarIcon} />
            </View>
            <View style={styles.profileText}>
              <Text style={styles.name}>User Name</Text>
              <Text style={styles.email}>xxxxxx@iisermohali.ac.in</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutIcon} onPress={() => {}}>
            <MaterialIcons name="logout" style={styles.logoutIconIcon} />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
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
        <View style={styles.footer}>
          <Text style={styles.footerText}>Dev Blog</Text>
          <TouchableOpacity style={styles.githubLink} onPress={() => Linking.openURL('https://github.com/IISERM/Insight-expo')}>
            <AntDesign name="github" style={styles.githubIcon} />
            <Text style={styles.linkText}>Github</Text>
          </TouchableOpacity>

          <Text style={[styles.footerText, { marginTop: Metrics.moderateScale(10,.2) }]}>Updates</Text>
          <Text style={styles.regularText}>Version 4.0.0</Text>

          <Text style={[styles.regularText, { marginTop: Metrics.moderateScale(16,.2) }]}>
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
  const fontSize = Metrics.moderateScale(12);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111',
      paddingHorizontal: Metrics.moderateScale(15,.2),
      paddingTop: Metrics.moderateScale(20,.2),
    },
    header: {
      paddingBottom: Metrics.moderateScale(20,.2),
      paddingLeft: Metrics.moderateScale(6,.2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonIcon: {
      fontSize: Metrics.moderateScale(20,.2),
      color: '#FFF',
    },
    backButton: {
      marginRight: Metrics.moderateScale(20,.2),
    },
    title: {
      fontSize: Metrics.moderateScale(18,.2),
      fontWeight: '400',
      color: 'white',
      fontFamily: 'Nunito'
    },
    // This needs to be dynamic using flexboxes. Tamaghna
    profileSection: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingRight: Metrics.moderateScale(100,.2)
    },
    avatar: {
      width: Metrics.moderateScale(48,.2),
      height: Metrics.moderateScale(48,.2),
      borderRadius: '50%',
      backgroundColor: '#8345cf',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
    },
    avatarIcon: {
      fontSize: Metrics.moderateScale(28,.1),
      color: '#FFF',
    },
    profileText: {
      marginLeft: Metrics.moderateScale(12,.2),
      flexShrink: 1,
    },
    logoutIcon: {
      position: 'absolute',
      top: 2,
      right: 2,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#222',
      paddingVertical: Metrics.moderateScale(6,.2),
      paddingHorizontal: Metrics.moderateScale(12,.2),
      borderRadius: Metrics.moderateScale(8,.1),
      flexShrink: 0,
    },
    logoutIconIcon: {
      marginRight: Metrics.moderateScale(6,.2),
      color:'#FFF',
      fontSize: Metrics.moderateScale(16,.2),
    },
    logoutText: {
      color: '#DDD',
      fontWeight: '400',
      fontSize: Metrics.moderateScale(14,.2),
      fontFamily: 'Nunito',
    },
    name: {
      color: '#FFFFFF',
      fontSize: Metrics.moderateScale(18,.2),
      fontWeight: '500',
      fontFamily: "WorkSans",
    },
    email: {
      color: '#AAA',
      fontSize: Metrics.moderateScale(14,.2),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    headingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Metrics.moderateScale(20,.2),
      marginBottom: Metrics.moderateScale(8,.2),
    },
    bullet: {
      width: Metrics.moderateScale(6,.1),
      height: Metrics.moderateScale(20,.1),
      borderRadius: Metrics.moderateScale(2,.1),
      backgroundColor: '#8345cf',
      marginRight: Metrics.moderateScale(10,.2),
    },
    sectionHeader: {
      color: '#FFF',
      fontSize: Metrics.moderateScale(20,.2),
      fontWeight: '400',
      fontFamily:"WorkSans",
    },
    subText: {
      color: '#999',
      fontSize: Metrics.moderateScale(14,.2),
      lineHeight: Metrics.moderateScale(18,.1),
      fontWeight: '400',
      fontFamily: 'Nunito',
      paddingLeft: Metrics.moderateScale(16,.2), 
    },
    githubLink: {
      alignSelf: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#222',
      marginTop: Metrics.moderateScale(5,.2),
      paddingVertical: Metrics.moderateScale(5,.2),
      paddingHorizontal: Metrics.moderateScale(8,.2),
      borderRadius: Metrics.moderateScale(8,.1),
    },
    githubIcon: {
      marginRight: Metrics.moderateScale(6,.2),
      opacity: 0.8,
      fontSize: Metrics.moderateScale(16,.1),
      color: '#FFF',
    },
    linkText: {
      color: '#CCC',
      fontSize: Metrics.moderateScale(12,.2),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    footer: {
      marginTop: Metrics.moderateScale(20,.2),
    },
    footerText: {
      color: '#DDD',
      fontSize: Metrics.moderateScale(18,.2),
      fontWeight: '400',
      fontFamily: 'WorkSans',
    },
    regularText: {
      color: '#999',
      fontSize: Metrics.moderateScale(12,.2),
      lineHeight: Metrics.moderateScale(18,.1),
      fontWeight: '400',
      fontFamily: 'Nunito',
    },
    divider: {
      height: Metrics.moderateScale(1,.2),
      backgroundColor: '#A678F1',
      marginVertical: Metrics.moderateScale(10,.2),
      opacity: 0.2,
      marginHorizontal: Metrics.moderateScale(-15,.2)
    },
  });
};