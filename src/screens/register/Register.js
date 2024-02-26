import React, { useRef , useState} from 'react';
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
  ScrollView
} from 'react-native';
import { Formik } from 'formik';
import { Signup_Schema } from './Validation';
import useRegister from '../../hooks/useRegister';
import DropdownComponent from '../../components/dropdown/DropdownComponent';

const Register = ({ navigation }) => {
  const { mutationRegister } = useRegister({ navigation });
  const inputRef = useRef();
  const [selectedProvince, setSelectedProvince] = useState('');

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
      {({ errors, touched, handleChange, handleBlur, values, handleSubmit }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.registercContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.viewLogo}>
                <Text style={styles.title}>Create new account</Text>
              </View>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.textInput}>
                <Text style={styles.label}>Full Name</Text>

                <View style={styles.inputContainer}>
                  <Image source={require("../../assets/user.png")} style={styles.icon} />
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
                <Image source={require("../../assets/email.png")} style={styles.icon} />
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
                <Image source={require("../../assets/password.png")} style={styles.icon} />
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder="Enter Your Password"
                  placeholderTextColor={'#999999'}
                  secureTextEntry={true}
                  enterKeyHint={'done'}
                  onSubmitEditing={() => inputRef.current?.focus()}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                </View>
                {errors.password && touched.password ? (
                  <Text style={styles.errorText}>* {errors.password}</Text>
                ) : null}

                <Text style={styles.label}>Province</Text>
                <DropdownComponent onProvinceChange={handleProvinceChange}/>

                <Text style={styles.label}>Family Members</Text>
                <View style={styles.inputContainer}>
                <Image source={require("../../assets/member.png")} style={styles.icon} />
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
                <TouchableOpacity style={styles.btnLogin} onPress={handleSubmit}>
                  <Text style={styles.textStartBtn}>Sign up</Text>
                </TouchableOpacity>
                <View style={styles.transforContainer}>
                <Text style={styles.textTransfor}>
                  Already have an account?
                </Text>
                <Text style={styles.linkTransfor} onPress={() => navigation.navigate('Login')}>Sign In</Text>
                </View>
                
              </View>
              </ScrollView>
            </View>
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
    marginTop: 35,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F3049'
  },
  textInput: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0F3049',
  },
  input: {
  
    fontSize: 16,
    color: 'black'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  viewFooter: {
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#FF8A1E',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '50%',
  },
  textStartBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  textTransfor: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(15, 48, 73, 0.7)'
    },
  linkTransfor: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F3049',
  },
  transforContainer: {
    flexDirection: 'row'
  },
  inputContainer: {
    height: 55,
    width: 320,
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
   }
});

export default Register;
