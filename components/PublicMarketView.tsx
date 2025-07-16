import {
  Button,
  ScrollView,
  Text,
  XStack,
  YStack,
} from 'tamagui';
import { StyleSheet } from 'react-native';

export function PublicMarketSection() {
  const styles = useStyles();

  return (
    <ScrollView style={styles.container}>
      <XStack style={styles.startMark} />

      {/*Categories*/}
      <XStack style={styles.categoriesSection}>
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
      </XStack>

      {/*Peoples Catalogues*/}
      <XStack style={styles.divider} />
      <YStack style={styles.section}>
        <XStack style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Peoples Catalogues</Text>
          <Text style={styles.more}>See all</Text>
        </XStack>
      </YStack>

      {/*Recent Items*/}
      <XStack style={styles.divider} />
      <YStack style={styles.section}>
        <XStack style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Recent Items</Text>
          <Text style={styles.more}>See all</Text>
        </XStack>
      </YStack>
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