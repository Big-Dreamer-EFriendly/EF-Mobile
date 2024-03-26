import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal , Dimensions} from 'react-native';
import { Formik } from 'formik';
import useAddTips from '../../hooks/useAddTips';
import * as Yup from 'yup';

const {width, height} = Dimensions.get('window')

const AddTipsModal = ({ modalVisible, setModalVisible, updateTipsList, navigation }) => {
  const { handleAddTips } = useAddTips({ navigation });

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(1,'Title must be at least 1 character')
      .max(30, 'Title must be at most 30 characters'),
    content: Yup.string()
      .required('Content is required')
  });

  return (
    <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)} style={styles.container}>
      <View style={styles.modalContainer}>
        <Formik
          initialValues={{
            title: '',
            content: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            handleAddTips(values);
            setModalVisible(false);
            updateTipsList(values); 
            await new Promise(resolve => setTimeout(resolve, 3000));
            resetForm();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <Text style={styles.title}>Add New Tip</Text>
              <Text>Title:</Text>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                keyboardType="default"
              />
              {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
              <Text>Content:</Text>

              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Content"
                value={values.content}
                onChangeText={handleChange('content')}
                onBlur={handleBlur('content')}
                keyboardType="default"
                multiline
              />
              {touched.content && errors.content && <Text style={styles.errorText}>{errors.content}</Text>}

              <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

    modalContainer: {
      flex: 1,
      padding: 30,
    },
    title: {
      fontSize: width * 0.055,
      color: '#0F3049',
      fontWeight: '700',
      marginBottom: 20,
      margin:'auto',
      marginLeft: width * 0.25,

    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%',
    },
    multilineInput: {
      height: height * 0.2, // Set the height for multiline input
    },
    addButton: {
      backgroundColor: '#FF8A1E',
      padding: 10,
      marginLeft: width * 0.25,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent:'center',
      marginTop: height * 0.01,
      width: width * 0.3,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
  });
  
  export default AddTipsModal;
  