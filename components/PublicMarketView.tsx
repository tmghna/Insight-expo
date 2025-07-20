import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function PublicMarketSection() {
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.startMark} />

      {/*Categories*/}
      <View style={styles.categoriesSection}>
        <TouchableOpacity style={styles.categories}>
          <Image style={styles.appliancesImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categories}>
          <Image style={styles.booksImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categories}>
          <Image style={styles.furnitureImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.categories}>
          <Image style={styles.utilityImage} />
        </TouchableOpacity>
      </View>

      {/*Peoples Catalogues*/}
      <View style={styles.divider} />
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Peoples Catalogues</Text>
          <Text style={styles.more}>See all</Text>
        </View>
      </View>

      {/*Recent Items*/}
      <View style={styles.divider} />
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Recent Items</Text>
          <Text style={styles.more}>See all</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const useStyles = () => {
  return StyleSheet.create({
    container: {},
    startMark: {
      flexDirection: "row",
    },
    categoriesSection: {
      flexDirection: "row",
    },
    categories: {},
    appliancesImage: {},
    booksImage: {},
    furnitureImage: {},
    utilityImage: {},
    divider: {
      flexDirection: "row",
    },
    section: {
      flexDirection: "column",
    },
    sectionHeader: {
      flexDirection: "row",
    },
    sectionHeading: {},
    more: {},
  });
};
