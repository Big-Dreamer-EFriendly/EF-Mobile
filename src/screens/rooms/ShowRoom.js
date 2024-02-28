import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
const { width, height } = Dimensions.get('window');

const ShowRoom = () => {
    const [toggleState, setToggleState] = useState(false);

    const toggleButton = () => {
        setToggleState(!toggleState);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
                <Text style={styles.title}>Add new room</Text>
                <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity >
                    <View style={styles.button}>
                        <Image source={require('../../assets/livingroom.png')} style={styles.roomImage} />
                        <Text style={styles.roomText}>Living Room</Text>
                        <Text style={styles.subText}>Monthly Electric Consumtion</Text>
                        <Text style={styles.zeroWhText}>0 KWh</Text>
                        <Text style={styles.moneysubText}>Monthly Bill Consumtion</Text>
                        <Text style={styles.moneyWhText}>0 VND</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.toggleContainer}>
                    <ToggleSwitch
                        isOn={toggleState}
                        onColor="green"
                        offColor="gray"
                        size="larg"
                        onToggle={toggleButton}
                    />
                </View>
            </View>



        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    title: {
        fontSize: 24,
        color: 'black',
        marginBottom: height * 0.005
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#007bff',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 6,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: height * 0.04,
    },
    roomImage: {
        width: 50,
        height: 50,
        marginRight: width *0.01,
        marginBottom : height *0.1
    },
    roomText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 'auto',
        marginBottom : height *0.1
    },
    toggleButton: {
        backgroundColor: '#dcdcdc',
        borderRadius: 15,
        width: 60,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleActive: {
        backgroundColor: '#28a745',
    },
    toggleText: {
        color: '#ffffff',
    },
    cardContainer: {
        position: 'relative',
    },
    toggleContainer: {
        position: 'absolute',
        top: height * 0.07,
        right: height * 0.02,
    },
    subText: {
        fontSize: 18,
        color: 'black',
        marginTop: height * 0.02,
        marginBottom: height * 0.007,
        left: 238

    },
    zeroWhText: {
        fontSize: 22,
        color: 'orange',
        left: 260,
        marginBottom: height * 0.005,
        marginTop: height * 0.02,
        fontWeight:'bold'
    },

    moneysubText: {
        fontSize: 18,
        color: 'black',
        marginTop: height * 0.1,
        right: width *0.15,

    },
    moneyWhText: {
        fontSize: 22,
        color: 'rgba(15, 48, 73, 1)',
        marginRight: width *0.01,
        marginTop:  height * 0.1,
        fontWeight:'bold'
    },
});

export default ShowRoom;
