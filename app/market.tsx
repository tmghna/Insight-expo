import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from 'react-native';
import { 
  Text,
  XStack,
  YStack,
  Button,
} from "tamagui";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  CampusFacilities,
  HelpfulTiles,
} from "@/components/ui/AppearancePreferenceAccordion";
import { Metrics } from "@/constants/Metric";

export default function Market() {
  const router = useRouter();
  const styles = useStyles();

  return (
    <SafeAreaView>
      <YStack>
        {/*Header Section*/}
        <XStack style={styles.header}>
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
        </XStack>

        {/*User Section*/}
        <XStack style={styles.userSection}>
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
          <YStack>
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
            <XStack style={styles.userSection}>
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
            </XStack>
          </YStack>
        </XStack>

        {/*Public Market Section*/}
        <View style={styles.publicSection}>
          <PublicMarketSection />
        </View>
      </YStack>
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