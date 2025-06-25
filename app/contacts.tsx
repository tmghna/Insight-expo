import { SafeAreaView } from "react-native-safe-area-context";
import {
  Accordion,
  Anchor,
  ScrollView,
  Text,
  Square,
  XStack,
  YStack,
} from "tamagui";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Alert, Linking } from "react-native";

const contacts = [
  {
    id: "Health and Emergency",
    description: "Health Center and Emergency Contacts",
    name: ["Dr Gurpreet Singh", "Dr. Harshdeep Kaur"],
    designation: ["Chief Medical Officer", "Lady Medical Officer"],
    number: ["9417360233", "9877705117"],
    email: ["gurpreet", "-"],
  },
  {
    id: "Student Representative",
    description: "SRC and other Official Student Contacts",
    name: ["Agantuk Saha", "Deep Sehgal"],
    designation: ["Convenor", "General Secretary"],
    number: ["1", "2"],
    email: ["a", "b"],
  },
  {
    id: "Academic Officials",
    description: "Contacts for Dean, Dean Acad etc...",
    name: ["A", "B", "C"],
    designation: ["a", "b", "c"],
    number: ["1", "2", "3"],
    email: ["-", "-", "-"],
  },
  {
    id: "Others",
    description: "Other Useful Contacts",
    name: ["A"],
    designation: ["B"],
    number: ["1"],
    email: ["c"],
  },
  {
    id: "Faculty",
    description: "All Faculties",
    name: ["A", "B"],
    office: ["AB2-1F2", "-"],
    department: ["M", "P"],
    email: ["q", "e"],
  },
];
export default function Contacts() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#181818", alignItems: "center" }}
      edges={["top", "right", "left"]}
    >
      <XStack flex={1} width={"100%"} height={87} backgroundColor={"#384c7e00"}>
        <Text
          paddingStart={30}
          paddingTop={10}
          fontSize={30}
          fontWeight={400}
          fontFamily={"$WorkSans"}
          letterSpacing={0}
          color={"#ffffff"}
        >
          Contacts
        </Text>
      </XStack>
      <ScrollView
        flexDirection="column"
        backgroundColor="#384c7e00"
        paddingTop={20}
        paddingBottom={40}
        width={"100%"}
        height={"80%"}
        borderRadius={0}
      >
        {contacts.map((contact) => (
          <Accordion
            type="multiple"
            key={contact.id}
            width={"85%"}
            height={"auto"}
            justifyContent="space-between"
            alignSelf="center"
          >
            <Accordion.Item value={contact.id} width={"100%"}>
              <Accordion.Trigger
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
                gap={15}
                bg={"#00000000"}
                width={"100%"}
                height={"auto"}
                borderColor={"#00000000"}
                paddingRight={"10%"}
                paddingBottom={5}
              >
                {({ open }: { open: boolean }) => (
                  <YStack
                    alignSelf="flex-start"
                    width={"100%"}
                    paddingVertical={2}
                  >
                    <XStack alignSelf="stretch" justifyContent="space-between">
                      <Text
                        color={"#ffffff"}
                        fontSize={25}
                        fontWeight={400}
                        fontFamily={"$WorkSans"}
                        letterSpacing={0}
                        alignSelf="flex-start"
                        width={"100%"}
                      >
                        {contact.id}
                      </Text>
                      <Square
                        animation={"quick"}
                        rotate={open ? "180deg" : "0deg"}
                      >
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={25}
                          color="#ffffff"
                        />
                      </Square>
                    </XStack>
                    {open ? null : (
                      <Text
                        color={"#95a1ac"}
                        fontWeight={400}
                        fontFamily={"$WorkSans"}
                        fontSize={14}
                        letterSpacing={0}
                        overflow="hidden"
                        textAlign="left"
                        width={"100%"}
                      >
                        {contact.description}
                      </Text>
                    )}
                  </YStack>
                )}
              </Accordion.Trigger>

              <Accordion.HeightAnimator animation={"medium"}>
                <Accordion.Content
                  backgroundColor={"#00000000"}
                  paddingTop={5}
                  marginTop={0}
                >
                  <YStack gap={10}>
                    {contact.id === "Faculty"
                      ? contact.name.map((_, index) => (
                          <YStack key={index} gap={5}>
                            <Text
                              color={"#ffffff"}
                              fontWeight={400}
                              fontFamily={"$WorkSans"}
                              fontSize={18}
                              letterSpacing={0}
                              overflow="hidden"
                            >
                              {contact.name[index]}
                            </Text>
                            <Text
                              color={"#ffffff"}
                              fontWeight={400}
                              fontFamily={"$WorkSans"}
                              fontSize={14}
                              letterSpacing={0}
                              overflow="hidden"
                            >
                              {contact.office[index]}
                            </Text>
                            <Text
                              color={"#ffffff"}
                              fontWeight={400}
                              fontFamily={"$WorkSans"}
                              fontSize={14}
                              letterSpacing={0}
                              overflow="hidden"
                            >
                              {contact.department[index]}
                            </Text>

                            <Anchor
                              color={"#95a1ac"}
                              fontWeight={400}
                              fontFamily={"$WorkSans"}
                              fontSize={14}
                              letterSpacing={0}
                              overflow="hidden"
                              onPress={async () => {
                                const emailURL = `mailto:${contact.email[index]}@iisermohali.ac.in`;
                                const canOpen = await Linking.canOpenURL(
                                  emailURL
                                );
                                if (canOpen) {
                                  await Linking.openURL(emailURL);
                                } else {
                                  Alert.alert("Error", "No email app found.");
                                }
                              }}
                            >
                              {contact.email[index]}
                            </Anchor>
                          </YStack>
                        ))
                      : contact.name.map((_, index) => (
                          <YStack key={index} gap={5}>
                            <Text
                              color={"#ffffff"}
                              fontWeight={400}
                              fontFamily={"$WorkSans"}
                              fontSize={18}
                              letterSpacing={0}
                              overflow="hidden"
                            >
                              {contact.name[index]}
                            </Text>
                            <Text
                              color={"#95a1ac"}
                              fontWeight={400}
                              fontFamily={"$WorkSans"}
                              fontSize={14}
                              letterSpacing={0}
                              overflow="hidden"
                            >
                              {contact.designation[index]}
                            </Text>
                            <XStack>
                              <Anchor
                                color={"#ffffff"}
                                fontWeight={400}
                                fontFamily={"$WorkSans"}
                                fontSize={14}
                                letterSpacing={0}
                                overflow="hidden"
                                onPress={async () => {
                                  const phoneURL = `tel:${contact.number[index]}`;
                                  const canOpen = await Linking.canOpenURL(
                                    phoneURL
                                  );
                                  if (canOpen) {
                                    await Linking.openURL(phoneURL);
                                  } else {
                                    Alert.alert(
                                      "Error",
                                      "Can't open phone dialer."
                                    );
                                  }
                                }}
                              >
                                {contact.number[index]} /{" "}
                              </Anchor>
                              <Anchor
                                color={"#ffffff"}
                                fontWeight={400}
                                fontFamily={"$WorkSans"}
                                fontSize={14}
                                letterSpacing={0}
                                overflow="hidden"
                                onPress={async () => {
                                  const emailURL = `mailto:${contact.email[index]}@iisermohali.ac.in`;
                                  const canOpen = await Linking.canOpenURL(
                                    emailURL
                                  );
                                  if (canOpen) {
                                    await Linking.openURL(emailURL);
                                  } else {
                                    Alert.alert("Error", "No email app found.");
                                  }
                                }}
                              >
                                {contact.email[index]}
                              </Anchor>
                            </XStack>
                          </YStack>
                        ))}
                  </YStack>
                </Accordion.Content>
              </Accordion.HeightAnimator>
            </Accordion.Item>
          </Accordion>
        ))}
      </ScrollView>
      <XStack
        flex={1}
        width={"100%"}
        height={77}
        backgroundColor={"#384c7e00"}
      />
    </SafeAreaView>
  );
}
