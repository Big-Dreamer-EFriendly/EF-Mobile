import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Tab from './Tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetUser from '../../hooks/useGetUser';

const { width, height } = Dimensions.get('window');

const Profile = ({ navigation }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const { data: userData, isLoading: isUserLoading } = useGetUser();

  const handleLogout = async () => {
    // Clear AsyncStorage data
    try {
      await AsyncStorage.clear();
      // Navigate to login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleEditProfile = () => {
    if (!isUserLoading && userData) {
      navigation.navigate('EditProfile', { userData: userData });
    }
  };


  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Image source={require('../../assets/profilehome.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Hello,{'\n'}Huong Phan</Text>
      </View>
      <View style={styles.tabContainer}>
        <Tab iconName='account-edit' text='Edit profile' onPress={() => navigation.navigate('EditProfile')} />
        <Tab iconName='account-group' text='Invite people' onPress={() => navigation.navigate('InvitePeople')} />
        <Tab iconName='alert-circle' text='About us' onPress={() => navigation.navigate('AboutUs')} />
        <Tab iconName='logout' text='Log out' onPress={handleEditProfile} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.modalButton}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setLogoutModalVisible(false); handleLogout(); }}>
                <Text style={styles.modalButton}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    backgroundColor: '#FA8D42',
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.09,
    alignItems: 'center',
  },
  profileName: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: '700',
    marginLeft: width * 0.04,
  },
  tabContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: width * 1,
    top: height * 0.2,
    paddingTop: height * 0.05,
    borderRadius: width * 0.07,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#007AFF', 
  },
});
