import React, { useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutModal = ({ visible, onClose, onLogout }) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Are you sure you want to log out?</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Button title="Yes" onPress={onLogout} />
          <Button title="No" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const YourComponent = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
    navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LogoutModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onLogout={handleLogout} 
      />
      <Button 
        title="Log out" 
        onPress={() => setModalVisible(true)} 
      />
    </View>
  );
};

export default YourComponent;
