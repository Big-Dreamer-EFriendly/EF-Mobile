import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useEditProfile = ({ navigation }) => {
    const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({  data }) => {
      const userTokenObject = await AsyncStorage.getItem('user');
      const userToken = JSON.parse(userTokenObject)?.token || '';
      
      try {
        console.log("data",data);
        const res = await axios.put(`${api_endpoints}/profile`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          validateStatus: (status) => true,
        });

        console.log(data);

        if (res.status === 200) {
          Alert.alert('Success', 'Update profile successfully', [
            { text: 'OK', onPress: () => navigation.navigate('BottomTabs') },
          ]);
          queryClient.invalidateQueries('Profiles');
          
        } else if (res.status === 401) {
          Alert.alert('Error', data.message);
        } else {
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error);
      }
    },
  });

  const handleEditProfile = ( data) => {
    mutation.mutate({  data }); 
  };

  return { handleEditProfile };
};

export default useEditProfile;
