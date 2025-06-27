// tamagui.config.ts
import { createFont, createTamagui } from 'tamagui'
import { config as tamaguiDefaultConfig } from '@tamagui/config/v3'

const Agrandir = createFont({
  family: "Agrandir",
  weight: {
    300: "Agrandir300",
    900: "Agrandir900",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    300: { normal: "Agrandir300", },
    900: { normal: "Agrandir900", },
  }
})

const CourseStructure = createFont({
  family: "CourseStructure",
  weight: {
    400: "CourseStructure",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "CourseStructure", },
  }
})

const GeneralSans = createFont({
  family: "GeneralSans",
  weight: {
    200: "GeneralSans200",
    300: "GeneralSans300",
    400: "GeneralSans400",
    500: "GeneralSans500",
    600: "GeneralSans600",
    700: "GeneralSans700",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    200: { normal: "GeneralSans200", },
    300: { normal: "GeneralSans300", },
    400: { normal: "GeneralSans400", },
    500: { normal: "GeneralSans500", },
    600: { normal: "GeneralSans600", },
    700: { normal: "GeneralSans700", },
  }
})

const Icon1 = createFont({
  family: "Icon1",
  weight: {
    400: "Icon1",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "Icon1" },
  }
})

const Kreadon = createFont({
  family: "Kreadon",
  weight: {
    200: "Kreadon200",
    300: "Kreadon300",
    400: "Kreadon400",
    500: "Kreadon500",
    600: "Kreadon600",
    700: "Kreadon700",
    800: "Kreadon800",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    200: { normal: "Kreadon200", },
    300: { normal: "Kreadon300", },
    400: { normal: "Kreadon400", },
    500: { normal: "Kreadon500", },
    600: { normal: "Kreadon600", },
    700: { normal: "Kreadon700", },
    800: { normal: "Kreadon800", },
  }
})

const Lato = createFont({
  family: "Lato",
  weight: {
    400: "Lato400",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "Lato400", }
  }
})

const Montserrat = createFont({
  family: "Montserrat",
  weight: {
    400: "Montserrat400",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "Montserrat400", }
  }
})

const Mukta = createFont({
  family: "Mukta",
  weight: {
    400: "Mukta400",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "Mukta400", }
  }
})

const Nunito = createFont({
  family: "Nunito",
  weight: {
    400: "Nunito400",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "Nunito400", }
  }
})

const OldEnglishFive = createFont({
  family: "OldEnglishFive",
  weight: {
    400: "OldEnglishFive",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "OldEnglishFive", },
  }
})

const Poppins = createFont({
  family: "Poppins",
  weight: {
    400: "Poppins400",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "Poppins400", },
  }
})

const Rubik = createFont({
  family: "Rubik",
  weight: {
    400: "Rubik400",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "Rubik400", },
  }
})

const VarelaRound = createFont({
  family: "VarelaRound",
  weight: {
    400: "VarelaRound400",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "VarleRound400", },
  }
})

const Verdanab = createFont({
  family: "Verdanab",
  weight: {
    700: "Verdanab700",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    700: { normal: "Verdanab700", },
  }
})

const WorkSans = createFont({
  family: "WorkSans",
  weight: {
    400: "WorkSans400",
    500: "WorkSans500",
    600: "WorkSans600",
  },
  size: tamaguiDefaultConfig.fonts.body.size,
  face: {
    400: { normal: "WorkSans400", },
    500: { normal: "WorkSans500", },
    600: { normal: "WorkSans600", },
  }
})

const config = createTamagui({
  ...tamaguiDefaultConfig,

  fonts: {
    ...tamaguiDefaultConfig.fonts,
    Agrandir: Agrandir,
    CourseStructure: CourseStructure,
    GeneralSans: GeneralSans,
    Icon1: Icon1,
    Kreadon: Kreadon,
    Lato: Lato,
    Montserrat: Montserrat,
    Mukta: Mukta,
    Nunito: Nunito,
    OldEnglishFive: OldEnglishFive,
    Poppins: Poppins,
    Rubik: Rubik,
    VarelaRound: VarelaRound,
    Verdanab: Verdanab,
    WorkSans: WorkSans,    
  },

  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
