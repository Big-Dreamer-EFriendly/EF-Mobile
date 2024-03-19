import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import ChartComponent from './ChartComponent';
import useGetStatistic from '../../hooks/useGetStatistic';

const { width, height } = Dimensions.get('window');

const GeneralInfo = ({ roomId, name, floor, numberOfDevices }) => {
 const {data: data} = useGetStatistic(roomId)
  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <Text>Name: {name}</Text>
        <Text>Floor: {floor}</Text>
        <Text>Number of Devices: {numberOfDevices}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Statistics</Text>
        <ChartComponent data={data}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 45,
    backgroundColor: '#ffffff',
  },
  general: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    marginBottom: height * 0.02,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  chartContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
  },
});

export default GeneralInfo;
