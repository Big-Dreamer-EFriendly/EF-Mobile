import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useGetRoom from '../../hooks/useGetRoom';
import useGetAllDevices from '../../hooks/useGetAllDevices';
import useGetCategories from '../../hooks/useGetCategories';
const Home = () => {
  const { data: rooms } = useGetRoom();
  const { data: devicesData, isLoading: isDevicesLoading } = useGetAllDevices();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategories();
  console.log(rooms);
  return (
    <View>
      <Text style={styles.home}>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home: {
    color: 'black'
  }
})