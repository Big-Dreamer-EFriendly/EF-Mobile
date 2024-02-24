
import React from 'react';
import { Modal, Text, View, TouchableOpacity } from 'react-native';

const SuccessModal = ({ visible, title, message, onDismiss, onConfirm }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onDismiss}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>{title}</Text>
        <Text>{message}</Text>
        <TouchableOpacity onPress={onConfirm}>
          <Text style={{ color: 'blue', marginTop: 10 }}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default SuccessModal;
