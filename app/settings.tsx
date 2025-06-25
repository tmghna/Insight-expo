import React, { useState } from 'react';
import {
  Platform,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { YStack } from 'tamagui';
import {CampusFacilities, HelpfulTiles} from '@/components/ui/AppearancePreferenceAccordion';

const Settings = () => {
  const [campusOpen, setCampusOpen] = useState(false);
  const [tilesOpen, setTilesOpen] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={28} color="#FFF" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name}>USER ID</Text>
            <Text style={styles.email}>xxxxxxx@iisermohali.ac.in</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutIcon} onPress={() => {}}>
          <MaterialIcons name="logout" size={16} color="#FFF" style={styles.logoutIconIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {/* Permissions */}
      <Text style={styles.sectionHeader}>Permissions</Text>
      <TouchableOpacity>
        <Text style={styles.linkText}>Give Notification Access &gt;</Text>
      </TouchableOpacity>

      {/* Preferences */}
      <Text style={styles.sectionHeader}>Preferences</Text>

      {/* Collapsible Section 1 */}
      <TouchableOpacity
        style={styles.collapseHeader}
        onPress={() => setCampusOpen(!campusOpen)}
      >
        <Text style={styles.collapseText}>Campus Facilities</Text>
        <AntDesign name={campusOpen ? 'up' : 'down'} size={16} color="#AAA" />
      </TouchableOpacity>
      {campusOpen && (
        <View style={styles.collapseContent}>
          <Text style={styles.collapseItem}>• Hostels</Text>
          <Text style={styles.collapseItem}>• Library</Text>
          <Text style={styles.collapseItem}>• Sports Complex</Text>
        </View>
      )}

      {/* Collapsible Section 2 */}
      <TouchableOpacity
        style={styles.collapseHeader}
        onPress={() => setTilesOpen(!tilesOpen)}
      >
        <Text style={styles.collapseText}>Helpful Tiles</Text>
        <AntDesign name={tilesOpen ? 'up' : 'down'} size={16} color="#AAA" />
      </TouchableOpacity>
      {tilesOpen && (
        <View style={styles.collapseContent}>
          <Text style={styles.collapseItem}>• Bus Schedule</Text>
          <Text style={styles.collapseItem}>• Mess Menu</Text>
        </View>
      )}
      <CampusFacilities/>
      <HelpfulTiles/>

      <View style={styles.divider} />
      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Dev Blog</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://iiserm.github.io/insights/')}>
          <Text style={styles.linkText}>https://iiserm.github.io/Insights/</Text>
        </TouchableOpacity>

        <Text style={[styles.footerText, { marginTop: 10 }]}>Updates</Text>
        <Text style={styles.regularText}>Version 3.0.0</Text>

        <Text style={[styles.regularText, { marginTop: 16 }]}>
          An Initiative by The Turing Club
        </Text>
        <Text style={styles.regularText}>Convener: Gokul P B</Text>
        <Text style={styles.regularText}>
          Co-Convener:{'\n'}
        </Text>
        <Text style={styles.regularText}>Developer Team:</Text>
        <Text style={styles.regularText}>
          {'\n'}{'\n'}{'\n'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8345cf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    marginLeft: 12,
  },
  logoutIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  logoutIconIcon: {
    marginRight: 6,
  },
  logoutText: {
    color: '#DDD',
    fontWeight: '400',
    fontSize: 15,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    color: '#AAA',
    fontSize: 14,
  },
  sectionHeader: {
    color: '#A678F1',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 8,
  },
  linkText: {
    color: '#BBB',
    fontSize: 14,
    marginBottom: 12,
  },
  collapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderRadius: 16,
    marginTop: 10,
  },
  collapseText: {
    color: '#FFF',
    fontSize: 15,
  },
  collapseContent: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    marginTop: 2,
    borderRadius: 6,
  },
  collapseItem: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 6,
  },
  footer: {
    marginTop: 30,
  },
  footerText: {
    color: '#A678F1',
    fontSize: 15,
    fontWeight: '500',
  },
  regularText: {
    color: '#999',
    fontSize: 13,
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#A678F1', // Violet shade
    marginVertical: 12,
    opacity: 0.4,
  },
});