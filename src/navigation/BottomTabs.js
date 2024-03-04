import React from 'react';
import { StyleSheet, Dimensions, View, Animated, TouchableOpacity, Text} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import ShowRoom from '../screens/rooms/ShowRoom';
import AllTips from '../screens/tips/AllTips';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

const BottomTabs = () => {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'home-outline';
        break;
      case 'All tips':
        icon = 'lightbulb-on-outline';
        break;
      case 'Rooms':
        icon = 'file-table-box-outline';
        break;
      case 'Profile':
        icon = 'account-settings-outline';
        break;
    }

    return (
      <View style={styles.iconWithLabel}>
      <Icon
        name={icon}
        size={25}
        color={routeName === selectedTab ? '#FA812E' : '#999999'}
      />
      <Text style={styles.label}>{routeName}</Text>
    </View>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={height * 0.08}
      circleWidth={width * 0.1}
      bgColor="white"
      screenOptions={
        {headerShown: false}
      }
      initialRouteName="Home"
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate('Add device')}
          >
            <Icon name={'plus-circle'} color="#fff" size={50} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={Home}
        options={{ headerShown: false }}
      />
      <CurvedBottomBar.Screen
        name="All tips"
        position="LEFT"
        component={AllTips}
        options={{ headerShown: false }}
      />
      <CurvedBottomBar.Screen
        name="Rooms"
        component={ShowRoom}
        position="RIGHT"
        options={{ headerShown: false }}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        component={Profile}
        position="RIGHT"
        options={{ headerShown: false }}
      />
    </CurvedBottomBar.Navigator>
  );
};

export default BottomTabs;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA812E',
    bottom: height * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: width * 0.15,
    height: width * 0.15,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: width * 0.1,
    height: width * 0.1,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
  iconWithLabel: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#666666',
  },
});
