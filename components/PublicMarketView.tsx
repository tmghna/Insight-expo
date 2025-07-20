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
          <Image
            source={require("../assets/images/home-appliance.png")}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryName}>Appliances</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categories}>
          <Image
            source={require("../assets/images/open-book.png")}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryName}>Books</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categories}>
          <Image
            source={require("../assets/images/furniture.png")}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryName}>
            Furniture{'\n'} & Decor
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categories}>
          <Image
            source={require("../assets/images/yarn-ball.png")}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryName}>
            Utility,{'\n'} Misc.
          </Text>
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
      <View style={styles.recentSection}>
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
    container: {
      width: "100%",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    startMark: {
      flexDirection: "row",
      width: 50,
      height: 3,
      backgroundColor: "#6c6a6a41",
      alignSelf: "center",
      marginBottom: 10,
    },
    categoriesSection: {
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    categories: {
      flexDirection: "column",
      paddingVertical: 15,
      justifyContent: "space-evenly",
      gap: 5,
      alignItems: "center",
      width: "17.5%",
    },
    categoryImage: {
      width: 40,
      height: 40,
    },
    categoryName: {
      fontFamily: "WorkSans",
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 0,
      color: "#fff",
    },
    divider: {
      flexDirection: "row",
      width: 350,
      height: 1,
      backgroundColor: "#6c6a6a41",
    },
    section: {
      flexDirection: "column",
      height: 150,
      paddingHorizontal: 20,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
    },
    sectionHeading: {
      fontFamily: "WorkSans",
      fontSize: 14,
      fontWeight: 400,
      color: "#95a1ac",
    },
    more: {
      fontFamily: "WorkSans",
      fontSize: 12,
      fontWeight: 400,
      color: "#95a1ac",
    },
    recentSection: {
      flexDirection: "column",
      height: 800,
      paddingHorizontal: 20,
    },
  });
};
