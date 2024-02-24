import { useMutation } from 'react-query';
import axios from 'axios';
import { api_endpoints } from '../api/apiUrl';

const useForgotPassword = () => {
  const mutation = useMutation((data) => {
    return axios.post(`${api_endpoints}/api/forgot-password`, data,{ validateStatus: status => true } );
  });

  const handleForgotPassword = async (data) => {
    try {
      await mutation.mutateAsync(data);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Failed to send password reset email:', error.message);
    }
  };

  return {
    handleForgotPassword,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  };
};

export default useForgotPassword;
