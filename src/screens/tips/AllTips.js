import React from 'react';
import axios from 'axios';
import { api_endpoints } from '../../api/apiUrl';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useGetAllTips from '../../hooks/useGetAllTips';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const AllTips = ({ navigation }) => {
  const { data: tipsData, isLoading } = useGetAllTips();
  const getUserToken = async () => {
    try {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';
      return userToken;
    } catch (error) {
      console.error('Error retrieving user token:', error);
      return '';
    }
  };
  
  const markTipAsRead = async (index) => {
    try {
      const userToken = await getUserToken();
      console.log(index);
      const data = { id: index };
      console.log(data);
      axios.put(`${api_endpoints}/tips`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        validateStatus: (status) => true,
      })
      .then(response => {
        console.log('Tip marked as read:', index);
      })
      .catch(error => {
        console.error('Error marking tip as read:', error);
      });
      console.log('Tip marked as read:', index);
    } catch (error) {
      console.error('Error marking tip as read:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
        </TouchableOpacity>
        <Text style={styles.title}>Tips</Text>
      </View>

      <FlatList
        data={tipsData?.tips}
        contentContainerStyle={styles.listTips}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: item.isRead ? '#EFF0F2' : '#ffffff' },
          ]}
          onPress={() => {
            markTipAsRead(item._id);
            console.log(item._id);
            navigation.navigate('DetailTip', { tip: item });
          }}
        >
          <Text style={[styles.buttonText, { color: item.isRead ? '#808080' : '#000000' }]}>
            {item.title}
          </Text>
          <Icon
            name='circle'
            color={item.isRead ? '#EFF0F2' : '#42CFB6'}
            size={12}
            style={styles.iconOn}
          />
        </TouchableOpacity>
        
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: width * 0.06,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.055,
    color: '#0F3049',
    fontWeight: '700',
    marginLeft: width * 0.4
  },
  iconback: {
    width: width * 0.02,
    height: height * 0.02,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.85,
    borderRadius: width * 0.02,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.01,
    borderWidth: 0.5,
  },
  buttonText: {
    fontSize: 13,
    marginRight: width * 0.04,
  },
  listTips: {
    paddingBottom: height * 0.08
  },
  iconOn: {
    position: 'absolute',
    top: height * 0.01,
    left: width * 0.8
  }
});

export default AllTips;
