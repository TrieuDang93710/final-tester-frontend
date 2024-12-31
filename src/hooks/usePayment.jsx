import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '@/contexts/AuthProvider';

function usePayment() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('access-token');
  const { refetch, data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const rs = await fetch(`${import.meta.env.VITE_URL_API_ON_LOCAL}/payment/email?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      return rs.json();
    }
  });
  return [payments, refetch];
}

export default usePayment;
