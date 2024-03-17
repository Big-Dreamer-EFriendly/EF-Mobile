import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { api_endpoints } from '../api/apiUrl';

export default function useGetTotalBill() {
  const { data, isFetching } = useQuery({
    queryKey: ['totalBill'],
    queryFn: async () => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';

      const response = await axios.get(`${api_endpoints}/statistics`, {
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
