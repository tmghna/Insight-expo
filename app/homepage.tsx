import { LinearGradient } from "@tamagui/linear-gradient";
import {
  Button,
  Card,
  Image,
  ScrollView,
  Text,
  XGroup,
  XStack,
  YStack,
} from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { Dimensions, ImageBackground, Text as RNText } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiScrollView } from "moti";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NavBar from "@/components/NavBar";
import { useRouter } from "expo-router";

const { width: ScreenWidth } = Dimensions.get("window");
const NotifWidth = 0.85 * ScreenWidth;
const notification = [
  {
    id: "1",
    description: "Something",
    image: require("../assets/images/Card.png"),
    textcolor: "#ffffff",
  },
  {
    id: "2",
    description:
      "Insight got a Brand New Update! Check it out by updating through PlayStore or AppStore",
    image: { uri: "https://i.postimg.cc/SNWHZmNy/hceyyyryrinsight.png" },
    textcolor: "#181818",
  },
];

const facilities = [
  {
    id: "Market",
    image: require("../assets/images/market2.png"),
    push: "/market",
  },
  {
    id: "Complaints",
    image: require("../assets/images/complaints2.png"),
    push: "/+not-found",
  },
  {
    id: "Contacts",
    image: require("../assets/images/menu2.png"),
    push: "/contacts",
  },
  {
    id: "Timings",
    image: require("../assets/images/time2.png"),
    push: "/+not-found",
  },
];

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedView = Animated.createAnimatedComponent(XStack);

