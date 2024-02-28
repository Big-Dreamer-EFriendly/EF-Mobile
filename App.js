import { View, Text } from 'react-native'
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MainNavigate from './src/navigation/MainNavigate'
import RegisterSuccess from './src/screens/register/RegisterSuccess';
import { NavigationContainer } from '@react-navigation/native';
import AddRoom from './src/screens/rooms/AddRoom';
import EditRoom from './src/screens/rooms/EditRoom';
import DetailRoom from './src/screens/rooms/DetailRoom';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AddRoom/> */}
      {/* <MainNavigate/> */}
      {/* <EditRoom/> */}
      <DetailRoom/>
    </QueryClientProvider>
    
    
  )
}

export default App
