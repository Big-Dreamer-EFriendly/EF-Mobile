import { View, Text } from 'react-native'
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import MainNavigate from './src/navigation/MainNavigate'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainNavigate />
    </QueryClientProvider>
  )
}

export default App