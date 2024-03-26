import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MainNavigate from './src/navigation/MainNavigate'
import RegisterSuccess from './src/screens/register/RegisterSuccess';
import { NavigationContainer } from '@react-navigation/native';
import AllTips from './src/screens/tips/AllTips';
import Widget from './src/screens/widget/Widget';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/constants/notification';
const queryClient = new QueryClient();

const App = () => {
  useEffect(()=>{
    requestUserPermission()
  },[])
  console.log('ok');
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigate/>
      {/* <Widget /> */}
    </QueryClientProvider>
    
    
  )
}

export default App

