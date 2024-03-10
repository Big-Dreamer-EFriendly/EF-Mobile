import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const DetailTip = ({ route }) => {
  const { tip, isRead } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: tip.image }} style={styles.tipImage} />
      <Text style={styles.tipDescription}>{tip.description}</Text>
      <Text style={styles.tipDetail}>{tip.detail}</Text>
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
  tipImage: {
    width: '100%', // Chiều rộng 100% của phần tử cha
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
