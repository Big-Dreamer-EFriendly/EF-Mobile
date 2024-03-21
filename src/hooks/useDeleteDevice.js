import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';

      try {
        const res = await axios.delete(`${api_endpoints}/devicesInRoom/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          validateStatus: (status) => true,
        });

        if (res.status === 204) {
          // Phòng đã được xóa thành công
          queryClient.invalidateQueries('devices');
          Alert.alert('Success', 'Delete room successfull');

        } else if (res.status === 401) {
          Alert.alert('Error', res.data.message);
        } else {
          Alert.alert('Error', res.data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Axios', error);
      }
    },
  });

  const handleDeleteDevice = (id) => {
    mutation.mutate(id);
  };

  return { handleDeleteDevice, isLoading: mutation.isLoading };
};

export default useDeleteDevice;
