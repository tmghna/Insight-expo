import { SafeAreaView } from "react-native-safe-area-context";
import { ContactsAccordion } from "@/components/ui/ContactsAccordion";
import { ScrollView, StyleSheet, TouchableOpacity, } from "react-native";
import { Metrics } from "@/constants/Metric";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from '@/hooks/useThemeColor';
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const useStyles = () => {
  return StyleSheet.create({
    contentArea: {
      flexDirection: "column",
      width: "100%",
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
    headerText: {
      fontSize: Metrics.moderateHorizontalScale(20,.2),
      letterSpacing: Metrics.moderateHorizontalScale(1,.2),
    },
  });
};

export default function Contacts() {
  const router = useRouter();

  const styles = useStyles();
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={["top"]}>
      <ScrollView style={styles.contentArea}>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" style={[styles.backButtonIcon, {color: iconColor}]} />
          </TouchableOpacity>
          <ThemedText style={styles.headerText}>Contacts</ThemedText>
        </ThemedView>
        <ContactsAccordion />
      </ScrollView>
    </SafeAreaView>
  );
}
