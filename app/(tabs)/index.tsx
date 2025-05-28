import { ImageBackground } from 'react-native'
import { YStack, Text, Button, Image } from 'tamagui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { LoginButton } from '../../components/ui/LoginButton'

export default function Home() {
  return (
    <ImageBackground
    source={require('../../assets/images/Login-Background-Texture.png')}
    style = {{flex: 1, justifyContent: 'center'}}
    >
    <LinearGradient
    colors={['#00000090', '#17136685', '#39015e75', '#130e4d70', '#00000080']}
    locations={[0, 0.2, 0.4, 0.8, 0.96]}
    start={[0,0]}
    end={[0,1]}
    flex = {1}
    justifyContent='center'
    >
      <YStack flex={1} jc='center' ai='center' shadowColor='#00000033' shadowOffset={{width:0, height:2}}>
        <Image 
          source={{width: 300, height: 200, uri: require('../../assets/images/insight_logo.png')}}
        />
        <LoginButton mt='45' onPress={() => alert('It works!')}>Guest Login</LoginButton>
        <LoginButton mt='30' onPress={() => alert('It works')}>Student Login</LoginButton>
        <Button
          color={'white'} fontSize={14} fontWeight={400} height={40} px={16}
          position='absolute' bottom={'1.4%'} right={'1.5%'}
         chromeless>{'< dev login >'}</Button>
      </YStack>
      </LinearGradient>
      </ImageBackground>
  )
}