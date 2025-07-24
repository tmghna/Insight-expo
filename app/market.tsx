import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PublicMarketSection } from "@/components/PublicMarketView";

export default function Market() {
  const router = useRouter();
  const styles = useStyles();

  return (
    <ImageBackground
      source={require("../assets/images/MARKETBGGGG.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView edges={["top"]} style={styles.background}>
        <View style={styles.background}>
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
              <MaterialIcons
                name="library-books"
                style={styles.userButtonIcon}
              />
              <Text style={styles.userButtonText}>Your Catalogues</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "column", gap: 5 }}>
              <TouchableOpacity style={styles.savedItemsButton}>
                <MaterialIcons
                  name="format-list-bulleted"
                  style={styles.userButtonIcon}
                />
                <Text style={styles.userButtonText}>Items Saved</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", gap: 5 }}>
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
    </ImageBackground>
  );
}

const useStyles = () => {
  return StyleSheet.create({
    background: {
      flexDirection: "column",
      flex: 1,
      color: "#1f1f1f",
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingBottom: 10,
      flex: 1,
      height: "auto",
      alignItems: "center",
      justifyContent: "flex-start",
      marginVertical: 0,
    },
    backButton: {
      color: "#00000000",
      paddingVertical: 5,
      paddingBottom: 7,
      width: 25,
      height: "auto",
    },
    backButtonIcon: {
      color: "#f9f9f9ff",
      fontSize: 22,
    },
    title: {
      paddingStart: 20,
      fontFamily: "Lato",
      fontSize: 25,
      fontWeight: 400,
      letterSpacing: 0,
      color: "#f9f9f9ff",
    },
    userSection: {
      flexDirection: "row",
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 20,
      marginBottom: 70,
      gap: 5,
    },
    cataloguesButton: {
      width: "35%",
      height: 80,
      backgroundColor: "#1f1f1fb6",
      borderRadius: 20,
      flexDirection: "column",
      padding: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    savedItemsButton: {
      width: "75%",
      height: 35,
      backgroundColor: "#1f1f1fb6",
      borderRadius: 20,
      flexDirection: "row",
      padding: 4,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    addInfoButton: {
      width: "37.5%",
      height: 40,
      backgroundColor: "#1f1f1fb6",
      borderRadius: 20,
      flexDirection: "row",
      padding: 5,
      justifyContent: "center",
      alignItems: "center",
      gap:2,
    },
    userButtonIcon: {
      color: "#95a1ac",
      fontSize: 24,
    },
    userButtonText: {
      paddingVertical: 5,
      textAlign: "center",
      fontFamily: "WorkSans",
      fontSize: 13,
      fontWeight: 400,
      letterSpacing: 0,
      overflow: 'hidden',
      color:"#fff",
      alignSelf: 'center',
    },
    publicSection: {
      width: "100%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height: "65%",
      backgroundColor: '#1f1f1f60',
    },
  });
};
