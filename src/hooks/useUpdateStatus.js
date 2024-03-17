import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api_endpoints } from '../api/apiUrl';

const useUpdateStatus = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data) => { // Thay đổi tham số truyền vào
            const userTokenObject = await AsyncStorage.getItem('user');
            const userToken = JSON.parse(userTokenObject)?.token || '';
            console.log('UPDATING STATUS');
            try {
                const res = await axios.put(`${api_endpoints}/devicesInRoom/status`, data, { // Sử dụng data truyền vào trực tiếp
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                    validateStatus: (status) => true,
                });

                console.log('Update finished');
                if (res.status === 200) {
                    // Alert.alert('Success', res.data.message)
                    // queryClient.invalidateQueries('devicesStatus');
                    queryClient.invalidateQueries({ queryKey: ['devicesByRoom'] });

                    console.log('Invalidated');

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

    const handleUpdateStatus = async (data) => {
        // Thay đổi cách gọi hàm mutateAsync
        try {
            await mutation.mutateAsync(data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', error);
        }
    };

    return { handleUpdateStatus };
};

export default useUpdateStatus;
