import { StyleSheet, Text, View, Image, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Swiper from 'react-native-swiper';
import warningImage from '../../assets/warning.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetTotalBill from '../../hooks/useGetTotalBill';
const { width, height } = Dimensions.get('window');


const Home = () => {
  const [username, setUsername] = useState('');
  const { data: totalBill, isFetching: isFetching } = useGetTotalBill()
  const currentMonth = new Date().toLocaleString('en-us', { month: 'long' });

  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        console.log(storedUsername);
        if (storedUsername !== null) {
          setUsername(storedUsername.replace(/"/g, ''));
        }
      } catch (error) {
        console.error('Error retrieving username from AsyncStorage:', error);
      }
    };

    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#ffffff' }}>
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/profilehome.png')} style={styles.profileImage} />
            <Text style={styles.profileName}>Hello,{'\n'}{username}</Text>
          </View>
          <Image source={require('../../assets/bell.png')} style={styles.bellIcon} />
        </View>
        <View style={styles.billContainer}>
          <View style={styles.leftSide}>
            <Text style={styles.title}>Bill estimate</Text>
            <Text style={styles.month}>{currentMonth}</Text>
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.title}>
              {totalBill && totalBill.data ? Math.round(totalBill.data.total) : 0} vnd
            </Text>
            <Text style={styles.kwh}>
              {totalBill && totalBill.data ? Math.round(totalBill.data.kWh) : 0} kWh
            </Text>
          </View>


        </View>
      </View>
      <View style={styles.tipsContainer}>
        <View style={styles.headerTip}>
          <Text style={styles.title}>Tips</Text>
          <Text style={styles.all}>All</Text>
        </View>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={3}
          showsPagination={true}
          dotColor='black'
          activeDot={<View style={{ backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
          dot={<View style={{ backgroundColor: 'rgba(0,0,0,.2)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
          paginationStyle={styles.paginationStyle}
        >
          <View style={styles.slideContent}>
            <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
            <Image source={warningImage} style={styles.warningIcon} />
          </View>
          <View style={styles.slideContent}>
            <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
            <Image source={warningImage} style={styles.warningIcon} />
          </View>
          <View style={styles.slideContent}>
            <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
            <Image source={warningImage} style={styles.warningIcon} />
          </View>

        </Swiper>

      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',

  },
  profileContainer: {
    width: width * 1,
    backgroundColor: '#FA812E',
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.05,
    justifyContent: 'space-between',
    borderBottomLeftRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04,
    borderColor: "#DCDCDC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: width * 0.121,
    height: height * 0.06,
    marginRight: width * 0.03
  },
  profileName: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: '700'
  },
  billContainer: {
    marginHorizontal: width * 0.06,
    marginVertical: height * 0.03,
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02
  },
  leftSide: {
  },
  rightSide: {
    backgroundColor: '#FEF5EE',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    justifyContent: 'flex-end',
    borderRadius: width * 0.02,

  }
  , title: {
    color: '#0F3049',
    fontSize: width * 0.05,
    fontWeight: '600'

  },
  month: {
    color: '#0F3049',
    fontSize: width * 0.045,
    fontWeight: '400'
  },
  kwh: {
    color: '#42CFB4'
  },
  tipsContainer: {
    backgroundColor: '#fff',
    marginTop: height * 0.02
  },
  headerTip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01
  },
  all: {
    color: '#42CFB4',
    fontSize: width * 0.05,
    fontWeight: '600'
  },
  text: {
    color: 'black'
  },
  slideContent: {
    marginHorizontal: width * 0.06,
    marginVertical: height * 0.01,
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02
  },
});

