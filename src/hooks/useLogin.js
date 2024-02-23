import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useLogin = (navigation) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      axios
        .post(
          `${api_endpoints}/auth/login`,
          data,
        )
        .then(async res => {
          if (res.status === 200) {
            console.log(res.data);
            const token = res.data.data;
            const userid = res.data.user.id;
            // const userid = res.data.id;
            const user = JSON.stringify({token, userid});
            await AsyncStorage.setItem('user', user);
            Alert.alert('Success', 'Login successfully', [
              {text: 'OK', onPress: () => navigation.navigate('Root')},
            ]);
          } else {
            Alert.alert('Email or password is invalid');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
  });
  const handleLogin = (data) => {
    mutation.mutate(data);
  };
  return {handleLogin};
};

export default useLogin;