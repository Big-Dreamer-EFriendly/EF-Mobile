import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import DeviceCard from './DeviceCard';
import ModalEdit from './ModalEdit';
import useGetDevicesByRoom from '../../hooks/useGetDeviceByRoom';
import GeneralInfo from './GeneralInfo';

const { width, height } = Dimensions.get('window');

const DetailRoom = ({ route, navigation }) => {
  const { roomId, name, floor, numberOfDevices } = route.params;
  const { data: deviceData, isLoading: isDevicesLoading } = useGetDevicesByRoom(roomId);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState('General');
  console.log(deviceData);
  const categories = [...new Set(deviceData?.data?.map(device => device.categoryData.name))];

  const filterDevicesByCategory = (category) => {
    return deviceData?.data?.filter(device => device.categoryData.name === category);
  };

  const handleSaveTemperature = (newTemperature) => {
    setIsEditModalVisible(false);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      key={item}
      style={[styles.categoryButton, { backgroundColor: selectedCategory === item ? '#0F3049' : 'white' }]}
      onPress={() => {
        setSelectedCategory(item);
        setCurrentPage(item);
      }}
    >
      <Text style={[styles.categoryText, { color: selectedCategory === item ? 'white' : '#FF8A1E' }]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderDeviceItem = ({ item }) => (
    <DeviceCard key={item._id} device={item} onEditDevice={setSelectedDevice} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
      </View>
      <FlatList
        horizontal
        style={{ marginBottom: height * 0.02 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        data={['General', ...categories]}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
      />
      {currentPage === 'General' && (
        <GeneralInfo roomId={roomId} name={name} floor={floor} numberOfDevices={numberOfDevices} />
      )}
      {currentPage !== 'General' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: height * 0.01 }}
          contentContainerStyle={styles.deviceList}
          data={filterDevicesByCategory(currentPage)}
          renderItem={renderDeviceItem}
          keyExtractor={(item) => item._id}
        />
      )}
      <ModalEdit
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        initialTemperature={selectedDevice ? selectedDevice.temperature : 0}
        onSave={handleSaveTemperature}
        deviceId={selectedDevice && selectedDevice.deviceData ? selectedDevice._id : ""}
        deviceName={selectedDevice && selectedDevice.deviceData ? selectedDevice.deviceData.name : ""}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: width * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  title: {
    fontSize: width * 0.055,
    color: '#0F3049',
    fontWeight: '700',
  },
  iconback: {
    width: width * 0.05,
    height: height * 0.03,
  },
  icon: {
    width: width * 0.055,
    height: height * 0.03,
  },
  categoryContainer: {
    paddingVertical: height * 0.02,
  },
  categoryButton: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
    marginHorizontal: width * 0.01,
    borderRadius: 10,
    height: height * 0.06,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,

  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold'
  },
  deviceList: {
    justifyContent: 'flex-start',
    marginBottom: height * 0.7,
    paddingVertical: height * 0.02
  }
});

export default DetailRoom;
