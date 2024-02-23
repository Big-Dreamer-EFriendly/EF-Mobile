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
import { Ionicons } from '@expo/vector-icons'; 
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = async () => {
    try {
      const response = await fetch('https://645de9688d08100293f1eb54.mockapi.io/bill');
      const data = await response.json();
  
      const user = data.find((item) => item.email === email && item.password === password);
  
      if (user) {
        console.log('Login successful');
        Alert.alert('Login successful', 'Let order');
        navigation.navigate('MyTab');
      } else {
        console.log('Invalid email or password', email);
        Alert.alert('Login Failed', 'Wrong email or password');
      }
    } catch (error) {
      console.log('Error occurred while logging in:', error);
      Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.name}>Welcome !</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword} 
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
            <Image source={require("../../assets/Show.png")} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.facebookButton}>
            <Image source={require("../../assets/fb.png")} style={styles.icon} />
            <Text style={styles.buttonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.googleButton}>
            <Image style={styles.gg} source={require("../../assets/google.png")} />
            <Text style={styles.buttonText}>Google</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Forgotpw')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.dontHaveAccount}>Don't have an account? <Text style={styles.signInText}>Sign Up</Text></Text>
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
  logo: {
    position: "absolute",
    top: 50, // Adjust this value to align it vertically
    width: 220, // Adjust this value as needed
    height: 150, // Adjust this value as needed
  },
  content: {
    width: 320,
    height: 300,
    marginTop: -950,
    position: "relative",
  },
  name: {
    top: 180, // Adjust this value to align it vertically
    fontSize: 40,
    fontWeight: "bold",
    color: "rgba(255, 138, 30, 1)",
  },
  input: {
    top: 210, // Adjust this value to align it vertically
    height: 60,
    borderColor: "#DCDCDC",
    marginBottom: 15,
    paddingLeft: 14,
    width: 330,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
          width: 0,
          height: 2,
    },
    shadowOpacity: 1, 
    shadowRadius: 4, 
    elevation: 5,
  },
  loginButton: {
    backgroundColor: "rgba(255, 138, 30, 1)",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    top: 220, // Adjust this value to align it vertically
    width: 180,
    height: 50,
    marginLeft: 5
  },
  loginButtonText: {
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
  facebookButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    left: 20,
    alignItems: "center",
    flex: 1,
    marginRight: 70,
    top: 300, // Adjust this value to align it vertically
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row", 
  },
  googleButton: {
    backgroundColor: "white",
    padding: 19,
    borderRadius: 15,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    columnGap: 14,
    top: 300, // Adjust this value to align it vertically
    height: 60,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 30, 
    height: 30, 
    marginRight: 10, 
  },
  gg: {
    width:30,
    height: 30
  },
  forgotPassword: {
    color: "grey",
    alignSelf: "center",
    marginTop: 190, // Adjust this value to align it vertically
    fontSize: 16,
    position: "absolute",
  },
  dontHaveAccount: {
    color: "grey",
    marginTop: 340,
    fontSize: 16,
    alignSelf: "center",
  },
  signInText: {
    color: "blue",
    fontWeight: "bold",
  },
  passwordContainer: {
    top: 210,
    flexDirection: 'row',
    alignItems: 'center',
    width: 330,
    height: 60,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1, 
    shadowRadius: 4, 
    elevation: 5,
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 14,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  
});

export default  LoginScreen;