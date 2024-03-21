import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const Tab = ({ iconName, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tab}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
        <Icon name={iconName} size={width * 0.08} color={'grey'} />
        <Text>{text}</Text>
      </View>
      <Icon name='chevron-right' size={width * 0.08} color={'grey'} />
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
   
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
    borderRadius: width * 0.02,
  },
});
