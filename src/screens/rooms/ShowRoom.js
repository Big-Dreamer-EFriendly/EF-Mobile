import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useDeleteRoom from '../../hooks/useDeleteRoom';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList, SafeAreaView, ActivityIndicator,RefreshControl } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import useGetRoom from '../../hooks/useGetRoom';

const { width, height } = Dimensions.get('window');

const ShowRoom = ({ navigation }) => {
  const [toggleState, setToggleState] = useState(false);
  const toggleButton = () => {
    setToggleState(!toggleState);
  };
  const { handleDeleteRoom, isLoading: isDeleting } = useDeleteRoom();
  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  const { data, isFetching } = useGetRoom();

  const renderItem = ({ item }) => (
    <View style={styles.button}>
      <TouchableOpacity onPress={() => navigation.navigate('DetailRoom',{roomId :item._id, name: item.name, floor: item.floor, numberOfDevices: item.numberOfDevices})}>
        <Text style={styles.roomText}>{item.name}</Text>
        <View style={styles.column}>
          <Text style={styles.labelText}>Monthly Electric Consumption</Text>
          <Text style={styles.valueText}>0 KWh</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.labelText}>Monthly Bill Consumption</Text>
          <Text style={styles.valueText}>0 VND</Text>
        </View>

        <Text style={styles.labelText}>Floor: {item.floor}</Text>
        <View style={styles.column2}>
          <Text style={styles.numberDevice}>{item.numberOfDevices} devices</Text>
          <TouchableOpacity style={[styles.numberDevice, {marginLeft: width * 0.5}]} onPress={() => navigation.navigate('EditRoom', { roomId: item._id, name: item.name, floor: item.floor, numberOfDevices: item.numberOfDevices })}>
            <Icon name='square-edit-outline' color={'#FA812E'} size={20}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.numberDevice, {marginLeft: width * 0.02}]} onPress={() => handleDeleteRoom(item._id)} disabled={isDeleting}>
            <Icon name='delete' color={'grey'} size={20}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.toggleContainer}>
        <ToggleSwitch
          isOn={toggleState}
          onColor="#42CFB6"
          offColor="#D9D9D9"
          disabled={true}
          size="small"
          onToggle={toggleButton}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
        </TouchableOpacity>
        <Text style={styles.title}>Your rooms</Text>
        <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
      </View>
      {isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : data ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        ListHeaderComponent={ 
        <TouchableOpacity style={styles.buttonPlus} onPress={() => navigation.navigate("Add room")}>
        <Icon name={'plus-circle'}  color={'white'} size={40} />
        <Text style={{color: 'white', fontWeight: '600'}}>Add new room</Text>
      </TouchableOpacity>}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}

        />
      ) : (
        <Text style={styles.title}>No data available</Text>
      )}
     
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
    marginBottom: height * 0.09
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
    marginBottom: height * 0.02
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
    fontSize: width * 0.03,
    color: 'black',
  },

  buttonPlus: {
    // justifyContent: 'center',
    alignItems:'center',
    gap: width * 0.01,
    flexDirection:'row',
    backgroundColor:'#42CFB6',
    marginLeft: width * 0.5,
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.01,
    paddingVertical: height * 0.005, 
    marginTop: height * 0.015
  
  },
  plus: {
    fontSize: width * 0.06
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: height * 0.015,
    justifyContent: 'space-between'
  },
  column2: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: height * 0.015,
  },
  labelText: {
    fontSize: width * 0.04,
    color: 'black',
    
  },
  valueText: {
    fontSize: width * 0.04,
    color: '#FA812E',
    fontWeight: '500',
    marginLeft: width * 0.08
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberDevice: {
    color: '#42CFB6',
    fontWeight: '600',
    marginTop: height * 0.015,
    marginBottom: height * 0.01,
    fontSize: width * 0.04
  },
  editButton: {
    color: 'black'
  }
});

export default ShowRoom;



