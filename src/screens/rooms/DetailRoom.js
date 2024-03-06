import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  TextInput,
  Dimensions,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import { Formik } from 'formik';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import useGetDevicesByRoom from '../../hooks/useGetDeviceByRoom';
import useGetCategories from '../../hooks/useGetCategories';
import * as yup from 'yup'; // Yêu cầu thư viện yup để xác thực
import useEditDevice from '../../hooks/useEditDevice';


const { width, height } = Dimensions.get('window');

const getCategoryNameById = (categoryId, categoriesData) => {
  const category = categoriesData.find((category) => category._id === categoryId);
  return category ? category.name : '';
};

const DeviceSchema = yup.object({
  quantity: yup.string().required('Quantity is required'),
  temperature: yup.string().when('categoryName', {
    is: 'Air-conditioner',
    then: yup.string().required('Temperature is required for Air-conditioner'),
  }),
});


const DetailRoom = ({ route, navigation }) => {
  const { roomId, name, floor, numberOfDevices } = route.params;
  const { data: deviceData, isLoading: isDevicesLoading } = useGetDevicesByRoom(roomId);
  const { data: categoriesData } = useGetCategories();
  const { handleEditDevice } = useEditDevice({ navigation });

  const [groupedDevices, setGroupedDevices] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([{ key: 'info', title: 'General Info' }]);
  const [chartData, setChartData] = useState({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1620],
        type: 'bar',
      },
    ],
  });

  useEffect(() => {
    if (deviceData && deviceData.data && categoriesData) {
      const categoryMap = new Map();

      deviceData.data.forEach((device) => {
        const categoryId = device.deviceData.categoryId;
        const categoryName = getCategoryNameById(categoryId, categoriesData);

        if (categoryMap.has(categoryName)) {
          categoryMap.get(categoryName).push(device);
        } else {
          categoryMap.set(categoryName, [device]);
        }
      });

      const groupedDevicesArray = Array.from(categoryMap, ([categoryName, devices]) => ({
        categoryName,
        devices,
      }));

      setGroupedDevices(groupedDevicesArray);

      const allRoutes = [
        { key: 'info', title: 'General Info' },
        ...groupedDevicesArray.map((category, index) => ({ key: index.toString(), title: category.categoryName })),
      ];

      setRoutes(allRoutes);
    }
  }, [deviceData, categoriesData]);

  const renderGeneralInfo = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.generalInfoContainer}>
        <Text style={styles.infoText}>Name: {name}</Text>
        <Text style={styles.infoText}>Floor: {floor}</Text>
        <Text style={styles.infoText}>Number of devices: {numberOfDevices}</Text>
      </View>
    </ScrollView>
  );

  const renderDeviceDetails = (category) => (
    <ScrollView>
      {category.devices.map((device) => (
        <View key={device._id}>
          <Text>{device.deviceData.name}</Text>
          <Text>Quantity: {device.quantity}</Text>
          {category.categoryName === 'Air-conditioner' && (
            <Text>Commonly used temperature: {device.temperature}</Text>
          )}
          <TouchableOpacity onPress={() => handleEditDeviceA(device)}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderScene = SceneMap({
    info: renderGeneralInfo,
    ...groupedDevices.reduce((accumulator, category, index) => {
      accumulator[index.toString()] = () => renderDeviceDetails(category);
      return accumulator;
    }, {}),
  });

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editedDevice, setEditedDevice] = useState(null);

  const handleEditDeviceA = (device) => {
    setEditedDevice(device);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {

    setEditModalVisible(false);
  };

  const CustomTabBar = (props) => (
    <TabBar
      {...props}
      tabStyle={{ width: 'auto' }}
      scrollEnabled
      indicatorStyle={{ backgroundColor: '#fff' }}
      style={{ backgroundColor: 'white', elevation: 0 }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? 'white' : 'gray',
            backgroundColor: focused ? '#FF8A1E' : '#ffffff',
            fontSize: focused ? width * 0.038 : width * 0.04,
            fontWeight: focused ? 'bold' : 'normal',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: width * 0.02,
            paddingVertical: height * 0.015,
            borderRadius: width * 0.02,
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {isDevicesLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {!isDevicesLoading && (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
              <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
            <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
          </View>

          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={CustomTabBar}
          />
          <Modal animationType="slide" transparent={true} visible={isEditModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Edit Device</Text>
                {console.log("device", editedDevice)}
                {editedDevice && (

                <Formik
                  initialValues={{
                    deviceId: editedDevice?.deviceData._id,
                    roomId: roomId,
                    quantity: editedDevice?.quantity|| '',
                    timeUsed: 0
                  }}
                  validationSchema={DeviceSchema}
                  onSubmit={values => {
                    console.log(values);
                    setTimeout(() => {
                      let device = {
                        deviceId: editedDevice?.deviceData._id,
                        roomId: roomId,
                        quantity: parseInt(values.quantity),
                        timeUsed: 0,
                      };
                      handleEditDevice( device);
                    }, 100);}}
                >
                  {(formikProps) => (
                    <>
                      <TextInput
                        placeholder="Quantity"
                        style={{ color: 'black' }}
                        value={formikProps.values.quantity.toString()}
                        onChangeText={formikProps.handleChange('quantity')}
                      />
                      {formikProps.touched.quantity && formikProps.errors.quantity && (
                        <Text style={{ color: 'red' }}>{formikProps.errors.quantity}</Text>
                      )}

                      {editedDevice?.categoryName === 'Air-conditioner' && (
                        <>
                          <TextInput
                            placeholder="Temperature"
                            value={formikProps.values.temperature}
                            onChangeText={formikProps.handleChange('temperature')}
                          />
                          {formikProps.touched.temperature && formikProps.errors.temperature && (
                            <Text style={{ color: 'red' }}>{formikProps.errors.temperature}</Text>
                          )}
                        </>
                      )}

                      <Button title="Save" onPress={formikProps.handleSubmit} />
                      <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
                    </>
                  )}
                </Formik>)}
              </View>
            </View>
          </Modal>
        </>
      )}
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
    marginBottom: height * 0.02,
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
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    marginTop: height * 0.04,
    marginHorizontal: width * 0.01,
  },
  generalInfoContainer: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    backgroundColor: 'white',
    borderRadius: width * 0.045,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  infoText: {
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  chartContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default DetailRoom;
