import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const InputWithIcon = ({ icon, placeholder, value, onChangeText, keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      {icon && <Image source={icon} style={styles.inputIcon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaaaaa"
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputWithIcon;

const styles = StyleSheet.create({
  inputContainer: {
    height: height * 0.075,
    paddingLeft: width * 0.04,
    backgroundColor: 'white',
    borderRadius: width * 0.045,
    marginBottom: height * 0.01,
    borderColor: '#DCDCDC',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: height * 0.02

  },
  inputIcon: {
    width: width * 0.045,
    height: height *0.03,
    marginRight: width *0.01,

  },
  input: {
    flex: 1,
    color: 'black',
    borderWidth: 0, 
  },
});
