import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  // Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {Text} from 'tamagui';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import {CampusFacilities, HelpfulTiles} from '@/components/ui/AppearancePreferenceAccordion';
import { Tamagui } from '@tamagui/core';

const Settings = () => {
  // const [campusOpen, setCampusOpen] = useState(false);
  // const [tilesOpen, setTilesOpen] = useState(false);
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={28} color="#FFF" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>User Name</Text>
            <Text style={styles.email}>xxxxxxx@iisermohali.ac.in</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutIcon} onPress={() => {}}>
          <MaterialIcons name="logout" size={16} color="#FFF" style={styles.logoutIconIcon} />
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
          <AntDesign name="github" size={16} color="#FFF" style={styles.githubIcon} />
          <Text style={styles.linkText}>Github</Text>
        </TouchableOpacity>

        <Text style={[styles.footerText, { marginTop: 10 }]}>Updates</Text>
        <Text style={styles.regularText}>Version 4.0.0</Text>

        <Text style={[styles.regularText, { marginTop: 16 }]}>
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
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingHorizontal: 4,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
    fontFamily: 'Nunito'
  },
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 20,
  },
  profileSection: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 8,
    paddingRight: 100,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    flexGrow: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8345cf',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  profileText: {
    marginLeft: 12,
    flexShrink: 1,
  },
  logoutIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexShrink: 0,
  },
  logoutIconIcon: {
    marginRight: 6,
  },
  logoutText: {
    color: '#DDD',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Nunito',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "WorkSans",
  },
  email: {
    color: '#AAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nunito',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#8345cf',
    marginRight: 10,
  },
  sectionHeader: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 400,
    fontFamily:"WorkSans",
  },
  subText: {
    color: '#999',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: 'Nunito',
    paddingLeft: 15, 
  },
  githubLink: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#222',
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  githubIcon: {
    marginRight: 6,
    opacity: 0.8,
  },
  linkText: {
    color: '#CCC',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Nunito',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: '#DDD',
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'WorkSans',
  },
  regularText: {
    color: '#999',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: 'Nunito',
  },
  divider: {
    height: 1,
    backgroundColor: '#A678F1',
    marginVertical: 10,
    opacity: 0.2,
    marginHorizontal: -20
  },
});