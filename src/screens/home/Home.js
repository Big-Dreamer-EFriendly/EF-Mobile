import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ECharts } from 'react-native-echarts-wrapper';
import Swiper from 'react-native-swiper';
import warningImage from '../../assets/warning.png';
import useGetStatisticByWeek from '../../hooks/useGetStatisticByWeek';
import useGetStatisticByYear from '../../hooks/useGetStatisticByYear';
import useGetStatisticByMonth from '../../hooks/useGetStatisticsByMonth';
import useGetTotalBill from '../../hooks/useGetTotalBill';
const { width, height } = Dimensions.get('window');

const WeeklyChart = () => {
  const { data: dataWeek, isLoading, refreshData } = useGetStatisticByWeek();

  const onRefresh = useCallback(() => {
    refreshData();
  }, [refreshData]);

  const chartData = dataWeek?.map(entry => ({
    date: entry.date.split('-')[2], 
    total: Math.round(entry.total),
  }));  
  const chartDataSorted = chartData?.sort((a, b) => {
    const dateA = parseInt(a.date);
    const dateB = parseInt(b.date);
      return dateA - dateB;
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const chartOption = {
    xAxis: {
      type: 'category',
      data: chartDataSorted.map(entry => entry.date),
      axisLabel: {
        interval: 0,
        rotate: 0,
        textStyle: {
          fontSize: 9,
        },
      },
    },
    yAxis: {
      type: 'value',
      name: 'vnd',
      axisLabel:{
        textStyle: {
          fontSize: 9
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: chartDataSorted.map(entry => ({
          value: entry.total,
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 9
            },
          },
          
          
        })),        
        barWidth: '60%',
        itemStyle:{
          color: '#0F3049'
        }
      },
    ],
  };

  return (
    <ScrollView
      contentContainerStyle={styles.chartContainer}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      <ECharts option={chartOption} backgroundColor="#fff" style={{ height: height * 0.5, width: width * 0.6}} />
    </ScrollView>
  );
};

const MonthlyChart = () => {
  const { data: dataMonth, isLoading, refreshData } = useGetStatisticByMonth();

  const onRefresh = useCallback(() => {
    refreshData();
  }, [refreshData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const chartData = dataMonth?.map(entry => ({
    date: entry.date?.split('-')[2],
    total: Math.round(entry.total),
  }));

  const chartDataSorted = chartData.sort((a, b) => parseInt(a.date) - parseInt(b.date));

  const chartOption = {
    xAxis: {
      type: 'category',
      data: chartDataSorted.map(entry => entry.date),
      axisLabel: {
        interval: 0,
        rotate: 0,
        textStyle: {
          fontSize: 9,
        },
      },
    },
    yAxis: {
      type: 'value',
      name: 'vnd',
      axisLabel:{
        textStyle: {
          fontSize: 9
        }
      }
    
    },
    series: [
      {
        type: 'bar',
        data: chartDataSorted.map(entry => ({
          value: entry.total,
          label: {
            show: true,
            position: 'top',
            textStyle:{
              fontSize: 9
            }
          },
        })),
        barWidth: '60%',
        itemStyle:{
          color: '#0F3049'
        }
      },
    ],
  };

  return (
    <ScrollView
      contentContainerStyle={styles.chartContainer}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      <ECharts option={chartOption} backgroundColor="#fff" style={{ height: height * 0.5, width: width * 0.6, }} />
    </ScrollView>
  );
};

const YearlyChart = () => {
  const { data: dataYear, isLoading, refreshData } = useGetStatisticByYear();
console.log(dataYear);
  const onRefresh = useCallback(() => {
    refreshData();
  }, [refreshData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
console.log(dataYear);
const sortedData = dataYear.sort((a, b) => a.month - b.month);
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const chartOption = {
  xAxis: {
    type: 'category',
    data: sortedData.map(entry => entry.month),
    axisLabel: {
      interval: 0,
      rotate: 0,
      textStyle: {
        fontSize: 11,
      },
    },
  },
  yAxis: {
    type: 'value',
    name: 'vnd',
    axisLabel: {

  textStyle:{
    fontSize: 9
  }    }
  },
  series: [
    {
      type: 'bar',
      data: sortedData.map(entry => ({
        value: Math.round(entry.totalElectricityCost),
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 9
          },
          
        }
     
      })),
      barWidth: '60%',
      itemStyle:{
        color: '#0F3049'
      }
    },

  ],

};

  return (
    <ScrollView
      contentContainerStyle={styles.chartContainer}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
    >
      <ECharts option={chartOption} backgroundColor="#fff" style={{ height: height * 0.5, width: width * 0.6}}/>
    </ScrollView>
  );
};


const renderScene = SceneMap({
  weekly: WeeklyChart,
  monthly: MonthlyChart,
  yearly: YearlyChart,
});

const Home = ({navigation}) => {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0); 
  const [routes] = useState([
    { key: 'weekly', title: 'Weekly' },
    { key: 'monthly', title: 'Monthly' },
    { key: 'yearly', title: 'Yearly' },
  ]);
  const { data: totalBillData, isFetching, refetch } = useGetTotalBill();

  // useEffect(() => {
  //   setData(totalBillData);
  // }, [totalBillData]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   },100000); 

  //   return () => clearInterval(interval);
  // }, [refetch]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#42CFB4' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <TouchableOpacity onPress={() => {
          console.log('Tab pressed:', route.key);
          navigation.navigate(route.key); 
        }}>
          <Text style={{ color: focused ? '#42CFB4' : 'black', margin: 8 }}>{route.title}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#ffffff' }}>
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../../assets/profilehome.png')} style={styles.profileImage} />
            <Text style={styles.profileName}>Hello,{'\n'}Huong Phan</Text>
          </View>
          <Image source={require('../../assets/bell.png')} style={styles.bellIcon} />
        </View>
        <View style={styles.billContainer}>
          <View style={styles.leftSide}>
            <Text style={styles.title}>Bill estimate</Text>
            <Text style={styles.month}>March</Text>
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.title}>{Math.round(totalBillData?.totalCost)} vnd</Text>
            <Text style={styles.kwh}>{Math.round(totalBillData?.kWh)} kWh</Text>
          </View>
        </View>
      </View>

    
      <View style={styles.tipsContainer} >

        <Text style={{
          color: '#0F3049',
          fontSize: width * 0.05,
          fontWeight: '600',
          marginLeft: width * 0.05
        }}>Statistics</Text>
        <TabView
        lazy={true}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  profileContainer: {
    width: width * 1,
    backgroundColor: '#FA812E',
    flexDirection: 'row',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.05,
    justifyContent: 'space-between',
    borderBottomLeftRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04,
    borderColor: "#DCDCDC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: width * 0.121,
    height: height * 0.06,
    marginRight: width * 0.03
  },
  profileName: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: '700'
  },
  wrapper: {
    height: height * 0.15,

  },
  billContainer: {
    marginHorizontal: width * 0.06,
    marginVertical: height * 0.03,
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02
  },
  leftSide: {},
  rightSide: {
    backgroundColor: '#FEF5EE',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01,
    justifyContent: 'flex-end',
    borderRadius: width * 0.02,
  },
  title: {
    color: '#0F3049',
    fontSize: width * 0.05,
    fontWeight: '600'
  },
  month: {
    color: '#0F3049',
    fontSize: width * 0.045,
    fontWeight: '400'
  },
  kwh: {
    color: '#42CFB4'
  },
  tipsContainer: {
    backgroundColor: '#fff',
    paddingBottom: height * 0.015,
    height: height * 0.65,
    marginBottom: height * 0.01
  },
  headerTip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.01
  },
  all: {
    color: '#42CFB4',
    fontSize: width * 0.05,
    fontWeight: '600'
  },
  text: {
    color: 'black'
  },
  slideContent: {
    marginHorizontal: width * 0.06,
    marginVertical: height * 0.01,
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02
  },
  swiperDot: {
    backgroundColor: '#007aff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  swiperDotInactive: {
    backgroundColor: 'grey',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  chartContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: height * 0.05,
    marginHorizontal: width * 0.01,
    borderColor: "#DCDCDC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: width * 0.04,
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
  },
});

export default Home;
