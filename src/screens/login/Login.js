// Formik x React Native example
import React, {useRef} from 'react';
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
} from 'react-native';
import {Formik} from 'formik';
import { Signup_Schema } from '../register/Validation';
import useLogin from '../../hooks/useLogin';

const Login = ({navigation}) => {
  const passwordRef = useRef();
  const {handleLogin} = useLogin({navigation});

  return (
    <Formik
      initialValues={{email: '', password: ''}}
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
      {({errors, touched, handleChange, handleBlur, values, handleSubmit}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          {/* <Image
            style={styles.backgroundImage}
            source={require('../assets/images/headerImage.jpg')}
          /> */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.contentLogin}>
              <View style={styles.itemLogo}>
                {/* <Image
                  source={require('../assets/images/logo-bonsai-cay-canh-28-1030x1030-removebg-preview.png')}
                  style={styles.logo}
                /> */}
                <Text style={styles.textLogo}>BonSai Application</Text>
              </View>
              <View>
                <Text style={styles.textWelcome}>Welcome Back</Text>
                <Text style={styles.textLogin}>Log in to your account</Text>
              </View>
              <View style={styles.textInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  placeholderTextColor={'black'}
                  enterKeyHint={'next'}
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={styles.errorText}>* {errors.email}</Text>
                ) : null}
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder="Enter Password"
                  placeholderTextColor={'black'}
                  enterKeyHint={'done'}
                  onSubmitEditing={() => passwordRef.current?.clear()}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text style={styles.errorText}>* {errors.password}</Text>
                ) : null}
              </View>
              <Text style={styles.forgetPass}>Forgot Password?</Text>
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleSubmit}>
                <Text style={styles.textLgoin}>Log In</Text>
              </TouchableOpacity>
              <View style={styles.signupNav}>
                <Text style={styles.textAccount}>Don't have an account?</Text>
                <Text
                  style={styles.textSignup}
                  onPress={() => navigation.navigate('Register')}>
                  Signup
                </Text>
              </View>
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
  },
  logo: {
    width: 150,
    height: 150,
  },
  itemLogo: {
    alignItems: 'center',
    marginTop: -30,
  },
  textLogo: {
    color: '#98C13F',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -30,
  },
  textWelcome: {
    color: '#000',
    fontSize: 34,
    fontWeight: 'bold',
  },
  textLogin: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contentLogin: {
    paddingHorizontal: 38,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    // marginTop: 10,
    borderBottomWidth: 1.221,
    borderBottomColor: '#063',
    color: '#000',
    paddingLeft: 15,
  },
  textInput: {
    gap: 10,
    marginTop: 20,
  },
  forgetPass: {
    marginTop: 5,
    color: '#0D986A',
    fontSize: 14,
  },
  buttonLogin: {
    backgroundColor: '#0D986A',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 15,
    marginHorizontal: 30,
  },
  textLgoin: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
  },
  signupNav: {
    flexDirection: 'row',
    textAlign: 'center',
    paddingLeft: 50,
    marginTop: 5,
  },
  textAccount: {
    color: '#000',
    fontSize: 14,
  },
  textSignup: {
    color: '#0D986A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    top: 0,
    left: 0,
    width: '100%',
    height: '80%',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    margin: 0,
    padding: 0,
  },
});

export default Login;
