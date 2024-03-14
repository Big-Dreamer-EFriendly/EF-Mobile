import React, { useState } from 'react';
import { ECharts } from 'react-native-echarts-wrapper';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const GeneralInfo = ({ roomId, name, floor, numberOfDevices }) => {
  const [chartData, setChartData] = useState({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1620],
        type: 'bar',
      },
    ],
  });

  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <Text>Name: {name}</Text>
        <Text>Floor: {floor}</Text>
        <Text>Number of Devices: {numberOfDevices}</Text>
      </View>
      <View style={styles.chartContainer}>
      <Text style={styles.title}>Statistic</Text>
        <ECharts option={chartData} backgroundColor="transparent" height={height * 0.3} />
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
    flex:1,
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02,
  },
});

export default GeneralInfo;
