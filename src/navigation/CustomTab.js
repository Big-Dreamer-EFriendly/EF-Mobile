// CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
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
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderIcon = () => {
          if (route.name === 'CenterTab') {
            // Render the curved icon for the center tab
            return (
              <View style={styles.centerTab}>
                <Icon name="plus-circle" size={28} color={isFocused ? 'blue' : 'gray'} />
              </View>
            );
          }

          return <Icon name="home" size={20} color={isFocused ? 'blue' : 'gray'} />;
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            {renderIcon()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff', // Set the background color of your bottom tab
    borderTopLeftRadius: 20, // Adjust the radius to create the curved effect
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5, // Optional: Add elevation for Android shadow
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  centerTab: {
    backgroundColor: 'blue', 
    borderRadius: 50, 
    padding: 10,
  },
});

export default CustomTabBar;
