import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
 } from 'react-native';

export function PublicMarketSection() {
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View flexDirection="row" style={styles.startMark} />

      {/*Categories*/}
      <View flexDirection="row" style={styles.categoriesSection}>
        <Button
          style={styles.categories}
          icon={<Image style={styles.appliancesImage} />}
        />
        <Button
          style={styles.categories}
          icon={<Image style={styles.booksImage} />}
        />
        <Button
          style={styles.categories}
          icon={<Image style={styles.furnitureImage} />}
        />
        <Button
          style={styles.categories}
          icon={<Image style={styles.utilityImage} />}
        />
      </View>

      {/*Peoples Catalogues*/}
      <View flexDirection="row" style={styles.divider} />
      <View flexDirection="column" style={styles.section}>
        <View flexDirection="row" style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Peoples Catalogues</Text>
          <Text style={styles.more}>See all</Text>
        </View>
      </View>

      {/*Recent Items*/}
      <View flexDirection="row" style={styles.divider} />
      <View flexDirection="column" style={styles.section}>
        <View flexDirection="row" style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Recent Items</Text>
          <Text style={styles.more}>See all</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const useStyles=() => {
  return StyleSheet.create({
    container: {},
    startMark: {},
    categoriesSection: {},
    categories: {},
    appliancesImage: {},
    booksImage: {},
    furnitureImage: {},
    utilityImage: {},
    divider: {},
    section: {},
    sectionHeader: {},
    sectionHeading: {},
    more: {},
  })
}