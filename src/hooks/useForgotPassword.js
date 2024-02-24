import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useForgotPassword = (navigation) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const res = await axios.post(`${api_endpoints}/api/forgot-password`, data, { validateStatus: status => true });
        console.log(res);
        if (res.status === 200) {
        //   const user = JSON.stringify({ token });
        //   await AsyncStorage.setItem('user', user);
          Alert.alert('Success', 'OK', [
            { text: 'OK', onPress: () => navigation.navigate('Home') },
          ]);
        } else if (res.status === 401) {
          Alert.alert('Error', 'Invalid email or password. Please try again.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'An error occurred while logging in. Please try again.');
      }
    },
  });

  const handleForgotPassword = (data) => {
    mutation.mutate(data);
  };

  return { handleForgotPassword };
};

export default useForgotPassword;
