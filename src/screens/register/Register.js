import React from 'react';
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
  Alert,
} from 'react-native';
import { useFormik } from 'formik';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Signup_Schema } from './Validation';

const Register = ({ navigation }) => {
  const handleRegister = async (data) => {
    if (
      data.name === '' ||
      data.email === null ||
      data.phone === null ||
      data.password === ''
    ) {
      Alert.alert('Error', 'Fill out complete information!');
    } else {
      try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('registerInfo', jsonValue);
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: null,
      phone: null,
      password: '',
    },
    validationSchema: Signup_Schema,
    onSubmit: (values) => {
      setTimeout(() => {
        let data = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
        };
        handleRegister(data);
      }, 200);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentLogin}>
          <View style={styles.itemLogo}>
            <Text style={styles.textLogo}>EFriendly Application</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.input}
              placeholder="Enter User Name"
              placeholderTextColor={'black'}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <Text style={styles.errorText}>* {formik.errors.name}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              keyboardType="numeric"
              placeholderTextColor={'black'}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <Text style={styles.errorText}>* {formik.errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              placeholderTextColor={'black'}
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <Text style={styles.errorText}>* {formik.errors.phone}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor={'black'}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <Text style={styles.errorText}>* {formik.errors.password}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.textLgoin}>Next</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
});

export default Register;
