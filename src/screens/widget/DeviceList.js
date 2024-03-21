import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, StyleSheet, ActivityIndicator, NativeModules } from 'react-native';
import axios from 'axios';
import useGetRoom from '../../hooks/useGetRoom';
import useGetDevicesByRoom from '../../hooks/useGetDeviceByRoom';
import { api_endpoints } from '../../api/apiUrl';

// const SharedStorage = NativeModules.SharedStorage;

export const DeviceToggle = ({ device, onToggle }) => {
  const [isOn, setOn] = useState(true);

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

export const DeviceListScreen = ({ route }) => {
  const { roomId } = route.params;
  const {isOn,setIsOn} = useState(false)
  console.log(roomId);
  const { data: deviceData, isLoading: isDevicesLoading } = useGetDevicesByRoom(roomId);
    console.log(deviceData);
    const handleToggle = (data) => {
    axios.post(`${api_endpoints}/devicesInRoom/status`,  data)
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
        data={deviceData?.data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DeviceToggle device={item} onToggle={handleToggle(item._id,roomId, !isOn)} />}
      />
    </View>
  );
};

 const RoomListScreen = ({ navigation }) => {
    const { data: roomData, isFetching } = useGetRoom();
    console.log("roomdata",roomData);
  return (
    <View style={styles.container}>
        {isFetching && <ActivityIndicator></ActivityIndicator>}
      <FlatList
        data={roomData?.data}
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

export default RoomListScreen;
