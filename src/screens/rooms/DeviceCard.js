import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, TextInput, Modal, Button, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalEdit from './ModalEdit';

const { width, height } = Dimensions.get('window');

const DeviceCard = ({ device, useEditDevice }) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const handleEditDevice = () => {
        setIsEditModalVisible(true);
    };

    const handleSaveTemperature = (values) => {
        useEditDevice(values.temperature);
        setIsEditModalVisible(false);
    };

    return (
        <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>{device.deviceData.name}</Text>
            <Text style={styles.deviceInfo}>Quantity: {device.quantity}</Text>
            {device.categoryData.name === 'Air-conditioner' && (
                <>
                    <Text style={styles.deviceInfo}>Commonly used temperature: {device.temperature}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditDevice}>
                            <Icon name='square-edit-outline' color={'#FF8A1E'} size={20} />
                        </TouchableOpacity>
                        <ModalEdit
                            isVisible={isEditModalVisible}
                            onClose={() => setIsEditModalVisible(false)}
                            initialTemperature={device.temperature}
                            useEditDevice={handleSaveTemperature}
                        />
                        {console.log(device.temperature)}
                    </View>
                </>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Switch
                        value={device.isStatus}
                    />
                    <Text style={{ marginLeft: 10 }}>{device.isStatus ? 'ON' : 'OFF'}</Text>
                </View>
            </View>
        </View>
    );
};

export default DeviceCard;

const styles = StyleSheet.create({
    deviceCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: width * 0.03,
      marginVertical: height * 0.01,
      marginHorizontal: width * 0.02,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    deviceName: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      marginBottom: height * 0.005,
      color:'black'
    },
    deviceInfo: {
      fontSize: width * 0.04,
      marginBottom: height * 0.005,
    },
    editButton: {
      backgroundColor: '#ddd',
      borderRadius: 5,
      padding: width * 0.02,
      marginRight: width * 0.02,
    },
  });
