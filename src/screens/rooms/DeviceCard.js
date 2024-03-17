import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import useDeleteDevice from '../../hooks/useDeleteDevice';
import useUpdateStatus from '../../hooks/useUpdateStatus';
const { width, height } = Dimensions.get('window');

const DeviceCard = ({ device }) => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const { handleDeleteDevice } = useDeleteDevice();
    const { handleUpdateStatus } = useUpdateStatus()
    const handleEditDevice = () => {
        setIsEditModalVisible(true);
    };

    const handleDeleteDeviceOpen = () => {
        setIsDeleteModalVisible(true);
    };
    const handleToggleStatus = (status) => {
        const data = {
            id: device._id,
            isStatus: status
        };
        handleUpdateStatus(data);
    };

    return (
        <View style={styles.deviceCard}>
            <Text style={styles.deviceName}>{device.deviceData.name}</Text>
            <Text style={styles.deviceInfo}>Quantity: {device.quantity}</Text>
            {device.categoryData.name === 'Air-conditioner' && (
                <>
                    <Text style={styles.deviceInfo}>Commonly used temperature: {device.temperature}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ModalEdit
                            isVisible={isEditModalVisible}
                            onClose={() => setIsEditModalVisible(false)}
                            initialTemperature={device.temperature}
                            deviceId={device._id}
                            deviceName={device.deviceData.name}
                            roomId={device.roomData._id}
                        />
                    </View>
                </>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Switch
                        value={device.isStatus}
                        onValueChange={(value) => handleToggleStatus(value)}
                    />
                    <Text style={{ marginLeft: 10 }}>{device.isStatus ? 'ON' : 'OFF'}</Text>
                </View>
                {device.categoryData.name !== 'Air-conditioner' && (
                    <TouchableOpacity style={styles.editButton} onPress={handleDeleteDeviceOpen}>
                        <Icon name='delete-outline' color={'#FF8A1E'} size={20} />
                    </TouchableOpacity>
                )}
                {device.categoryData.name === 'Air-conditioner' && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditDevice}>
                            <Icon name='square-edit-outline' color={'#FF8A1E'} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={handleDeleteDeviceOpen}>
                            <Icon name='delete-outline' color={'#FF8A1E'} size={20} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <ModalDelete
                isVisible={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                onConfirm={() => {
                    setIsDeleteModalVisible(false);
                    handleDeleteDevice(device._id);
                }}
                device={device}
            />
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
        color: 'black'
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
