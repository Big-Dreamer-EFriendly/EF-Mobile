import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useAddDevice = ({navigation}) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const userTokenObject = await AsyncStorage.getItem('user');
        console.log(userTokenObject);
        const userToken = JSON.parse(userTokenObject)?.token || '';
        console.log(userToken);
        console.log(data);
        const res = await axios.post(`${api_endpoints}/devicesInRoom`, data, 
        {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            validateStatus: status => true,
          });
          
        if (res.status === 200) {
          Alert.alert('Success', 'Add a new device successfully', [
            { text: 'OK', onPress: () => navigation.navigate('Show room') },
          ]);
        } else if (res.status === 401) {
          Alert.alert('Error', 'Invalid information');
        } else {
          Alert.alert('Error', 'An unexpected error occurred');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'An error occurred while add a new room. Please try again.');
      }
    },
  });

  const handleAddDevice = (data) => {
    mutation.mutate(data);
  };

  return { handleAddDevice };
};

export default useAddDevice;
