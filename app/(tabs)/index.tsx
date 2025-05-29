import { ImageBackground } from 'react-native'
import { YStack, Text, Button } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'
import signInMethod from '@/services/auth'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
export default function Home() {
  return (
    <ImageBackground
    source={require('../../assets/images/Texture.jpg')}
    style = {{flex: 1, justifyContent: 'center'}}
    >
    <LinearGradient
    colors={['#9acaecbf', '#56b5c3bf', '#4f82b7bf', '#502c8abf', '#000000bf']}
    locations={[0, 0.2, 0.35, 0.64, 1]}
    start={[0,0]}
    end={[0,1]}
    flex = {1}
    justifyContent='center'
    >
      <YStack ai="center">
        <Text fontSize={24} mb="$4">Hello from Tamagui 👋</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 48}}
          size = {GoogleSigninButton.Size.Wide}
          color = {GoogleSigninButton.Color.Dark}
          onPress={() => signInMethod().then(() => console.log("Signed In"))} />
      </YStack>
      </LinearGradient>
      </ImageBackground>
  )
}