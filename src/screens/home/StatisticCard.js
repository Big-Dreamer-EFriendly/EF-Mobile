import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';

const StatisticCard = () => {
  const [chartType, setChartType] = useState('week'); 

  const weekData = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '60%',
      },
    ],
  };

  const monthData = {
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [350, 420, 380, 400],
        type: 'bar',
        barWidth: '60%',
      },
    ],
  };

  const yearData = {
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [1500, 1800, 1600, 1700, 1400, 1500, 1300, 1200, 1100, 1300, 1400, 1500],
        type: 'bar',
        barWidth: '60%',
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'week':
        return <ECharts option={weekData} height={300} width={'100%'} />;
      case 'month':
        return <ECharts option={monthData} height={300} width={'100%'} />;
      case 'year':
        return <ECharts option={yearData} height={300} width={'100%'} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.statisticCardcontainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setChartType('week')}>
          <Text style={styles.buttonText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setChartType('month')}>
          <Text style={styles.buttonText}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setChartType('year')}>
          <Text style={styles.buttonText}>Year</Text>
        </TouchableOpacity>
      </View>
      {renderChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  statisticCardcontainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    bottom: 660
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StatisticCard;
