import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  unstyled?: boolean;
};

export function ThemedView({ style, lightColor, darkColor, unstyled = false, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[!unstyled && { backgroundColor }, style]} {...otherProps} />;
}