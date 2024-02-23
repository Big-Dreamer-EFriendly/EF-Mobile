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

const Introduction = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <Image source={require("../../assets/appname.png")} style={styles.appname} />
        <Text style={styles.name}>Welcome</Text>
        <Image source={require("../../assets/introduction-img.png")} style={styles.introduction} />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton}>
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
    justifyContent: "flex-start",
  },
  appname: {
    position: "absolute",
    top: 80, // Adjust this value to align it vertically
    width: 280, // Adjust this value as needed
    height: 70, // Adjust this value as needed
  },
  introduction: {
    position: "absolute",
    top: 230, // Adjust this value to align it vertically
    width: 360, // Adjust this value as needed
    height: 300, // Adjust this value as needed
  },
  content: {
    width: 320,
    height: 300,
    marginTop: -950,
    position: "relative",
  },
  name: {
    top: 160, // Adjust this value to align it vertically
    fontSize: 40,
    fontWeight: "bold",
    color: "rgba(255, 138, 30, 1)",
  },
  loginButton: {
    backgroundColor: "rgba(255, 138, 30, 1)",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    top: 510, // Adjust this value to align it vertically
    width: 180,
    height: 50,
    marginLeft: 5
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "rgba(15, 48, 73, 1)",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    top: 520, // Adjust this value to align it vertically
    width: 180,
    height: 50,
    marginLeft: 5
  },
  signupButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    height: 50,
  },
  
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },

});

export default  Introduction;