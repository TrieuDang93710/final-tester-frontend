import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AuthContext } from '@/contexts/AuthProvider';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

function Main() {
  const { loading } = useContext(AuthContext);
  return (
    <div className='bg-primaryBG'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <NavBar />
          <div className='min-h-screen'>
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Main;
