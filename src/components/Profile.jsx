/* eslint-disable react/prop-types */
import { AuthContext } from '@/contexts/AuthProvider';
import useAdmin from '@/hooks/useAdmin';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Profile({ user }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();

  const handleLogout = () => {
    logout()
      .then(() => {
        alert('Logout successful!');
        navigate('/');
      })
      .catch(() => {});
  };
  return (
    <div>
      <div className='drawer drawer-end z-50'>
        <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          {/* Page content here */}
          <label htmlFor='my-drawer-4' className='drawer-button btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              {user.photoURL ? (
                <img alt='Tailwind CSS Navbar component' src={user.photoURL} />
              ) : (
                <img
                  alt='Tailwind CSS Navbar component'
                  src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                />
              )}
            </div>
          </label>
        </div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer-4' aria-label='close sidebar' className='drawer-overlay'></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
            {/* Sidebar content here */}
            <li>
              <Link to={'/update-profile'}>Profile</Link>
            </li>
            {!isAdmin && (
              <li>
                <Link to={'/order-page'}>Order</Link>
              </li>
            )}
            <li>
              <Link to={'/'}>Settings</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to={'/dashboard'}>Dashboard</Link>
              </li>
            )}
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
