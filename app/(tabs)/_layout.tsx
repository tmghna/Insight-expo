import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Metrics } from '@/constants/Metric';
import { TabBarButton } from '@/components/ui/TabBarButton';

const tabs = [
  { icon: 'home', path: 'index', name: 'home', size: 28 },
  { icon: 'fastfood', path: 'mess', name: 'mess', size: 26 },
  { icon: 'notifications', path: 'explore', name: 'notification', size: 27 },
  { icon: 'calendar-today', path: 'calendar', name: 'calendar', size: 26 },
  { icon: 'auto-awesome-mosaic', path: 'clubs', name: 'clubs', size: 28 },
];

export default function TabsLayout() {
  const backgroundColor = useThemeColor({}, "background");

  return (
      <Tabs 
        screenOptions={{ 
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            android: {
              height: Metrics.moderateVerticalScale(55,0.2),
              backgroundColor: backgroundColor,
              borderTopWidth: 0,
              elevation: 0,
            },
          }),
          // animation: "shift"
        }}
      >
        {tabs.map((tab) => (
          <Tabs.Screen 
            key={tab.name} 
            name={tab.path}
            options={{
            tabBarButton: (props) => (
              <TabBarButton
                icon={tab.icon}
                size={tab.size}
                path={tab.path}
                onPress={props.onPress as any}
              />
            ),
            lazy: true, // This prevents rendering screens until they are in the viewport
          }}
          />
        ))};
      </Tabs>
  );
}
