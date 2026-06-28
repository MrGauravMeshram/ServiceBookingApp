import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colours } from '../Theme/Colours/Color';
import { Fonts, FontSize } from '../Theme/FontsSize';
import { scale, verticalScale } from '../Theme/Normalization';

import HomeScreen from '../Screens/Home/HomeScreen';
import BookingsScreen from '../Screens/Bookings/BookingsScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

interface TabBarItemProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  iconName: string;
}

const TabBarItem = ({ label, isFocused, onPress, iconName }: TabBarItemProps) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(isFocused ? -verticalScale(16) : 0, {
      duration: 200,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const activeIconColor = Colours.white;
  const inactiveIconColor = '#8E8E93';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.tabItem}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      <Animated.View style={[
        styles.iconContainer,
        isFocused ? styles.activeIconContainer : styles.inactiveIconContainer,
        animatedStyle
      ]}>
        <Ionicons
          name={iconName}
          size={isFocused ? 24 : 20}
          color={isFocused ? activeIconColor : inactiveIconColor}
        />
      </Animated.View>
      <Text style={[
        styles.tabLabel,
        { color: isFocused ? Colours.btnColours : '#8E8E93' }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        let iconName = '';
        if (route.name === 'HomeTab') {
          iconName = isFocused ? 'home' : 'home-outline';
        } else if (route.name === 'BookingsTab') {
          iconName = isFocused ? 'calendar' : 'calendar-outline';
        } else if (route.name === 'ProfileTab') {
          iconName = isFocused ? 'person' : 'person-outline';
        }

        return (
          <TabBarItem
            key={route.key}
            label={label}
            isFocused={isFocused}
            onPress={onPress}
            iconName={iconName}
          />
        );
      })}
    </View>
  );
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{ title: 'Bookings' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: verticalScale(16),
    left: scale(16),
    right: scale(16),
    elevation: 8,
    backgroundColor: Colours.white,
    borderRadius: scale(24),
    height: verticalScale(66),
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(4),
  },
  activeIconContainer: {
    backgroundColor: Colours.btnColours,
    borderWidth: 4,
    borderColor: Colours.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  inactiveIconContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  tabLabel: {
    position: 'absolute',
    bottom: verticalScale(6),
    fontFamily: Fonts.MontserrateSemiBold || 'System',
    fontSize: FontSize.small - 1,
    fontWeight: '600',
  },
});
