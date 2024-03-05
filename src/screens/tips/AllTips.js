import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AllTips = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
        </TouchableOpacity>
        <Text style={styles.title}>Tips</Text>
        <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Use ceiling fans instead of air conditioning
            when weather permits.
          </Text>
          <View style={styles.newLabel}>
              <Text style={styles.newLabelText}>New</Text>
            </View>
          <Image source={require('../../assets/fan.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: width * 0.06,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.055,
    color: '#0F3049',
    fontWeight: '700',
  },
  iconback: {
    width: width * 0.02,
    height: height * 0.02,
  },
  icon: {
    width: width * 0.055,
    height: height * 0.03,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 360,
    height: 80,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 13,
    color: '#000000',
    marginRight:width * 0.04,
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginTop: height * 0.03,
    marginLeft:'auto',
  },
  newLabel: {
    marginBottom: height * 0.05,
  },
  newLabelText: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold',
    
  },
});

export default AllTips;
