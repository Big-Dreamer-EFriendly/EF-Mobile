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
          console.log(res.data);
          const token = res.data.data;
          const roleToken = res.data.role;
          const user = JSON.stringify({ token });
          const role = JSON.stringify({roleToken});
          console.log();
          const username = JSON.stringify(res.data.username);
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('user', user);
          await AsyncStorage.setItem('role', role);

          if (res.data.role === 'admin') {
            Alert.alert('Success', 'Login successfully with admin account', [
              { text: 'OK', onPress: () => navigation.navigate('TipsAdmin') },
            ]);
          } else {
            Alert.alert('Success', 'Login successfully', [
              { text: 'OK', onPress: () => navigation.navigate('BottomTabs') },
            ]);
          }
        } else if (res.status === 401) {
          console.log(res.data.message);
          Alert.alert('Error', res.data.message);
        } else {
          Alert.alert('Error', res.data.message);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'An error occurred during login');
      }
    },
  });

  const handleLogin = (data) => {
    mutation.mutate(data);
  };

  return { handleLogin };
};

export default useLogin;
