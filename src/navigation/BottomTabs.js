import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import ShowRoom from '../screens/rooms/ShowRoom';
import AllTips from '../screens/tips/AllTips';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tips"
        component={AllTips}
        options={{
          tabBarLabel: 'Tips',
          tabBarIcon: ({ color, size }) => (
            <Icon name="lightbulb-on-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={ShowRoom}
        options={{
          tabBarLabel: 'Rooms',
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-table-box-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
