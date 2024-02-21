import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useRegister = ({ navigation }) => {
  const [registerInfo, setRegisterInfo] = useState();
  useEffect(() => {
    const getInfoRegister = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('registerInfo');
        if (jsonValue !== null) {
          setRegisterInfo(JSON.parse(jsonValue));
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    };
    getInfoRegister();
  }, []);

  const mutation = useMutation({
    mutationFn: async (data) => {
      axios
        .post(`${api_endpoints}/api/register`, data)
        .then(res => {
          if (res.status === 200) {
            const jsonValue = JSON.stringify(res.data.user);
            Alert.alert('Success', 'Register successfully', [
              { text: 'OK', onPress: () => navigation.navigate('Login') },
            ]);
          } else {
            Alert.alert('Invalid information!');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
  });

  const handleRegister = (data) => {
    if (data && data.confirmPassword === data.password) {
      console.log('oke', data);
      mutation.mutate(data);
    } else {
      Alert.alert('Error', 'Fill out complete information!');
    }
  };

  return {
    handleRegister,
    registerInfo,
  };
};

export default useRegister;
