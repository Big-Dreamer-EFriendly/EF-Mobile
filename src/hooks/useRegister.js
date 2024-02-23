import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useRegister = ({ navigation }) => {
  const mutationRegister = useMutation({
    mutationFn: async (data) => {
        console.log(data);
      const res = await axios.post(
        `${api_endpoints}/auth/signup`,
        data
      );
      if (res.status === 201) {
        navigation.navigate('RegisterSuccess') 
      }
      else if (res.status === 400) {
        Alert.alert('Email already taken!');
      } else {
        Alert.alert('Invalid information!');
      }

      return res.data;
    },
    onError: (error) => {
      console.error('Error during registration:', error);
      // Alert.alert('Error', 'An error occurred during registration. Please try again.');
    },
  });

  return {
    mutationRegister,
  };
};

export default useRegister;
