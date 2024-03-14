import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useEditRoom = ({ navigation }) => {
    const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';
      
      try {
        const res = await axios.put(`${api_endpoints}/rooms/${id}`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          validateStatus: (status) => true,
        });

        console.log(data);
        console.log(id);
        if (res.status === 200) {
          Alert.alert('Success', 'Room updated successfully', [
            { text: 'OK', onPress: () => navigation.navigate('BottomTabs') },
          ]);
          queryClient.invalidateQueries('rooms');
          
        } else if (res.status === 401) {
          Alert.alert('Error', res.data.message);
        } else {
          console.log(res.status);
          Alert.alert('Error', res.data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error);
      }
    },
  });

  const handleEditRoom = (id, data) => {
    mutation.mutate({ id, data }); 
  };

  return { handleEditRoom };
};

export default useEditRoom;
