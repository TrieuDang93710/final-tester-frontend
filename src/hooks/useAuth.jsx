import AuthProvider from '@/contexts/AuthProvider';
import { useContext } from 'react';

function useAuth() {
  const auth = useContext(AuthProvider);
  console.log('auth: ', auth)
  return auth;
}

export default useAuth;