export default function HomePage() {
  const router = useRouter();

  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.floor(scrollX.value / NotifWidth);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#181818" }} edges={["top"]}>
      <ScrollView
        flex={1}
        flexDirection="column"
        backgroundColor="#181818"
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <XStack
          flex={1}
          justifyContent="space-between"
          alignItems="center"
          paddingEnd={10}
          marginTop={40}
          marginHorizontal={40}
        >
          <YStack flex={1} alignItems="flex-start" paddingRight={10}>
            <Text
              paddingBottom={10}
              fontSize={20}
              fontWeight={400}
              fontFamily={"$WorkSans"}
              letterSpacing={0}
              color={"#95a1ac"}
            >
              Hello,
            </Text>
            <RNText
              adjustsFontSizeToFit
              style={{
                fontSize: 30,
                fontWeight: "400",
                fontFamily: "WorkSans400",
                color: "#ffffff",
                letterSpacing: 0,
              }}
              numberOfLines={1}
              ellipsizeMode="clip"
            >
              UserName
            </RNText>
          </YStack>
          <Button
            circular
            width={60}
            height={60}
            size={60}
            backgroundColor={"#384c7e00"}
            onPress={()=>router.push('/settings')}
            icon={
              <Image
                source={{ uri: "https://i.postimg.cc/kGFzn7Vs/image.png" }}
                width={"100%"}
                height={"100%"}
                resizeMode="cover"
                borderRadius={60}
                borderWidth={1}
                borderColor={"#4a6ece00"}
              />
            }
            pressStyle={{
              backgroundColor: "#384c7e00",
              borderColor: "#384c7e00",
            }}
            focusStyle={{
              backgroundColor: "#384c7e00",
              borderColor: "#384c7e00",
            }}
            hoverStyle={{
              backgroundColor: "#384c7e00",
              borderColor: "#384c7e00",
            }}
          />
        </XStack>
        <Text
          paddingStart={30}
          paddingTop={20}
          paddingBottom={5}
          flex={1}
          flexDirection="row"
          alignSelf="flex-start"
          fontSize={20}
          fontWeight={400}
          letterSpacing={0}
          fontFamily={"$Poppins"}
          color={"#d7d7d7"}
        >
          Notifications
        </Text>
        <AnimatedScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          paddingTop={5}
          paddingBottom={40}
          borderRadius={30}
          width={"100%"}
          height={200}
          snapToInterval={NotifWidth}
        >
          {notification.map((item) => (
            <Card
              key={item.id}
              flex={1}
              width={NotifWidth}
              height={175}
              backgroundColor={"#00000000"}
              borderColor={"#00000000"}
              marginHorizontal={26}
            >
              <Image
                source={item.image}
                width={"100%"}
                height={"100%"}
                resizeMode="cover"
                overflow="hidden"
                borderRadius={22}
                opacity={0.8}
              />
              <Text
                position="absolute"
                top={"55%"}
                px={20}
                paddingTop={20}
                paddingBottom={10}
                fontSize={12}
                fontWeight={600}
                fontFamily={"$Poppins"}
                color={item.textcolor}
                letterSpacing={0}
              >
                {item.description}
              </Text>
            </Card>
          ))}
        </AnimatedScrollView>

        {/* Indicator */}
        <XStack
          flex={1}
          justifyContent="space-between"
          alignItems="center"
          paddingEnd={5}
          marginHorizontal={16}
          marginBottom={16}
          height={24}
          width={"85%"}
        >
          <XGroup>
            {notification.map((_, i) => (
              <IndicatorSegment
                key={i}
                index={i}
                scrollX={scrollX}
                activeIndex={activeIndex}
              />
            ))}
          </XGroup>
          <FontAwesome5 name="angle-double-right" size={17} color="#ffffff55" />
        </XStack>
        <ImageBackground
          source={require("../assets/images/Card.png")}
          style={{ width: "85%", height: 123, marginBottom: 40 }}
          imageStyle={{
            width: "100%",
            height: 123,
            resizeMode: "cover",
            borderRadius: 8,
          }}
        >
          <Button
            marginBottom={40}
            borderRadius={8}
            width={"100%"}
            height={"100%"}
            backgroundColor={"#00000000"}
            pressStyle={{
              backgroundColor: "#00000000",
              borderColor: "#00000000",
            }}
            focusStyle={{
              backgroundColor: "#00000000",
              borderColor: "#00000000",
            }}
            hoverStyle={{
              backgroundColor: "#00000000",
              borderColor: "#00000000",
            }}
          />
        </ImageBackground>
        <YStack paddingStart={20} paddingBottom={10} flex={1}>
          <Text
            paddingStart={10}
            paddingBottom={15}
            fontSize={23}
            fontWeight={400}
            fontFamily={"$WorkSans"}
            letterSpacing={0}
            color={"#d7d7d7"}
          >
            Campus Facilities
          </Text>
          <MotiScrollView
            horizontal
            style={{ flex: 0, flexDirection: "row", marginBottom: 10 }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
            showsHorizontalScrollIndicator={false}
            from={{
              opacity: 0,
              translateX: 21,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              opacity: {
                delay: 0,
                easing: Easing.inOut(Easing.ease),
                type: "timing",
                duration: 450,
              },
              translateX: {
                delay: 0,
                easing: Easing.inOut(Easing.ease),
                type: "timing",
                duration: 460,
              },
            }}
          >
            {facilities.map((item) => (
              <Button
                key={item.id}
                margin={5}
                px={10}
                paddingTop={5}
                width={135}
                height={67}
                backgroundColor={"#1f1f1f"}
                borderColor={"#1f1f1f"}
                borderRadius={20}
                icon={
                  <Image
                    source={item.image}
                    borderRadius={8}
                    width={35}
                    height={35}
                    resizeMode="cover"
                  />
                }
                pressStyle={{
                  backgroundColor: "#00000000",
                  borderColor: "#00000000",
                }}
                focusStyle={{
                  backgroundColor: "#00000000",
                  borderColor: "#00000000",
                }}
                hoverStyle={{
                  backgroundColor: "#00000000",
                  borderColor: "#00000000",
                }}
                onPress={()=> router.push(item.push as any)}
              >
                <RNText
                  adjustsFontSizeToFit
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    fontFamily: "WorkSans400",
                    color: "#ffffff",
                    textAlign: "center",
                  }}
                >
                  {item.id}
                </RNText>
              </Button>
            ))}
          </MotiScrollView>
        </YStack>
        <Button
          width={"80%"}
          pressStyle={{
            backgroundColor: "#857cc9ff",
            borderColor: "#857cc9ff",
          }}
          focusStyle={{
            backgroundColor: "#857cc9ff",
            borderColor: "#857cc9ff",
          }}
          hoverStyle={{
            backgroundColor: "#857cc9ff",
            borderColor: "#857cc9ff",
          }}
          height={50}
          borderRadius={24}
          backgroundColor={"#857cc9ff"}
          textAlign="center"
        >
          <Image
            source={require("../assets/images/newspaper.png")}
            opacity={0.2}
            width={200}
            height={50}
            resizeMode="cover"
            borderRadius={20}
            position="absolute"
            top={0}
            left={0}
            overflow="hidden"
          />
          <Text
            fontSize={26}
            fontWeight={400}
            fontFamily={"$OldEnglishFive"}
            color={"#ffffffcb"}
            letterSpacing={0}
            style={{
              textShadowColor: "#1f1f1fff",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 2,
            }}
          >
            Manthan Times
          </Text>
        </Button>
        <YStack py={30} paddingStart={30} flex={1}>
          <Text
            paddingStart={10}
            paddingBottom={15}
            fontSize={23}
            fontWeight={400}
            fontFamily={"$WorkSans"}
            letterSpacing={0}
            color={"#b7b7b7"}
          >
            Helpful
          </Text>
          <MotiScrollView
            horizontal
            style={{ flex: 1, flexDirection: "row" }}
            from={{
              opacity: 0,
              translateX: 21,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              opacity: {
                delay: 0,
                easing: Easing.inOut(Easing.ease),
                type: "timing",
                duration: 280,
              },
              translateX: {
                delay: 0,
                easing: Easing.inOut(Easing.ease),
                type: "timing",
                duration: 600,
              },
            }}
          >
            <LinearGradient
              colors={["#fffbc2ff", "#e7df7dff"]}
              locations={[0, 1]}
              start={[0, -1]}
              end={[0, 1]}
              borderRadius={20}
              shadowColor={"#00000033"}
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
              elevation={3}
              paddingRight={10}
              marginHorizontal={10}
            >
              <XStack
                borderRadius={20}
                width={160}
                height={250}
                backgroundColor={"#00000000"}
                alignItems="center"
                justifyContent="flex-start"
              >
                <YStack
                  flex={1}
                  width={"100%"}
                  paddingTop={10}
                  margin={10}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Button
                    width={"100%"}
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    backgroundColor={"#00000000"}
                  >
                    <RNText
                      numberOfLines={2}
                      adjustsFontSizeToFit
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        fontFamily: "Kreadon700",
                        letterSpacing: 0,
                        color: "#2a2a2aff",
                        alignSelf: "flex-start",
                      }}
                    >
                      Lost and Found
                    </RNText>
                    <Feather
                      name="arrow-up-right"
                      size={24}
                      color="#2a2a2aff"
                    />
                  </Button>

                  <YStack
                    padding={10}
                    width={"70%"}
                    height={"78%"}
                    backgroundColor={"#384c7e00"}
                    flex={1}
                  >
                    <RNText
                      adjustsFontSizeToFit
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        fontFamily: "WorkSans600",
                        letterSpacing: 0,
                        color: "#141414ff",
                      }}
                    >
                      Recent
                    </RNText>
                    <RNText
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      style={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "WorkSans400",
                        color: "##95a1ac",
                        letterSpacing: 0,
                        justifyContent: "flex-start",
                      }}
                    >
                      Name
                    </RNText>
                    <RNText
                      numberOfLines={3}
                      ellipsizeMode="clip"
                      style={{
                        justifyContent: "flex-start",
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "WorkSans400",
                        letterSpacing: 0,
                        color: "##95a1ac",
                      }}
                    >
                      Item
                    </RNText>
                  </YStack>
                  <Button
                    marginVertical={10}
                    marginHorizontal={24}
                    height={40}
                    backgroundColor={"#ecdf92ff"}
                    color={"#000000"}
                    fontSize={16}
                    fontWeight={500}
                    fontFamily={"$WorkSans"}
                    letterSpacing={0}
                    elevation={3}
                    borderColor={"#00000000"}
                    borderWidth={1}
                    borderRadius={8}
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                  >
                    Add
                  </Button>
                </YStack>
              </XStack>
            </LinearGradient>

            <LinearGradient
              colors={["#d2b2f0ff", "#ac7dd8ff"]}
              locations={[0, 1]}
              start={[0, -1]}
              end={[0, 1]}
              borderRadius={20}
              shadowColor={"#00000033"}
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
              elevation={3}
              padding={10}
              marginHorizontal={10}
            >
              <XStack
                borderRadius={20}
                width={160}
                height={250}
                backgroundColor={"#00000000"}
                alignItems="center"
                justifyContent="flex-start"
              >
                <YStack
                  flex={1}
                  width={"70%"}
                  height={"78%"}
                  padding={10}
                  margin={10}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <RNText
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      fontFamily: "Kreadon700",
                      letterSpacing: 0,
                      color: "#2a2a2aff",
                      alignSelf: "flex-start",
                    }}
                  >
                    Academic Links
                  </RNText>
                  <Button
                    marginVertical={10}
                    marginHorizontal={24}
                    height={40}
                    width={139}
                    backgroundColor={"#b28ed3ff"}
                    color={"#000000"}
                    fontSize={12}
                    fontWeight={500}
                    fontFamily={"$Poppins"}
                    letterSpacing={0}
                    elevation={3}
                    borderColor={"#00000000"}
                    borderWidth={1}
                    borderRadius={22}
                    shadowRadius={4}
                    shadowColor={"#00000033"}
                    shadowOffset={{ width: 0, height: 2 }}
                    textAlign="center"
                    textWrap="wrap"
                    icon={
                      <FontAwesome5
                        name="google-drive"
                        size={24}
                        color="#e4dfa3ff"
                      />
                    }
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                  >
                    Drive Material
                  </Button>
                  <Button
                    marginVertical={10}
                    marginHorizontal={24}
                    height={40}
                    width={139}
                    backgroundColor={"#b28ed3ff"}
                    color={"#000000"}
                    fontSize={12}
                    fontWeight={500}
                    fontFamily={"$Poppins"}
                    letterSpacing={0}
                    elevation={3}
                    borderColor={"#00000000"}
                    borderWidth={1}
                    borderRadius={22}
                    shadowRadius={4}
                    shadowColor={"#00000033"}
                    shadowOffset={{ width: 0, height: 2 }}
                    textAlign="center"
                    textWrap="wrap"
                    icon={
                      <FontAwesome5 name="readme" size={24} color="#e6759aff" />
                    }
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                  >
                    Course Structure
                  </Button>
                  <Button
                    marginVertical={10}
                    marginHorizontal={24}
                    height={40}
                    width={139}
                    backgroundColor={"#b28ed3ff"}
                    color={"#000000"}
                    fontSize={12}
                    fontWeight={500}
                    fontFamily={"$Poppins"}
                    letterSpacing={0}
                    elevation={3}
                    borderColor={"#00000000"}
                    borderWidth={1}
                    borderRadius={22}
                    shadowRadius={4}
                    shadowColor={"#00000033"}
                    shadowOffset={{ width: 0, height: 2 }}
                    textAlign="center"
                    textWrap="wrap"
                    icon={
                      <MaterialIcons
                        name="edit-document"
                        size={24}
                        color="#6858ebff"
                      />
                    }
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                  >
                    Drive Material
                  </Button>
                </YStack>
              </XStack>
            </LinearGradient>
            <LinearGradient
              colors={["#95d9ddff", "#92f3e7c3"]}
              locations={[0, 1]}
              start={[0, -1]}
              end={[0, 1]}
              borderRadius={20}
              shadowColor={"#00000033"}
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
              elevation={3}
              padding={10}
              marginHorizontal={10}
            >
              <XStack
                borderRadius={20}
                width={160}
                height={250}
                backgroundColor={"#00000000"}
                alignItems="center"
                justifyContent="flex-start"
              >
                <YStack
                  flex={1}
                  width={"70%"}
                  height={"78%"}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <RNText
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      fontFamily: "Kreadon700",
                      letterSpacing: 0,
                      color: "#2a2a2aff",
                      alignSelf: "center",
                    }}
                  >
                    Hospital Helpline
                  </RNText>
                  <Button
                    marginVertical={10}
                    marginHorizontal={24}
                    height={40}
                    width={139}
                    backgroundColor={"#57b2c5ff"}
                    color={"#000000"}
                    fontSize={12}
                    fontWeight={500}
                    fontFamily={"$Poppins"}
                    letterSpacing={0}
                    elevation={3}
                    borderColor={"#00000000"}
                    borderWidth={1}
                    borderRadius={22}
                    shadowRadius={4}
                    shadowColor={"#00000033"}
                    shadowOffset={{ width: 0, height: 2 }}
                    textAlign="center"
                    textWrap="wrap"
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                  >
                    Ambulance
                  </Button>
                  <Button
                    marginVertical={10}
                    marginHorizontal={24}
                    height={40}
                    width={139}
                    backgroundColor={"#57b2c5ff"}
                    color={"#000000"}
                    fontSize={12}
                    fontWeight={500}
                    fontFamily={"$Poppins"}
                    letterSpacing={0}
                    elevation={3}
                    borderColor={"#00000000"}
                    borderWidth={1}
                    borderRadius={22}
                    shadowRadius={4}
                    shadowColor={"#00000033"}
                    shadowOffset={{ width: 0, height: 2 }}
                    textAlign="center"
                    textWrap="wrap"
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                  >
                    Hospitals
                  </Button>
                </YStack>
              </XStack>
            </LinearGradient>
            <LinearGradient
              colors={["#f4ab6a", "#d16002"]}
              locations={[0, 1]}
              start={[0, -1]}
              end={[0, 1]}
              borderRadius={20}
              shadowColor={"#00000033"}
              shadowRadius={4}
              shadowOffset={{ width: 0, height: 2 }}
              elevation={3}
              padding={10}
              marginHorizontal={10}
            >
              <XStack
                borderRadius={20}
                width={160}
                height={250}
                backgroundColor={"#00000000"}
                alignItems="center"
                justifyContent="flex-start"
              >
                <YStack
                  flex={1}
                  width={"70%"}
                  height={"78%"}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <RNText
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      fontFamily: "Kreadon700",
                      letterSpacing: 0,
                      color: "#2a2a2aff",
                      alignSelf: "center",
                    }}
                  >
                    Others
                  </RNText>
                  <Button
                    marginVertical={10}
                    marginHorizontal={24}
                    height={40}
                    width={139}
                    backgroundColor={"#fda172"}
                    color={"#000000"}
                    fontSize={12}
                    fontWeight={500}
                    fontFamily={"$Poppins"}
                    letterSpacing={0}
                    elevation={3}
                    borderColor={"#00000000"}
                    borderWidth={1}
                    borderRadius={22}
                    shadowRadius={4}
                    shadowColor={"#00000033"}
                    shadowOffset={{ width: 0, height: 2 }}
                    textAlign="center"
                    textWrap="wrap"
                    pressStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    focusStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                    hoverStyle={{
                      backgroundColor: "#00000000",
                      borderColor: "#00000000",
                    }}
                  >
                    Laundry
                  </Button>
                </YStack>
              </XStack>
            </LinearGradient>
          </MotiScrollView>
        </YStack>
      </ScrollView>
      <NavBar/>
    </SafeAreaView>
  );
}

function IndicatorSegment({ index, scrollX, activeIndex }) {
  //TODO:- TS error - Harshita
  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = Math.abs(activeIndex.value - index) <= 1;

    if (!isVisible) {
      return {
        width: 0,
        opacity: 0,
        backgroundColor: "#4b39ef4c",
      };
    }

    const inputRange = [
      (index - 1) * NotifWidth,
      index * NotifWidth,
      (index + 1) * NotifWidth,
    ];

    const width = interpolate(
      scrollX.value,
      inputRange,
      [16, 48, 16],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolate.CLAMP
    );

    return {
      width,
      opacity,
      backgroundColor: isVisible ? "#4a6ece" : "#4b39ef4c",
    };
  });

  return (
    <AnimatedView
      height={8}
      borderRadius={22}
      marginRight={8}
      style={animatedStyle}
    />
  );
}
