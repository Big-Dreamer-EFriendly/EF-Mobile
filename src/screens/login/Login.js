import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions
} from 'react-native';
import { Formik } from 'formik';
import { Signup_Schema } from '../register/Validation';
import useLogin from '../../hooks/useLogin';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const passwordRef = useRef();
  const { handleLogin } = useLogin({ navigation });
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Signup_Schema}
      onSubmit={values => {
        console.log(values);
        setTimeout(() => {
          let account = {
            email: values.email,
            password: values.password,
          };
          handleLogin(account);
        }, 100);
      }}>
      {({ errors, touched, handleChange, handleBlur, values, handleSubmit }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
          <Text style={styles.name}>Welcome !</Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.contentLogin}>
              <View style={styles.textInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  placeholderTextColor={'rgba(15, 48, 73, 0.7)'}
                  enterKeyHint={'next'}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={styles.errorText}>* {errors.email}</Text>
                ) : null}

                <View style={styles.passwordContainer}>
                  <TextInput
                    ref={passwordRef}
                    style={styles.passwordInput}
                    placeholder="Enter Password"
                    placeholderTextColor={'rgba(15, 48, 73, 0.7)'}
                    enterKeyHint={'done'}
                    onSubmitEditing={() => passwordRef.current?.clear()}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={!showPassword}
                  />
                  {errors.password && touched.password ? (
                    <Text style={styles.errorText}>* {errors.password}</Text>
                  ) : null}
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
                    <Image source={require("../../assets/Show.png")} style={styles.eyeIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}>
                <Text style={styles.loginButtonText}> Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.facebookButton}>
                  <Image source={require("../../assets/fb.png")} style={styles.icon} />
                  <Text style={styles.buttonText}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton}>
                  <Image style={styles.icon} source={require("../../assets/google.png")} />
                  <Text style={styles.buttonText}>Google</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.dontHaveAccount}>Don't have an account? 
              <Text style={styles.signInText} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.6, 
    height: height * 0.16,  
  },
  name: {
    fontSize: width * 0.08,  
    fontWeight: 'bold',
    color: 'rgba(255, 138, 30, 1)',
    marginBottom: height * 0.02
  },
  contentLogin: {
    width: width * 0.8,  
    marginTop: height * 0.02,  
  },
  textInput: {
    marginBottom: height * 0.02,  
  },
  input: {
    color: 'black',
    height: height * 0.075,  
    paddingLeft: width * 0.04,  
    backgroundColor: 'white',
    borderRadius: width * 0.045,  
    marginBottom: height * 0.03, 
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.075,  
    backgroundColor: 'white',
    borderRadius: width * 0.045,  
    marginBottom: height * 0.02,  
    color: 'black',
    paddingLeft: width * 0.04,  
    backgroundColor: 'white',
    marginBottom: height * 0.02, 
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
  passwordInput: {
    flex: 1,
    color: 'black',
  },
  eyeIconContainer: {
    padding: width * 0.02,  
  },
  eyeIcon: {
    width: width * 0.05,  
    height: width * 0.05,  
  },
  loginButton: {
    backgroundColor: 'rgba(255, 138, 30, 1)',
    padding: width * 0.03,  
    borderRadius: width * 0.04,  
    alignItems: 'center',
    marginBottom: height * 0.02,  
    marginHorizontal: width * 0.2
  },
  loginButtonText: {
    color: 'white',
    fontSize: width * 0.05,  
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,  
  },
  facebookButton: {
    backgroundColor: 'white',
    padding: width * 0.03,  
    borderRadius: width * 0.04,  
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginRight: width * 0.06,  
    height: height * 0.06, 
    borderColor: "#DCDCDC",
    borderWidth: width * 0.002
 
    
  },
  googleButton: {
    backgroundColor: 'white',
    padding: width * 0.03,  
    borderRadius: width * 0.04,  
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: height * 0.06,  
    borderWidth: width * 0.002,
    borderColor: "#DCDCDC"

  },
  icon: {
    width: width * 0.1,
    height: height * 0.05
  },

  buttonText: {
    color: '#0F3049',
    fontSize: width * 0.04,  
    fontWeight: 'bold',
    marginLeft: width * 0.01
  },
  forgotPassword: {
    color: 'rgba(15, 48, 73, 0.7)',
    alignSelf: 'center',
    fontSize: width * 0.04,  
    marginBottom: height * 0.04,  
  },
  dontHaveAccount: {
    color: 'rgba(15, 48, 73, 0.7)',
    fontSize: width * 0.04,  
    alignSelf: 'center',
  },
  signInText: {
    color: '#0F3049',
    fontWeight: 'bold',
  },
});


export default Login;
