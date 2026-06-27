import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Colours } from '../Theme/Colours/Color';
import { Fonts, FontSize } from '../Theme/FontsSize';
import { scale, verticalScale } from '../Theme/Normalization';

import HomeScreen from '../Screens/Home/HomeScreen';
import BookingsScreen from '../Screens/Bookings/BookingsScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const { width: windowWidth } = Dimensions.get('window');

const TAB_BAR_MARGIN = scale(16);
const TAB_BAR_WIDTH = windowWidth - TAB_BAR_MARGIN * 2;
const TAB_COUNT = 3;
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_COUNT;

interface TabBarItemProps {
  label: string;
  isFocused: boolean;
  onPress: () => void;
  iconName: string;
}

const TabBarItem = ({ label, isFocused, onPress, iconName }: TabBarItemProps) => {
  const scaleVal = useSharedValue(1);

  useEffect(() => {
    scaleVal.value = withSpring(isFocused ? 1.08 : 1, {
      damping: 12,
      stiffness: 150,
    });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleVal.value }],
    };
  });

  const color = isFocused ? Colours.btnColours : '#8E8E93';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.tabItem}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      <Animated.View style={[styles.tabContent, animatedStyle]}>
        <Ionicons name={iconName} size={isFocused ? 22 : 20} color={color} />
        <Text style={[styles.tabLabel, { color }]}>
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const indicatorStyle = useAnimatedStyle(() => {
    const targetTranslateX = state.index * TAB_WIDTH;
    return {
      transform: [
        {
          translateX: withSpring(targetTranslateX, {
            damping: 18,
            stiffness: 140,
            mass: 0.8,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.tabBarContainer}>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
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
    bottom: Platform.OS === 'ios' ? verticalScale(24) : verticalScale(16),
    left: TAB_BAR_MARGIN,
    right: TAB_BAR_MARGIN,
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
  },
  indicator: {
    position: 'absolute',
    width: TAB_WIDTH - scale(16),
    height: verticalScale(46),
    borderRadius: scale(23),
    backgroundColor: 'rgba(235, 76, 76, 0.08)',
    left: scale(8),
    top: '50%',
    marginTop: -verticalScale(23),
  },
  tabItem: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: verticalScale(2),
  },
  tabLabel: {
    fontFamily: Fonts.MontserrateSemiBold || 'System',
    fontSize: FontSize.small - 1,
    fontWeight: '600',
  },
});
