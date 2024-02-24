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
import { Formik } from "formik";
import useForgotPassword from "../../hooks/useForgotPassword";
const Forgetpw = ({ navigation }) => {
  const { handleForgotPassword, isLoading, isError } = useForgotPassword();
  const initialValues = { email: "" };
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/lock.png")} style={styles.lock} />
      <Text style={styles.name}>Forget password</Text>
      <Text style={styles.description}>
        Provide your account email to {'\n'} reset your password
      </Text>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleForgotPassword(values.email);
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                value={values.email}
              />
            </View>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
  lock: {
    position: "absolute",
    top: 130,
    width: 230,
    height: 150,
  },
  name: {
    top: 260,
    fontSize: 35,
    fontWeight: "bold",
    color: "rgba(255, 138, 30, 1)",
    textAlign: "center",
  },
  description: {
    top: 260,
    fontSize: 18,
    textAlign: "center",
    color: "rgba(15, 48, 73, 1)",
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    width: 300,
    height: 40,
    paddingHorizontal: 30,
    top: 290
  },
  eyeIconContainer: {
    padding: 10,
    top: 290,
    paddingHorizontal: 30,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  separator: {
    width: 330,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(15, 48, 73, 1)",
    marginVertical: 10,
    top: 280,
  },
  nextButton: {
    backgroundColor: "rgba(255, 138, 30, 1)",
    padding: 13 ,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 310,
    width: 160,
    height: 55,
    marginLeft: 5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign:"center",
    alignItems: 'center',
  },
});

export default Forgetpw;
