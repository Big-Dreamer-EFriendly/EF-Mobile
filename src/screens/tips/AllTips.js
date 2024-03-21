import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import useGetAllTips from '../../hooks/useGetAllTips';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

const generateFakeTipsData = () => {
  const tipsData = [];
  for (let i = 0; i < 10; i++) {
    tipsData.push({
      image: `https://placekitten.com/200/300?image=${i}`,
      description: `Tip ${i + 1}: This is a sample tip description.`,
      detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    });
  }
  return tipsData;
};

const AllTips = ({ navigation }) => {
  const fakeTipsData = generateFakeTipsData();
  const { data: tipsData = fakeTipsData, isLoading } = useGetAllTips();
  const [readTips, setReadTips] = useState([]);

  const markTipAsRead = (index) => {
    if (!readTips.includes(index)) {
      setReadTips([...readTips, index]);
    }
  };

  const isTipRead = (index) => readTips.includes(index);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!tipsData || tipsData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'black' }}>No tips available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
          <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
        </TouchableOpacity>
        <Text style={styles.title}>Tips</Text>
      </View>

      <FlatList
        data={fakeTipsData}
        contentContainerStyle={styles.listTips}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: isTipRead(index) ? '#d3d3d3' : '#42CFB6', backgroundColor: isTipRead(index) ? '#EFF0F2' : '#ffffff' },
            ]}
            onPress={() => {
              markTipAsRead(index);
              navigation.navigate('DetailTip', { tip: item, isRead: isTipRead(index) });
            }}
          >
            <Image source={{ uri: item.image }} style={styles.buttonImage} />
            <Text style={[styles.buttonText, { color: isTipRead(index) ? '#808080' : '#000000' }]}>{item.description}</Text>
            <Icon name='circle' color={isTipRead(index) ? '#EFF0F2' : '#42CFB6'} size={12} style={styles.iconOn}/>
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
    position:'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  buttonImage: {
    width: width * 0.13,
    height: height * 0.06,
    borderRadius: width * 0.02,
    marginRight: width * 0.05
  },
  newLabel: {
    marginRight: width * 0.02,
  },
  newLabelText: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold',
  },
  listTips: {
    alignItems: 'center',
    paddingBottom:height * 0.08
  },
  iconOn:{
    position: 'absolute',
    top: height * 0.01,
    left : width * 0.8
  }
});

export default AllTips;
