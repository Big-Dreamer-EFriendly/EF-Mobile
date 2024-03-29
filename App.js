import { View, Text } from 'react-native'
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MainNavigate from './src/navigation/MainNavigate'
import RegisterSuccess from './src/screens/register/RegisterSuccess';
import { NavigationContainer } from '@react-navigation/native';
import AllTips from './src/screens/tips/AllTips';
import Widget from './src/screens/widget/Widget';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigate/>
      {/* <Widget /> */}
    </QueryClientProvider>
    
    
  )
}

export default App

