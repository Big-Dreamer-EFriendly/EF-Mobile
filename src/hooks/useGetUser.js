import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api_endpoints } from '../api/apiUrl';

export default function useGetUser() {
  const { data, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';

      const response = await axios.get(`${api_endpoints}/profile`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        validateStatus: status => true,
      });
      return response.data;
    },
  });

  return {
    data, isFetching
  };
}
