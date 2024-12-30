import { Link, Outlet } from 'react-router-dom';
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md';
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser
} from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';

import logo from '/logo.png';
import useAdmin from '../hooks/useAdmin';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import SignIn from '../pages/register/SignIn';

const sharedLinks = (
  <>
    <li className='mt-3'>
      <Link to='/'>
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
      <Link to='/menu'>
        <FaCartShopping /> Menu
      </Link>
    </li>
    <li>
      <Link to='/menu'>
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to='/menu'>
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

function DashboardLayout() {
  const { loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  return (
    <div>
      {isAdmin ? (
        <div className='drawer sm:drawer-open'>
          <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content flex items-start justify-start sm:items-start sm:justify-center'>
            <div className='flex md:flex-col flex-row sm:items-center sm:justify-between'>
              <label htmlFor='my-drawer-2' className='btn btn-primary drawer-button lg:hidden'>
                <MdDashboardCustomize />
              </label>
              <button className='btn rounded-full bg-green text-white flex items-center gap-3 px-3 lg:hidden'>
                <FaRegUser /> Logout
              </button>
            </div>
            <div className='mt-5 md:mt-2 mx-4'>
              <Outlet />
            </div>
          </div>
          <div className='drawer-side'>
            <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
            <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
              <li>
                <Link to='/dashboard' className='flex justify-start mb-3'>
                  <img src={logo} alt='' className='w-20' />
                  <span className='badge badge-primary'>admin</span>
                </Link>
              </li>
              <hr />
              <li className='mt-3'>
                <Link to='/dashboard'>
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <Link to='/dashboard'>
                  <FaShoppingBag /> Manage Bookings
                </Link>
              </li>
              <li>
                <Link to='/dashboard/add-menu'>
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li>
                <Link to='/dashboard/manager-items'>
                  <FaEdit /> Manage Items
                </Link>
              </li>
              <li className='mb-3'>
                <Link to='/dashboard/user'>
                  <FaUser /> All Users
                </Link>
              </li>
              <hr />
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : loading ? (
        <SignIn />
      ) : (
        <div className='h-screen flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold py-4'>Only admin role must be allowed to dashboard</h1>
          <Link to='/'>
            <button className='btn bg-green text-white'>Back to Home</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
