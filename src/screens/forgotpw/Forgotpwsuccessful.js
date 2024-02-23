import React, { useState } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Forgotpwsuccessful = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Password Updated</Text>
      <Image source={require("../../assets/iconsuccessful.png")} style={styles.icon} />
      <Text style={styles.description}>Your new password has been sent{'\n'} to your email</Text>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    position: "absolute",
    top: 260,
    width: 100,
    height: 100,
  },
  name: {
    top: 200,
    fontSize: 35,
    fontWeight: "bold",
    color: "rgba(255, 138, 30, 1)",
    textAlign: "center",
  },
  description: {
    top: 330,
    fontSize: 18,
    textAlign: "center",
    color: "rgba(15, 48, 73, 1)",
  },
  loginButton: {
    backgroundColor: "rgba(255, 138, 30, 1)",
    padding: 13 ,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 360,
    width: 160,
    height: 55,
    marginLeft: 5,
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign:"center",
    alignItems: 'center',
  },
});

export default Forgotpwsuccessful;
