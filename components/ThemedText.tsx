import { Text, type TextProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Metrics } from '@/constants/Metric';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'subText' | 'link' | 'footer';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'subText' ? styles.subText : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'footer' ? styles.footer : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Metrics.moderateHorizontalScale(14,.2),
    fontFamily: 'Nunito400'
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: Metrics.moderateHorizontalScale(20,.2),
    fontFamily: 'WorkSans500'
  },
  subText: {
    fontSize: Metrics.moderateHorizontalScale(16,.2),
    fontFamily: 'Nunito400'
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  footer: {
    fontSize: Metrics.moderateHorizontalScale(12,.2),
    fontFamily: 'Nunito400',
    opacity: 0.6,
  },
});