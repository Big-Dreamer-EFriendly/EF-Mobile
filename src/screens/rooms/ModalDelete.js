import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

const ModalDelete = ({ isVisible, onClose, onConfirm }) => {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Icon name='exclamation-circle' color={'#FF8A1E'} size={50} />

                    <Text style={styles.modalTitle}>Are you sure you want to delete this device?</Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={[styles.modalButtonText, { backgroundColor: 'gray', borderColor: 'gray' }]}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onConfirm()}>
                            <Text style={[styles.modalButtonText, { backgroundColor: '#FF8A1E', borderColor: '#FF8A1E', color: 'white' }]}>Yes</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalDelete;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: width * 0.04,
        width: width * 0.8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.6,
    },
    modalButtonText: {
        fontSize: width * 0.04,
        color: 'white',
        borderRadius: width * 0.02,
        borderWidth: 1,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.005
    },
});
