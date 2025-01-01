import { AuthContext } from '@/contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

function useCart() {
  const { user } = useContext(AuthContext);
  const { refetch, data: carts = [] } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const rs = await fetch(`${import.meta.env.VITE_URL_API_ON_LOCAL}/cart?email=${user?.email}`);
      return rs.json();
    }
  });
  return [carts, refetch];
}

export default useCart;
