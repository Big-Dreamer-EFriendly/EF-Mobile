import { useQuery } from '@tanstack/react-query';
import { useState , useCallback} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_endpoints } from '../api/apiUrl';

export default function useGetStatisticByMonth() {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['statisticByMonth', refreshKey],
    queryFn: async () => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';
      console.log(userToken);
      try {
        const response = await axios.get(`${api_endpoints}/statistics/lastMonth`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          validateStatus: status => true,
        });
        
        return response.data;
      } catch (error) {
        console.error('Error fetching statistic:', error);
        throw error;
      }
    },
  });

  const refreshData = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return {
    data,
    isLoading,
    refreshData,
  };
}
