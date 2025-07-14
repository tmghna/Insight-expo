
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

//standard virtual pixel deminsion of iphone 11-13
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateHorizontalScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;
const moderateVerticalScale = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;

export const Metrics = {
  screenWidth: width,
  screenHeight: height,
  moderateHorizontalScale,
  moderateVerticalScale,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};