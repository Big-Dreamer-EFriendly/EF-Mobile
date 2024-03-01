import { StyleSheet, Text, View, Image, Dimensions, } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper';
import warningImage from '../../assets/warning.png';

const width = Dimensions.get('window').width;


const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topOrangeBackground}>
        {/* Góc bên trái phía trên là giờ hiện tại */}
        <Text style={styles.time}>9:41</Text>
        {/* Góc bên phải phía trên là hình ảnh về sóng điện thoại, wifi và pin điện thoại */}
        <View style={styles.iconsContainer}>
          <Image source={require('../../assets/wave.png')} style={styles.icon} />
          <Image source={require('../../assets/Wifi.png')} style={styles.icon} />
          <Image source={require('../../assets/pin.png')} style={styles.icon} />
        </View>
      </View>
      <View style={styles.profileContainer}>
        {/* Hình ảnh profile */}
        <Image source={require('../../assets/profilehome.png')} style={styles.profileImage} />
        {/* Tên người */}
        <Text style={styles.profileName}>Hello,{'\n'}Nhat Nguyen</Text>
        {/* Hình chuông */}
        <Image source={require('../../assets/bell.png')} style={styles.bellIcon} />
      </View>
      <View style={styles.bottomBorder}></View>

      {/* Background màu trắng */}
      <View style={styles.whiteBackground}>
        <Text style={styles.billEstimate}>Bill estimate</Text>
        <Text style={styles.december}>December</Text>
      </View>
      <View style={styles.BillBackground}>
        <Text style={styles.moneybill}>355.000 VND</Text>
        <Text style={styles.kwh}>55 kwh</Text>
      </View>
      <View style={styles.TipBackground}>
        <Text style={styles.tip}>Tips</Text>
        <Text style={styles.all}>All</Text>
      </View>
      <View style={styles.Detailtip}>
        <Swiper
          style={styles.wrapper}
          autoplay={true} // Tự động lướt qua các slide
          autoplayTimeout={3} // Thời gian giữa mỗi lần lướt (đơn vị là giây)
          showsPagination={true}
          paginationStyle={styles.paginationStyle}
        >
          <View style={styles.slide1}>
            <View style={styles.slideContent}>
              <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
              <Image source={warningImage} style={styles.warningIcon} />
            </View>
          </View>
          <View style={styles.slide2}>
            <View style={styles.slideContent}>
              <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
              <Image source={warningImage} style={styles.warningIcon} />
            </View>
          </View>
          <View style={styles.slide3}>
            <View style={styles.slideContent}>
              <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
              <Image source={warningImage} style={styles.warningIcon} />
            </View>
          </View>

        </Swiper>
        {/* <Text style={styles.detip}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
        <Image source={require('../../assets/warning.png')} /> */}
      </View>

    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: 395,
    height: 420,
    backgroundColor: '#F8F8FF'
  },
  topOrangeBackground: {
    position: 'relative',
    right: 2,
    height: 125, // Adjust height as needed
    backgroundColor: 'rgba(250, 129, 46, 0.9)',
    borderBottomLeftRadius: 40, // Adjust border radius as needed
    borderBottomRightRadius: 40, // Adjust border radius as needed
    borderWidth: 2, // Border width
    borderColor: 'rgba(250, 129, 46, 0.9)', // Border color
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  time: {
    position: 'absolute',
    top: 5,
    left: 20,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginBottom: 100,
    marginLeft: 280,
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 50,
    right: 135,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
  },
  profileName: {
    fontSize: 20,
    color: 'white',
    marginLeft: 15,
  },
  bellIcon: {
    width: 30,
    height: 30,
    left: 120,
  },
  whiteBackground: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: 'absolute',
    top: 140,
    right: 15,
    width: 365,
    height: 80,
  },
  billEstimate: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    top: 5,
  },
  december: {
    fontSize: 16,
    color: 'black',
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2, // Border height
    backgroundColor: 'rgba(250, 129, 46, 0.9)',
  },



  BillBackground: {
    backgroundColor: '#FAEBD7',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    top: 148,
    right: 30,
    width: 150,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneybill: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  kwh: {
    fontSize: 16,
    marginLeft: 70,
    color: 'rgba(66, 207, 180, 1)',
    fontWeight: 'bold',
  },

  TipBackground: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: 'absolute',
    top: 230,
    right: 15,
    width: 365,
    height: 170,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tip: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  all: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(66, 207, 180, 1)',
  },


  Detailtip: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    position: 'absolute',
    top: 280,
    width: 340,
    marginLeft: 25,
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detip: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black',
  },

  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',

  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  paginationStyle: {
    position: 'absolute',
    top: 95, // Điều chỉnh vị trí dọc tùy ý
    width: '100%', // Đảm bảo chiều rộng của thanh điều hướng bằng với chiều rộng của Swiper
    alignItems: 'center',
  },
  warningIcon: {
    marginLeft: 20,
  },
  slideContent: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20,
},

});


