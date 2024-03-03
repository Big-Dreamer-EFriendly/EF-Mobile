import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Formik } from 'formik';
import useEditRoom from '../../hooks/useEditRoom'; // Import your useEditRoom hook
import InputWithIcon from '../../components/inputWithIcon/InputWithIcon';
import * as Yup from 'yup';

const { width, height } = Dimensions.get('window');

const EditRoom = ({ route, navigation }) => {
  const { roomId, name,floor } = route.params; // Assuming you pass roomId and initialData from navigation params
  const { handleEditRoom } = useEditRoom({navigation}); // Import your useEditRoom hook

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Room Name is required'),
    floor: Yup.number().required('Floor is required').positive('Floor must be positive'),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: name,
          floor: floor,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
            console.log(values);
          handleEditRoom(roomId, values); 
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
                <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
              </TouchableOpacity>
              <Text style={styles.title}>Edit Room</Text>
              <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
            </View>

            <InputWithIcon
              icon={require('../../assets/iconroom.png')}
              placeholder="Room Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              keyboardType="default"
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <InputWithIcon
              icon={require('../../assets/iconfloor.png')}
              placeholder="Floor"
              value={values.floor}
              onChangeText={handleChange('floor')}
              onBlur={handleBlur('floor')}
              keyboardType="numeric"
            />
            {touched.floor && errors.floor && (
              <Text style={styles.errorText}>{errors.floor}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: width * 0.06,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.055,
    color: '#0F3049',
    fontWeight: '700',
  },
  iconback: {
    width: width * 0.02,
    height: height * 0.02,
  },
  icon: {
    width: width * 0.055,
    height: height * 0.03,
  },
  button: {
    backgroundColor: '#FF8A1E',
    width: width * 0.35,
    height: height * 0.07,
    borderRadius: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.25,
    marginTop: height * 0.01
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: '700'
  },
  errorText: {
    color: 'red',
    marginLeft: width * 0.03,
    marginBottom: height * 0.01
  },
});

export default EditRoom;