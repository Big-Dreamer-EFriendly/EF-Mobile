import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import axios from 'axios';
import useGetRoom from '../../hooks/useGetRoom';
import useGetDevicesByRoom from '../../hooks/useGetDeviceByRoom';
import { api_endpoints } from '../../api/apiUrl';

const DeviceToggle = ({ device, onToggle }) => {
  const [isOn, setOn] = useState(device.quantity > 0);

  const toggleSwitch = () => {
    setOn(!isOn);
    onToggle(device._id, !isOn);
  };

  return (
    <View style={styles.container}>
      <Text>{device.deviceData.name}</Text>
      <Switch value={isOn} onValueChange={toggleSwitch} />
    </View>
  );
};

const DeviceListScreen = ({ route }) => {
  const { roomId } = route.params;
  const { data: deviceData, isLoading: isDevicesLoading } = useGetDevicesByRoom(roomId);


  const handleToggle = (deviceId,roomId, isOn) => {
    axios.post(`${api_endpoints}/devicesInRoom/status`, { deviceId, roomId, isOn })
      .then(response => {
        console.log('Toggle response:', response.data);
      })
      .catch(error => {
        console.error('Toggle error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={deviceData.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DeviceToggle device={item} onToggle={handleToggle} />}
      />
    </View>
  );
};

const RoomListScreen = ({ navigation }) => {
    const { roomData, isFetching } = useGetRoom();


  return (
    <View style={styles.container}>
      <FlatList
        data={roomData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.roomContainer}
            onPress={() => navigation.navigate('DeviceList', { roomId: item._id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RoomList">
        <Stack.Screen name="RoomList" component={RoomListScreen} />
        <Stack.Screen name="DeviceList" component={DeviceListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  roomContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
