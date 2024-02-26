import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useForgotPassword = ({navigation}) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      try {
        const res = await axios.post(`${api_endpoints}/api/forgot-password`, data, { validateStatus: status => true });
        if (res.status === 200) {
        //   const user = JSON.stringify({ token });
        //   await AsyncStorage.setItem('user', user);
        navigation.navigate('ForgotPasswordSuccess') 
          // Alert.alert('Success', 'OK', [
          //   { text: 'OK', onPress: () => navigation.navigate('Home') },
          // ]);
        } else if (res.status === 401) {
          Alert.alert('Error', 'Invalid email! Please try again.');
        } else if (res.status === 400) {
          Alert.alert('Error', 'You can only request a new password once per hour.');
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
