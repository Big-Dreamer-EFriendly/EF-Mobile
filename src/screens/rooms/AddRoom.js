import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';

const InputWithIcon = ({ icon, placeholder, value, onChangeText, keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      <Image source={icon} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaaaaa"
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType} // Thêm keyboardType ở đây
      />
    </View>
  );
};

const AddRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [floor, setFloor] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
        <Text style={styles.title}>Add new room</Text>
        <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
      </View>

      <View style={{ marginTop: 40 }}>
        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Name</Text>
        </View>
        <InputWithIcon
          icon={require('../../assets/iconroom.png')}
          placeholder="Room Name"
          value={roomName}
          onChangeText={setRoomName}
          keyboardType="default" // Đặt keyboardType thành "default" cho ô input tên phòng
        />

        <View style={styles.inputLabelContainer}>
          <Text style={styles.inputLabel}>Floor</Text>
        </View>
        <InputWithIcon
          icon={require('../../assets/iconfloor.png')}
          placeholder="Floor"
          value={floor}
          onChangeText={setFloor}
          keyboardType="numeric" // Đặt keyboardType thành "numeric" cho ô input tầng
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  icon: {
    width: 34,
    height: 34,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Màu xám
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 354,
    height: 55,
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
    borderWidth: 0, // Loại bỏ viền
  },
  button: {
    backgroundColor: 'orange',
    width: 154,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputLabelContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
});

export default AddRoom;
