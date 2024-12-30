import { useContext } from 'react';
import AuthProvider from '../contexts/AuthProvider';

function useAuth() {
  const auth = useContext(AuthProvider);
  console.log('auth: ', auth)
  return auth;
}

export default useAuth;
