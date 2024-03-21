import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useEditDeviceAir = ({ navigation }) => {
    const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({  data }) => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';
      
      try {
        console.log("data",data);
        const res = await axios.put(`${api_endpoints}/devicesInRoom/air-co`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          validateStatus: (status) => true,
        });

        console.log("en",data);

        if (res.status === 200) {
          Alert.alert('Success', 'Device updated successfully')
          queryClient.invalidateQueries('devices');

        } else if (res.status === 401) {
          Alert.alert('Error', 'Unauthorized access. Please check your credentials.');
        } else {
          Alert.alert('Error', res.data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error);
      }
    },
  });

  const handleEditDeviceAir = ( data) => {
    mutation.mutate({  data }); 
  };

  return { handleEditDeviceAir };
};

export default useEditDeviceAir;
