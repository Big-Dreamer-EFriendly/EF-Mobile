import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';

const Register = () => {
  return (
    <Formik
      initialValues={{ email: '' }} 
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formikProps) => (
        <View>
          <Text>Create new account</Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#8b9cb5"
            keyboardType="name"
            onChangeText={formikProps.handleChange('name')}
            onBlur={formikProps.handleBlur('name')}
            value={formikProps.values.email}
          />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#8b9cb5"
            keyboardType="email-address"
            onChangeText={formikProps.handleChange('email')}
            onBlur={formikProps.handleBlur('email')}
            value={formikProps.values.email}
          />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#8b9cb5"
            keyboardType="email-address"
            onChangeText={formikProps.handleChange('email')}
            onBlur={formikProps.handleBlur('email')}
            value={formikProps.values.email}
          />
        </View>
      )}
    </Formik>
  );
};

export default Register;
