import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Platform, Dimensions, ActivityIndicator} from "react-native";
import { Formik } from "formik";
import useForgotPassword from "../../hooks/useForgotPassword";
import * as Yup from "yup"; 
import LoadingModal from "../../components/modal/LoadingModal";

const ForgotPassword_Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const { width, height } = Dimensions.get('window');

const Forgetpw = ({ navigation }) => {

  const { handleForgotPassword, isLoading, isError } = useForgotPassword({navigation});

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgotPassword_Schema}
      onSubmit={values => {
        setTimeout(() => {
          let email = {
            email: values.email
          };
          handleForgotPassword(email);
        }, 100);
      }}
    >
      {({ handleChange, handleSubmit, values,errors,touched }) => (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <Image source={require("../../assets/lock.png")} style={styles.lock} />
          <Text style={styles.name}>Forget password</Text>
          <Text style={styles.description}>
            Provide your account email to {'\n'} reset your password
          </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'#999999'}
              onChangeText={handleChange("email")}
              value={values.email}
            />
             {errors.email && touched.email ? (
                  <Text style={styles.errorText}>* {errors.email}</Text>
                ) : null}
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.nextButtonText}>Reset Password</Text>
              </TouchableOpacity>
              <LoadingModal visible={isLoading} /> 
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  lock: {
    width: width * 0.5, 
    height: height * 0.12, 
  },
  name: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "rgba(255, 138, 30, 1)",
    textAlign: "center",
    marginTop: height * 0.05, 
  },
  description: {
    fontSize: width * 0.04,
    textAlign: "center",
    color: "rgba(15, 48, 73, 1)",
    marginTop: height * 0.02, 
    marginBottom: height * 0.04
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: 'black',
    height: height * 0.075,  
    width: width * 0.8,
    paddingLeft: width * 0.04,  
    backgroundColor: 'white',
    borderRadius: width * 0.045,  
    marginBottom: height * 0.01, 
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
          width: 0,
          height: 2,
    },
    shadowOpacity: 1, 
    shadowRadius: 4, 
    elevation: 5,
  },
  separator: {
    width: width * 0.9, 
    borderBottomWidth: 1,
    borderBottomColor: "rgba(15, 48, 73, 1)",
    marginVertical: height * 0.01, 
  },
  nextButton: {
    backgroundColor: "rgba(255, 138, 30, 1)",
    padding: 13,
    borderRadius: width * 0.045,
    alignItems: "center",
    marginTop: height * 0.04, 
    width: width * 0.5, 
  },
  nextButtonText: {
    color: "white",
    fontSize: width * 0.05,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: 'red',
    marginRight: width * 0.48

  }
});
export default Forgetpw;
