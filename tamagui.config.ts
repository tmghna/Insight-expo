// tamagui.config.ts
import { createTamagui } from 'tamagui'
import { config as tamaguiDefaultConfig } from '@tamagui/config/v3'

const config = createTamagui(tamaguiDefaultConfig)

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
