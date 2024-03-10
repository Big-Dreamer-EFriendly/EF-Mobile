import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
  Dimensions
} from 'react-native';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import { Signup_Schema } from './Validation';
import useRegister from '../../hooks/useRegister';
import DropdownComponent from '../../components/dropdown/DropdownComponent';


const {width, height} = Dimensions.get('window');
const Register = ({ navigation }) => {
  const { mutationRegister } = useRegister({ navigation });
  const inputRef = useRef();
  const [selectedProvince, setSelectedProvince] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        address: '',
        member: '',
      }}
      validationSchema={Signup_Schema}
      onSubmit={(values) => {
        console.log('Form Data:', values);
        setTimeout(() => {
          let account = {
            name: values.name,
            email: values.email,
            password: values.password,
            address: selectedProvince,
            member: values.member,
          };
          mutationRegister.mutate(account);
        }, 100);
      }}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        values,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.registercContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.viewLogo}>
                <Text style={styles.title}>Create new account</Text>
              </View>
                <View style={styles.textInput}>
                  <Text style={styles.label}>Full Name</Text>

                  <View style={styles.inputContainer}>
                    <Image
                      source={require('../../assets/user.png')}
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Your Name"
                      placeholderTextColor={'#999999'}
                      enterKeyHint={'next'}
                      onSubmitEditing={() => inputRef.current?.focus()}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  </View>
                  {errors.name && touched.name ? (
                    <Text style={styles.errorText}>* {errors.name}</Text>
                  ) : null}

                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Image
                      source={require('../../assets/email.png')}
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Your Email"
                      placeholderTextColor={'#999999'}
                      enterKeyHint={'next'}
                      onSubmitEditing={() => inputRef.current?.focus()}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>
                  {errors.email && touched.email ? (
                    <Text style={styles.errorText}>* {errors.email}</Text>
                  ) : null}

                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Image
                      source={require('../../assets/password.png')}
                      style={styles.icon}
                    />
                    <TextInput
                      ref={inputRef}
                      style={styles.input}
                      placeholder="Enter Your Password"
                      placeholderTextColor={'#999999'}
                      secureTextEntry={!showPassword}
                      enterKeyHint={'done'}
                      onSubmitEditing={() => inputRef.current?.focus()}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Icon
                      name={showPassword ? 'eye' : 'eye-off'} size={20} color={'#999999'}/>
                 
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password ? (
                    <Text style={styles.errorText}>* {errors.password}</Text>
                  ) : null}

                  <Text style={styles.label}>Province</Text>
                  <DropdownComponent onProvinceChange={handleProvinceChange} />

                  <Text style={styles.label}>Family Members</Text>
                  <View style={styles.inputContainer}>
                    <Image
                      source={require('../../assets/member.png')}
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Number of Family Members"
                      placeholderTextColor={'#999999'}
                      keyboardType="numeric"
                      enterKeyHint={'done'}
                      onSubmitEditing={() => inputRef.current?.focus()}
                      onChangeText={handleChange('member')}
                      onBlur={handleBlur('member')}
                      value={values.member.toString()}
                    />
                  </View>
                  {errors.member && touched.member ? (
                    <Text style={styles.errorText}>* {errors.member}</Text>
                  ) : null}
                </View>
                <View style={styles.viewFooter}>
                  <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.textStartBtn}>Sign Up</Text>
                  </TouchableOpacity>
                  <View style={styles.transforContainer}>
                    <Text style={styles.textTransfor}>
                      Already have an account?
                    </Text>
                    <Text
                      style={styles.linkTransfor}
                      onPress={() => navigation.navigate('Login')}
                    >
                      Sign In
                    </Text>
                  </View>
                </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  registercContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  viewLogo: {
    marginTop: height * 0.04,
    marginBottom: height * 0.03,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#0F3049'
  },
  
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.005,
    color: '#0F3049',
  },
  input: {
    fontSize: width * 0.035,
    color: 'black',
    width: width * 0.64
  },
  errorText: {
    color: 'red',
    marginBottom: height * 0.01,
  },
  viewFooter: {
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#FF8A1E',
    paddingVertical: height * 0.02,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
    marginTop: height * 0.01
  },
  textStartBtn: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold'
  },
  textTransfor: {
    marginTop: height * 0.01,
    fontSize: width * 0.04,
    color: 'rgba(15, 48, 73, 0.7)'
    },
  linkTransfor: {
    marginTop: height * 0.01,
    marginLeft: 5,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#0F3049',
  },
  transforContainer: {
    flexDirection: 'row'
  },
  inputContainer: {
    height: height * 0.07,
    width: width * 0.8,
    paddingVertical: 0,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: 'rgba(217, 217, 217, 0.25)',
    borderRadius: 17,
    color: 'black',
    flexDirection: 'row',
    alignItems: 'center'
   },
   icon: {
    width: 20,
    height: 20
   },
   eyeIcon: {
    width: 20,
    height: 20,
  },
});

export default Register;
