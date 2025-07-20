import { SafeAreaView } from "react-native-safe-area-context";
import { ContactsAccordion } from "@/components/ui/ContactsAccordion";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const useStyles = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: "#181818",
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      flex: 1,
      width: "100%",
      height: 87,
      backgroundColor: "#384c7e00",
    },
    headerText: {
      paddingStart: 30,
      paddingTop: 20,
      fontSize: 30,
      fontWeight: 400,
      fontFamily: "WorkSans",
      letterSpacing: 0,
      color: "#ffffff",
    },
    contentArea: {
      flexDirection: "column",
      backgroundColor: "#384c7e00",
      paddingBottom: 40,
      width: "100%",
      height: "70%",
      borderRadius: 0,
    },
    footer: {
      flexDirection: "row",
      flex: 1,
      width: "100%",
      height: 38.5,
      backgroundColor: "#384c7e00",
    },
  });
};
export default function Contacts() {
  const styles = useStyles();

  return (
    <SafeAreaView
      style={styles.background}
      edges={["top", "right", "left", "bottom"]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Contacts</Text>
      </View>
      <ScrollView style={styles.contentArea}>
        <ContactsAccordion />
        <View style={styles.footer} />
      </ScrollView>
      <View style={styles.footer} />
    </SafeAreaView>
  );
}
