import React from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useEditDevice from '../../hooks/useEditDevice';
import useEditDeviceAir from '../../hooks/useEditDeviceAir';
import Widget from '../widget/Widget';

const ModalEdit = ({ isVisible, onClose, initialTemperature, deviceId ,roomId, deviceName ,navigation }) => {
    const { handleEditDeviceAir } = useEditDeviceAir({navigation}); 

    const handleSave = (values) => {
        handleEditDeviceAir({id: deviceId, temperature: parseFloat(values.temperature) }); 
        onClose();
    };

    const validationSchema = yup.object().shape({
        temperature: yup
            .number()
            .required('Temperature is required')
            .min(14, 'Temperature must be greater than or equal to 14')
            .max(35, 'Temperature must be at most 35')
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
                    <Text style={{ fontSize: 18, marginBottom: 10, color:'black'}}>Edit Temperature</Text>
                    <Formik
                    validationSchema={validationSchema}
                        initialValues={{ temperature: initialTemperature.toString() }}
                        onSubmit={handleSave}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values,errors  }) => (
                            <View>
                                <Text style={{ fontSize: 14, marginBottom: 10, color:'black' }} >Name: {deviceName}</Text>
                                <Text style={{ fontSize: 14, marginBottom: 10, color:'black' }}>Temperature:</Text>
                                <TextInput
                                    onChangeText={handleChange('temperature')}
                                    onBlur={handleBlur('temperature')}
                                    value={values.temperature}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />
                                <Text style={{ color: 'red' }}>{errors.temperature}</Text> 

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
    },
    input: {
        borderWidth: 1, // Độ dày đường viền
        borderColor: '#ddd', // Màu sắc của đường viền
        borderRadius: 5, // Độ cong của góc
        paddingHorizontal: 10, // Padding ngang
        paddingVertical: 8, // Padding dọc
        marginBottom: 10, // Khoảng cách dưới
        color:'black'
    }
});
