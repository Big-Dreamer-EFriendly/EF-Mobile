import React, { useState, useEffect } from 'react';
import { ECharts } from 'react-native-echarts-wrapper';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const ChartComponent = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.deviceInfoArray) {
      const categoryMap = {};

      data.deviceInfoArray.forEach(item => {
        const category = item.categoryName;
        if (categoryMap[category]) {
          categoryMap[category] += item.kWh;
        } else {
          categoryMap[category] = item.kWh;
        }
      });

      const chartData = Object.keys(categoryMap).map(category => ({
        name: category,
        value: categoryMap[category],
      }));

      console.log(chartData);
      setChartData(chartData);
      setIsLoading(false);
    }
  }, [data]);

  const getChartOption = () => {
    return {
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.name),
        axisLabel: {
          interval: 0,
          rotate: 45,
          textStyle: {
            fontSize: 11, 
          },
        },
      },
      yAxis: {
        type: 'value',
        name: 'kWh',
      },
      series: [
        {
          type: 'bar',
          data: chartData.map(item => item.value),
          barWidth: '50%',
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 50,
        },
      ],
    };
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
        ) : (
        <ECharts option={getChartOption()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ChartComponent;
