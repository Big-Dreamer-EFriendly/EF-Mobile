import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useAddroom = ({navigation}) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const userTokenObject = await AsyncStorage.getItem('user');
        console.log(userTokenObject);
        const userToken = JSON.parse(userTokenObject)?.token || '';
        console.log(userToken);
        console.log(data);
        const res = await axios.post(`${api_endpoints}/rooms`, data, 
        {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            validateStatus: status => true,
          });
          
        if (res.status === 200) {
          Alert.alert('Success', 'Add a new room successfully', [
            { text: 'OK', onPress: () => navigation.navigate('Show room') },
          ]);
        } else if (res.status === 401) {
          Alert.alert('Error', res.data.message);
        } else {
          Alert.alert('Error', res.data.message);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error);
      }
    },
  });

  const handleAddRoom = (data) => {
    mutation.mutate(data);
  };

  return { handleAddRoom };
};

export default useAddroom;
