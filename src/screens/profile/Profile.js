import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import Tab from './Tab';
const { width, height } = Dimensions.get('window');

const Profile = ({navigation}) => {
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
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileHeader: {
    backgroundColor: '#FA8D42',
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.09,
    alignItems:'center'
  },
  profileName: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: '700',
    marginLeft: width * 0.04
  },
  tabContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: width * 1,
    top: height * 0.2,
    paddingTop: height * 0.05,
    borderRadius: width * 0.07
  }
})