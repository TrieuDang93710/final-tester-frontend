import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import '../App.css';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

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