import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

const DetailTip = ({ route, navigation }) => {
  const { tip, isRead } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
        </TouchableOpacity>
        <Text style={styles.title}>Tips</Text>
      </View>
      {/* <Image source={{ uri: tip.image }} style={styles.tipImage} /> */}
      <Text style={styles.tipDescription}>{tip.title}</Text>
      <Text style={styles.tipDetail}>{tip.content}</Text>
      {isRead && <Text style={styles.readLabel}>Read</Text>}
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
  tipImage: {
    width: '100%', 
    height: height * 0.3,
    borderRadius: width * 0.02,
    marginBottom: height * 0.02,
    marginTop: height * 0.02
  },
  tipDescription: {
    fontSize: width * 0.04,
    color: '#000000',
    fontWeight: '700',
    marginBottom: height * 0.01,
  },
  tipDetail: {
    fontSize: width * 0.035,
    color: '#555555',
    marginBottom: height * 0.02,
    lineHeight: height * 0.025,
    margin:'center'
  },
  readLabel: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginTop: height * 0.02, // Khoảng cách giữa nút "Read" và phần nội dung trước
  },
});

export default DetailTip;
