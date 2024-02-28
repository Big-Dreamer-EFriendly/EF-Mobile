import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList, SafeAreaView } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import useGetRoom from '../../hooks/useGetRoom';

const { width, height } = Dimensions.get('window');

const ShowRoom = ({ navigation }) => {
  const [toggleState, setToggleState] = useState(false);
  const toggleButton = () => {
    setToggleState(!toggleState);
  };

  const { data, isFetching } = useGetRoom();

  const renderItem = ({ item }) => (
    <View style={styles.button}>
      <TouchableOpacity onPress={() => console.log(`Pressed on ${item.name}`)}>
        <Text style={styles.roomText}>{item.name}</Text>
        <Text style={styles.subText}>Floor: {item.floor}</Text>
      </TouchableOpacity>
      <View style={styles.toggleContainer}>
        <ToggleSwitch
          isOn={toggleState}
          onColor="#42CFB6"
          offColor="#D9D9D9"
          size="small"
          onToggle={toggleButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
        <Text style={styles.title}>Your rooms</Text>
        <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
      </View>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : data ? (
        <FlatList
          style = {styles.flatList}
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
         
        />
      ) : (
        <Text>No data available</Text>
      )}
       <TouchableOpacity style={styles.buttonPlus} onPress={() => navigation.navigate("Add room")}>
          <Icon name={'plus-circle'} color="#42CFB6" size={40} />
        </TouchableOpacity>
    </SafeAreaView >
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
        marginBottom: height * 0.01,
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
      flatList: {
        marginBottom: height * 0.05
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
        padding: height * 0.01,
        marginTop: height * 0.03,
        marginLeft: width * 0.01,
        marginRight: width * 0.01
    },
    roomImage: {
        width: 50,
        height: 50,
        marginRight: width * 0.01,
        marginBottom: height * 0.1
    },
    roomText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 'auto',
        marginBottom: height * 0.1
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
        top: height * 0.015,
        right: height * 0.02,
    },
    subText: {
        fontSize:width * 0.03,
        color: 'black',
        marginTop: height * 0.02,
        marginBottom: height * 0.007,
    },
    zeroWhText: {
        fontSize: 22,
        color: 'orange',
        left: 260,
        marginBottom: height * 0.005,
        marginTop: height * 0.02,
        fontWeight: 'bold'
    },

    moneysubText: {
        fontSize: 18,
        color: 'black',
        marginTop: height * 0.1,
        right: width * 0.15,

    },
    moneyWhText: {
        fontSize: 22,
        color: 'rgba(15, 48, 73, 1)',
        marginRight: width * 0.01,
        marginTop: height * 0.1,
        fontWeight: 'bold'
    },
    buttonPlus: {
        position:'absolute',
        justifyContent: 'center',
        bottom: height * 0.08,
        right: width * 0.04   
    },
    plus:{
        fontSize: width * 0.06
    }
});

export default ShowRoom;




  {/* <TouchableOpacity >
                    <View style={styles.button}>
                        <Image source={require('../../assets/livingroom.png')} style={styles.roomImage} />
                        <Text style={styles.roomText}>Living Room</Text>
                        <Text style={styles.subText}>Monthly Electric Consumtion</Text>
                        <Text style={styles.zeroWhText}>0 KWh</Text>
                        <Text style={styles.moneysubText}>Monthly Bill Consumtion</Text>
                        <Text style={styles.moneyWhText}>0 VND</Text>
                    </View>
                </TouchableOpacity> */}