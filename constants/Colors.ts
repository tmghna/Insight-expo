/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#efefef',
    tint: tintColorLight,
    icon: '#575757',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    buttonBackground: '#f6f6f6'
  },
  dark: {
    text: '#ECEDEE',
    background: '#111',
    tint: tintColorDark,
    icon: '#eee',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    buttonBackground: '#222'
  },
};