import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, FlatList, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions,ActivityIndicator } from 'react-native';
import useGetAllDevices from '../../hooks/useGetAllDevices';
import useGetCategories from '../../hooks/useGetCategories';

const { width, height } = Dimensions.get('window');

const AddDevices = ({navigation}) => {
  const { data: devicesData, isLoading: isDevicesLoading } = useGetAllDevices();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategories();
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredDevices, setFilteredDevices] = useState([]);

  useEffect(() => {
    if (devicesData) {
      let filtered = devicesData.filter(device => device.name.toLowerCase().includes(searchText.toLowerCase()));

      if (selectedCategory) {
        filtered = filtered.filter(device => device.categoryId === selectedCategory._id);
      }

      setFilteredDevices(filtered);
    }
  }, [devicesData, searchText, selectedCategory]);

  const handleCategoryPress = (category) => {
    if (selectedCategory && selectedCategory._id === category._id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const saveDeviceToStorage = async (device) => {
    try {
      const deviceDataString = JSON.stringify(device);
      await AsyncStorage.setItem('selectedDevice', deviceDataString);
      console.log(deviceDataString);
      console.log('Selected device data saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving selected device data to AsyncStorage:', error);
    }
  };
  
  
  
    
    if (isDevicesLoading || isCategoriesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
          <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
          <Text style={styles.title}>Add new device</Text>
          <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
        </View>
        <View style={styles.containerCategories}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={'#D9D9D9'}
            placeholder="Search by name..."
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        </View>
        <View style={styles.sortContainer}>
        <Text style={styles.sort}>Categories :</Text>
        <ScrollView
          style={styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categoriesData && categoriesData.map((category) => (
            <TouchableOpacity
              key={category._id.toString()}
              onPress={() => handleCategoryPress(category)}
            >
              <View
                style={[
                  styles.categoryContainer,
                  selectedCategory && selectedCategory._id === category._id
                    ? styles.selectedCategory
                    : null,
                ]}
              >
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory && selectedCategory._id === category._id
                      ? styles.selectedCategoryText
                      : null,
                  ]}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
        
      </View>

      <View style={styles.containerDevice}>
        <FlatList
          data={filteredDevices}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                saveDeviceToStorage(item);
                navigation.navigate('InforDetailDevice', {
                  deviceId: item._id
                });
              }}
            >
            <View style={styles.card}>
              <Image style={styles.imageDevice} source={require('../../assets/DeviceExample.png')}/>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.text}>Power: {item.powerConsumption}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  containerCategories: {
    backgroundColor: '#fff',
    marginTop: height * 0.01,
  },
  containerDevice: {
    flex: 1,
    marginTop: height * 0.02,
    backgroundColor: '#fff',
    paddingTop: height * 0.01,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: height * 0.06,
    borderColor: '#9C9C9C',
    borderWidth: 1,
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    padding: width * 0.04,
    color: 'black'
  },
  scrollView: {
    height: height * 0.05,
    
  },
  categoryContainer: {
    flex: 1,
    margin: width * 0.01,
    padding: width * 0.015,
    backgroundColor: '#e3e3e3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: width * 0.035,
    color: 'black',
  },
  selectedCategory: {
    backgroundColor: '#FF8A1E',
  },
  selectedCategoryText: {
    color: 'white',
  },
  text: {
    color: 'black',
  },
  textName: {
    color: 'black',
    fontWeight: '600'
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
  sortContainer: {
    justifyContent: 'center'
  },
  sort: {
    color:'black',
    padding: height * 0.01,
    borderRadius: width * 0.01,
    fontWeight: '700'
  },
  card: {
    color: 'black',
    paddingLeft: width * 0.04,
    paddingVertical: height * 0.01,
    backgroundColor: 'white',
    marginHorizontal: width * 0.01,
    marginTop: height * 0.01,
    borderRadius: width * 0.045,  
    marginBottom: height * 0.01, 
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    shadowColor: "#42CFB6",
    shadowOffset: {
          width: 0,
          height: 2,
    },
    shadowOpacity: 1, 
    shadowRadius: 4, 
    elevation: 3,
  },
  imageDevice:{
    height: height * 0.07,
    marginHorizontal: width * 0.2,
    marginBottom: height * 0.02
  }
});

export default AddDevices;
