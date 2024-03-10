import React from "react";
import { useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Introduction = ({ navigation }) => {
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('user');
      if (userToken) {
        navigation.navigate('BottomTabs');
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };
 
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/appname.png")} style={styles.appname} />
      <Text style={styles.name}>Welcome</Text>
      <Image source={require("../../assets/introduction-img.png")} style={styles.introduction} />
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText} >Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Register')} >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  appname: {
    width: width * 0.7,
    height: height * 0.09,
  },
  introduction: {
    marginTop: height * 0.02,
    width: width * 0.9,
    height: height * 0.4,
  },
  name: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: "rgba(255, 138, 30, 1)",
  },
  loginButton: {
    backgroundColor: "rgba(255, 138, 30, 1)",
    padding: width * 0.03,
    borderRadius: width * 0.05,
    alignItems: "center",
    marginTop: height * 0.03,
    width: width * 0.4,
    height: height * 0.07,
  },
  loginButtonText: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "rgba(15, 48, 73, 1)",
    padding: width * 0.03,
    borderRadius: width * 0.05,
    alignItems: "center",
    marginTop: height * 0.02,
    width: width * 0.4,
    height: height * 0.07,
  },
  signupButtonText: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});

export default Introduction;
