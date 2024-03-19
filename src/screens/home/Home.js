import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ECharts } from 'react-native-echarts-wrapper';
import Swiper from 'react-native-swiper';
import warningImage from '../../assets/warning.png';
import useGetStatisticByWeek from '../../hooks/useGetStatisticByWeek';
import useGetStatisticByYear from '../../hooks/useGetStatisticByYear';
import useGetTotalBill from '../../hooks/useGetTotalBill';
const { width, height } = Dimensions.get('window');

const WeeklyChart = () => {
  const { data: dataWeek, isLoading, refreshData } = useGetStatisticByWeek();

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

  const chartOption = {
    xAxis: {
      type: 'category',
      data: dataWeek?.map(entry => entry.date) || [],
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
      name: 'vnd',
    },
    series: [
      {
        type: 'bar',
        data: dataWeek?.map(entry => ({
          value: Math.round(entry.total),
          label: {
            show: true, 
            position: 'top',
          },
        })),        
        barWidth: '60%',
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

const generateMonthlyData = () => {
  const days = Array.from({ length: 30 }, (_, i) => ` ${i + 1}`);
  
  const energyData = Array.from({ length: 30 }, () => Math.floor(Math.random() * (1000 - 500 + 1)) + 500);

  return {
    xAxis: {
      type: 'category',
      data: days, 
      axisLabel: {
        interval: 0,
        rotate: 45,
        textStyle: {
          fontSize: 9,
        },
      }
    },
    yAxis: {
      type: 'value',
      name: 'kWh',
    },
    series: [
      {
        type: 'bar',
        data: energyData, // Sử dụng dữ liệu giả mạo cho năng lượng tiêu thụ
        barWidth: '60%',
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
    ],
  };
};

const MonthlyChart = () => {
  return (
    <View style={styles.chartContainer}>
      <ECharts
        option={generateMonthlyData()}
        backgroundColor="#fff"
        style={{ height: height * 0.7 }}
      />
    </View>
  );
};

const YearlyChart = () => {
  const { data: dataYear, isLoading } = useGetStatisticByYear();

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
      data: dataYear?.map(entry => entry.month) || [],
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
        data: dataYear?.map(entry => ({
          value: Math.round(entry.totalElectricityCost),
          label: {
            show: true, 
            position: 'top', // Vị trí của label (có thể là 'top', 'left', 'right', 'bottom', 'inside', 'insideLeft', 'insideRight', 'insideTop', 'insideBottom', 'insideTopLeft', 'insideBottomLeft', 'insideTopRight', 'insideBottomRight')
            formatter: '{c} vnd', // Định dạng của label
          },
        })),            
        barWidth: '60%',
      },
    ],
  };

  return (
    <View style={styles.chartContainer}>
      <ECharts option={chartOption} backgroundColor="#fff" style={{ height: height * 0.7, marginHorizontal: width * 0.01 }}/>
    </View>
  );
};

const TipsSlide = () => {
  return (
    <>
      <Swiper
        style={styles.wrapper}
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={true}
        dotColor='black'
        activeDot={<View style={styles.swiperDot} />}
        dot={<View style={styles.swiperDotInactive} />}
        paginationStyle={{ marginBottom: height * 0.265 }}
      >
        <View style={styles.slideContent}>
          <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
          <Image source={warningImage} style={styles.warningIcon} />
        </View>
        <View style={styles.slideContent}>
          <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
          <Image source={warningImage} style={styles.warningIcon} />
        </View>
        <View style={styles.slideContent}>
          <Text style={styles.text}>Your air conditioner is {'\n'}consuming a lot of electricity</Text>
          <Image source={warningImage} style={styles.warningIcon} />
        </View>

      </Swiper>

    </>
  );
};

const renderScene = SceneMap({
  weekly: WeeklyChart,
  monthly: MonthlyChart,
  yearly: YearlyChart,
});

const Home = () => {
  const {data: data} = useGetTotalBill()
  const [index, setIndex] = useState(0); // Default to monthly
  const [routes] = useState([
    { key: 'weekly', title: 'Weekly' },
    { key: 'monthly', title: 'Monthly' },
    { key: 'yearly', title: 'Yearly' },
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#42CFB4' }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <TouchableOpacity onPress={() => {
          console.log('Tab pressed:', route.key);
          props.jumpTo(route.key);
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
            <Text style={styles.title}>{Math.round(data?.totalCost)} vnd</Text>
            <Text style={styles.kwh}>{Math.round(data?.kWh)} kWh</Text>
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
