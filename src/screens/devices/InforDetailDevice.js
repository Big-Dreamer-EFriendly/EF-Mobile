import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadialSlider } from 'react-native-radial-slider';
import useGetRoom from '../../hooks/useGetRoom';
import useAddDevice from '../../hooks/useAddDevice';
import { Formik } from 'formik';
import * as Yup from 'yup';
const { width, height } = Dimensions.get('window');

const InforDetailDevice = ({ navigation }) => {
  const { handleAddDevice } = useAddDevice({ navigation });
  const { data: rooms } = useGetRoom();
  const [isLoading, setIsLoading] = useState(true);
  const [devicesData, setDevicesData] = useState('');

  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const retrieveDevicesData = async () => {
    try {
      const devicesDataString = await AsyncStorage.getItem('selectedDevice');
      const devicesData = JSON.parse(devicesDataString);
      setDevicesData(devicesData);
      setIsLoading(false);

    } catch (error) {
      console.error('Error retrieving devices data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    retrieveDevicesData();
  }, []);

  const handleRoomPress = (roomId) => {
    setSelectedRoomId(roomId);
  };

  return (
    <Formik
      initialValues={{
        deviceId: devicesData._id,
        roomId: '',
        quantity: 1,
        timeUsed: 0,
        temperature: 0
      }}
      validationSchema={Yup.object().shape({
        quantity: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
      })}
      onSubmit={(values) => {
        console.log("data",values);
        setTimeout(() => {
          let device = {
            deviceId: devicesData._id,
            roomId: selectedRoomId,
            quantity: values.quantity,
            timeUsed: 0,
            temperature: values.temperature
          };
          handleAddDevice(device);
        }, 100);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Add device')}>
                  <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
                </TouchableOpacity>
                <Text style={styles.title}>Add new device</Text>
                <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
              </View>
              <ScrollView>
                <View style={styles.cardDevice}>
                  <Image source={{uri: devicesData.imageUrl}} style={styles.deviceImage} />
                  <Text style={styles.deviceName}>{devicesData.name}</Text>
                  <Text style={styles.devicePower}>Power:{devicesData.capacity} kW</Text>
                </View>
                <View style={styles.chooseRoom}>
                  <Text style={styles.subtitle}>Select a room:</Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={rooms && rooms.data}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.roomItem,
                          selectedRoomId === item._id && styles.selectedRoom,
                        ]}
                        onPress={() => handleRoomPress(item._id)}
                      >
                        <Text style={[styles.roomText, selectedRoomId === item._id && { color: 'white' }]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity:</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const newQuantity = values.quantity - 1;
                      if (newQuantity >= 1) {
                        setFieldValue('quantity', newQuantity);
                      }
                    }}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantityValue}>{values.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => {
                      const newQuantity = values.quantity + 1;
                      if (newQuantity <= 50) {
                        setFieldValue('quantity', newQuantity);
                      }
                    }}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                {devicesData.name.toLowerCase().includes('air conditioner') && (
                  <View>
                    <Text style={styles.subtitle}>The temperature you usually use:</Text>
                    <View style={styles.temperatureContainer}>
                      <RadialSlider
                        value={values.temperature}
                        variant={'radial-circle-slider'}
                        min={15}
                        max={35}
                        onChange={(temperature) => setFieldValue('temperature', temperature)}
                        subTitle='C'
                        unit='O'
                        style={styles.temperatureCircle}
                        sliderWidth={13}
                        thumbColor='#FF8A1E'
                        markerCircleSize={12}
                        thumbBorderWidth={2}
                        thumbRadius={15}
                        lineSpace={4}
                        subTitleStyle={styles.textC}
                        valueStyle={styles.temperatureStyle}
                        linearGradient={[{ offset: '0%', color: '#FEF5EE' }, { offset: '100%', color: '#FF8A1E' }]}
                      />
                    </View>
                  </View>
                )}

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </Formik>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.06,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
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
  chooseRoom: {
    marginBottom: height * 0.02,
  },
  subtitle: {
    color: 'black',
    padding: height * 0.01,
    borderRadius: width * 0.01,
    fontWeight: '700'
  },
  roomItem: {
    margin: width * 0.01,
    padding: width * 0.015,
    backgroundColor: '#e3e3e3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomText: {
    fontSize: width * 0.035,
    color: 'black',
  },
  selectedRoom: {
    backgroundColor: '#FF8A1E',
    borderColor: '#FF8A1E',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  quantityLabel: {
    color: 'black',
    padding: height * 0.01,
    borderRadius: width * 0.01,
    fontWeight: '700',
    marginRight: width * 0.13
  },
  quantityButton: {
    backgroundColor: '#fff',
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF8A1E',
  },
  quantityButtonText: {
    fontSize: width * 0.045,
    color: 'black',
  },
  quantityValue: {
    fontSize: width * 0.045,
    color: 'black',
    marginHorizontal: width * 0.02,
  },
  button: {
    backgroundColor: '#FF8A1E',
    width: width * 0.35,
    height: height * 0.07,
    borderRadius: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.25,
    marginTop: height * 0.015
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  cardDevice: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    padding: width * 0.03,
    marginBottom: height * 0.02,
    borderColor: '#FF8A1E',
    elevation: 3,
    borderWidth: 1,
  },
  deviceName: {
    fontSize: width * 0.045,
    fontWeight: '500',
    marginBottom: 5,
    color: 'black'
  },
  devicePower: {
    fontSize: 14,
    color: '#555',
  },
  deviceImage: {
    marginLeft: width * 0.2,
    height: height * 0.08
  },
  textC: {
    fontSize: width * 0.07,
    color: '#0F3049',
    fontWeight: '600',
  },
  temperatureStyle: {
    color: '#0F3049'
  },
  temperatureContainer: {
    alignItems: 'center',
    marginTop: height * 0.015,
  },

});

export default InforDetailDevice;
