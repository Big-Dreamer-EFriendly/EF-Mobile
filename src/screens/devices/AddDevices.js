import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Dimensions } from 'react-native';
// import CircleSlider from 'react-native-circle-slider';
const { width, height } = Dimensions.get('window');

const AddDevices = () => {
  const [numberOfDevices, setNumberOfDevices] = useState(0);
  const [value, setValue] = useState(0);
  const [values, setValues] = useState(0);

  const handleChange = (newValue) => {
    console.log(`Changed value ${newValue}`);
    setValue(newValue);
  };
  const decreaseDevices = () => {
    if (numberOfDevices > 1) {
      setNumberOfDevices(numberOfDevices - 1);
    }
  };

  const increaseDevices = () => {
    setNumberOfDevices(numberOfDevices + 1);
  };

  const handleChanges = (newValue) => {
    console.log(`Changed value ${newValue}`);
    setValue(newValue);
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
        <Text style={styles.title}>Add new room</Text>
        <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
      </View>
      <Text style={styles.subtitle}>Number of air-conditioners</Text>

      <View style={styles.deviceControlContainer}>
        <TouchableOpacity style={[styles.deviceControlButton, styles.decreaseButton]} onPress={decreaseDevices}>
          <Text style={styles.deviceControlButtonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.deviceCountInput, styles.countSquare]}
          value={numberOfDevices.toString()}
          keyboardType="numeric"
          editable={false}
        />
        <TouchableOpacity style={[styles.deviceControlButton, styles.increaseButton]} onPress={increaseDevices}>
          <Text style={styles.deviceControlButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtemperature}>The temperature you usually use</Text>

      {/* <CircleSlider
        value={values}
        onValueChange={handleChanges}
        strokeWidth={8}
        dialWidth={10}
        gap={2}
        btnRadius={12}
        meterColor="#C0CCDA"
        textColor="#6B7C93"
      /> */}
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
    marginTop: height * 0.02,
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  subtitle: {
    fontSize: 24,
    color: 'black',
    marginLeft: 30,
    marginTop: height * 0.04,
  },
  subtemperature: {
    fontSize: 24,
    color: 'black',
    marginTop: height * 0.04,
    marginLeft: width * 0.0004,
  },
  icon: {
    width: 34,
    height: 34,
  },
  button: {
    backgroundColor: 'orange',
    width: 154,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.03,
    marginLeft: width * 0.25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  deviceControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginLeft: width * 0.2,
  },
  deviceControlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, // Increase border thickness
    borderColor: 'orange',
  },
  decreaseButton: {
    marginRight: width * 0.01,
  },
  increaseButton: {
    marginLeft: 10,
  },
  deviceControlButtonText: {
    fontSize: 24,
    color: 'orange',
  },
  deviceCountInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    textAlign: 'center',
    marginHorizontal: 10,
    fontSize: 18,
    color: 'black',
  },
  countSquare: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default AddDevices;


