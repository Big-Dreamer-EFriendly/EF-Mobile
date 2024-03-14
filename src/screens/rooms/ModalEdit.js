import React from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const ModalEdit = ({ isVisible, onClose, initialTemperature, useEditDevice }) => {
    const handleSave = (values) => {
        useEditDevice(values.temperature);
        onClose();
    };
    const validationSchema = yup.object().shape({
        temperature: yup
            .number()
            .required('Temperature is required')
            .min(0, 'Temperature must be greater than or equal to 0')
    });

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Edit Temperature</Text>
                    <Formik
                        initialValues={{ temperature: initialTemperature }}
                        onSubmit={handleSave}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View>
                                <TextInput
                                    onChangeText={handleChange('temperature')}
                                    onBlur={handleBlur('temperature')}
                                    value={values.temperature}
                                    keyboardType="numeric"
                                />
                                <Button onPress={handleSubmit} title="Save" />
                            </View>
                        )}
                    </Formik>
                    <Button onPress={onClose} title="Cancel" />
                </View>
            </View>
        </Modal>
    );
};

export default ModalEdit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});