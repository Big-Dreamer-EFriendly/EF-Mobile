import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useLogin = ({navigation}) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        console.log(data);
        const res = await axios.post(`${api_endpoints}/auth/login`, data, { validateStatus: status => true });
        // console.log(res);
        if (res.status === 200) {
          const token = res.data.data;
          const user = JSON.stringify({ token });
          await AsyncStorage.setItem('user', user);
          Alert.alert('Success', 'Login successfully', [
            { text: 'OK', onPress: () => navigation.navigate('Add room') },
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

  const handleLogin = (data) => {
    mutation.mutate(data);
  };

  return { handleLogin };
};

export default useLogin;
