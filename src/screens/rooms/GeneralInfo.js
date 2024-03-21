import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import ChartComponent from './ChartComponent';
import useGetStatistic from '../../hooks/useGetStatistic';

const { width, height } = Dimensions.get('window');

const GeneralInfo = ({ roomId, name, floor, numberOfDevices }) => {
  const { data: chartData, isLoading, refetch: refetchChartData } = useGetStatistic(roomId);
  const [shouldRender, setShouldRender] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldRender) {
      refetchChartData();
    }
  }, [shouldRender, refetchChartData]);

  return (
    <View style={styles.container}>
      <View style={styles.general}>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Floor: {floor}</Text>
        <Text style={styles.text}>Number of Devices: {numberOfDevices}</Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Statistics by each device in {currentMonth}</Text>
        {shouldRender && (
          <>
            {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
        ) : (
              <ChartComponent data={chartData} roomId={roomId} />
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 45,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  general: {
    padding: 10,
    marginTop: - height * 0.03,
    borderRadius: 5,
    color: 'black',
    borderRadius: width * 0.03,
    borderWidth: 0.5,

  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: width * 0.038,
    marginBottom: height * 0.01
  },

  chartContainer: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    marginTop: height * 0.02,
  },
  loadingText: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});


export default GeneralInfo;
