import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useForgotPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      try {
        setIsLoading(true); 
        const res = await axios.post(`${api_endpoints}/auth/forgot-password`, data, { validateStatus: status => true });
        if (res.status === 200) {
          navigation.navigate('ForgotPasswordSuccess');
        } else if (res.status === 401) {
          Alert.alert('Error', res.data.message);
        } else if (res.status === 400) {
          Alert.alert('Error', 'You can only request a new password once per hour.');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error);
      } finally {
        setIsLoading(false); 
      }
    },
  });

  const handleForgotPassword = (data) => {
    mutation.mutate(data);
  };

  return { handleForgotPassword, isLoading };
};

export default useForgotPassword;
