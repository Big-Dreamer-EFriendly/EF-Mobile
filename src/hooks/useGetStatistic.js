import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_endpoints } from '../api/apiUrl';

export default function useGetStatistic(id) {
  const { data, isLoading } = useQuery({
    queryKey: ['statistic'],
    queryFn: async () => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';
      console.log(userToken);
      try {
        const response = await axios.get(`${api_endpoints}/statistics/lastMonth/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          validateStatus: status => true,
        });
        
        return response.data;
      } catch (error) {
        console.error('Error fetching tips:', error);
        throw error;
      }
    },
  });

  return {
    data,
    isLoading,
  };
}