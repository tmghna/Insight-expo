import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PublicMarketSection } from "@/components/PublicMarketView";

export default function Market() {
  const router = useRouter();
  const styles = useStyles();

  return (
    <SafeAreaView>
      <View>
        {/*Header Section*/}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <MaterialIcons
              name="arrow-back-ios"
              style={styles.backButtonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Market</Text>
        </View>

        {/*User Section*/}
        <View style={styles.userSection}>
          <TouchableOpacity style={styles.cataloguesButton}>
            <MaterialIcons name="library-books" style={styles.userButtonIcon} />
            <Text style={styles.userButtonText}>Your Catalogues</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity style={styles.savedItemsButton}>
              <MaterialIcons
                name="format-list-bulleted"
                style={styles.userButtonIcon}
              />
              <Text style={styles.userButtonText}>Items Saved</Text>
            </TouchableOpacity>
            <View style={styles.userSection}>
              <TouchableOpacity style={styles.addInfoButton}>
                <MaterialIcons name="phone" style={styles.userButtonIcon} />
                <Text style={styles.userButtonText}>Contacts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addInfoButton}>
                <MaterialIcons
                  name="playlist-add"
                  style={styles.userButtonIcon}
                />
                <Text style={styles.userButtonText}>Add Items</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*Public Market Section*/}
        <View style={styles.publicSection}>
          <PublicMarketSection />
        </View>
      </View>
    </SafeAreaView>
  );
}

const useStyles = () => {
  return StyleSheet.create({
    background: {
      flexDirection: "column",
    },
    header: {
      flexDirection: "row",
    },
    backButton: {},
    backButtonIcon: {},
    title: {},
    userSection: {
      flexDirection: "row",
    },
    cataloguesButton: {},
    savedItemsButton: {},
    addInfoButton: {},
    userButtonIcon: {},
    userButtonText: {},
    publicSection: {},
  });
};
