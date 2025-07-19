import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Metrics } from "@/constants/Metric";

export default function Market() {
  const router = useRouter();
  const styles = useStyles();
  
  return (
    <SafeAreaView>
      <View flexDirection="column">
        {/*Header Section*/}
        <View flexDirection="row" style={styles.header}>
          <Button
            style={styles.backButton}
            icon={
              <MaterialIcons
                name="arrow-back-ios"
                style={styles.backButtonIcon}
              />
            }
          />
          <Text style={styles.title}>Market</Text>
        </View>

        {/*User Section*/}
        <View flexDirection="row" style={styles.userSection}>
          <Button
            style={styles.cataloguesButton}
            icon={
              <MaterialIcons
                name="library-books"
                style={styles.userButtonIcon}
              />
            }
          >
            Your Catalogues
          </Button>
          <View flexDirection="column">
            <Button
              style={styles.savedItemsButton}
              icon={
                <MaterialIcons
                  name="format-list-bulleted"
                  style={styles.userButtonIcon}
                />
              }
            >
              Items Saved
            </Button>
            <View flexDirection="row" style={styles.userSection}>
              <Button
                style={styles.addInfoButton}
                icon={
                  <MaterialIcons name="phone" style={styles.userButtonIcon} />
                }
              >
                Contacts
              </Button>
              <Button
                style={styles.addInfoButton}
                icon={
                  <MaterialIcons
                    name="playlist-add"
                    style={styles.userButtonIcon}
                  />
                }
              >
                Add Items
              </Button>
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
};

const useStyles = () => {
  return StyleSheet.create({
    header: {},
    backButton: {},
    backButtonIcon: {},
    title: {},
    userSection: {},
    cataloguesButton: {},
    savedItemsButton: {},
    addInfoButton: {},
    userButtonIcon: {},
    publicSection: {},
  })
}