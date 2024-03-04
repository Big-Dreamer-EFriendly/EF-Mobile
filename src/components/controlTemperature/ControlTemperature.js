import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProgressCircle from 'react-native-progress-circle'
 
const ControlTemperature = () => {
  return (
    <View>
      <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{'30%'}</Text>
        </ProgressCircle>
    </View>
  )
}

export default ControlTemperature

const styles = StyleSheet.create({})