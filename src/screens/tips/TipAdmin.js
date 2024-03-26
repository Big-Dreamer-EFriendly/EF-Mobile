import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, FlatList } from 'react-native';
import AddTipsModal from './AddTipsModal'; 

const TipAdmin = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tips, setTips] = useState([]);

  const updateTipsList = (newTip) => {
    setTips([...tips, newTip]);
  };

  const renderTipItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AddTipsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        updateTipsList={updateTipsList}
        navigation={navigation}
      />
      <Text style={styles.listTitle}>Tips Management</Text>
      <View style={styles.tipList}>
        <Button title="Add a new tip" onPress={() => setModalVisible(true)} color="#FF8A1E" />
        <Text style={styles.subTitle}>List tips:</Text>
        <FlatList
          data={tips}
          renderItem={renderTipItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor:'#FF8A1E',
    color:'white',
    paddingHorizontal: 100,
    paddingVertical:20,
  },
  subTitle: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 0,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  tipList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
  },
});

export default TipAdmin;
