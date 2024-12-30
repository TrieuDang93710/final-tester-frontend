import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/Main';
import AddMenu from '../pages/dashboard/admin/AddMenu';
import DashBoard from '../pages/dashboard/admin/DashBoard';
import ManagerItems from '../pages/dashboard/admin/ManagerItems';
import UpdateMenu from '../pages/dashboard/admin/UpdateMenu';
import User from '../pages/dashboard/admin/User';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import Home from '../pages/home/Home';
import Signup from '../pages/register/Signup';
import CartPage from '../pages/shop/CartPage';
import Menu from '../pages/shop/Menu';
import SignIn from '../pages/register/SignIn';
// import PrivateRouter from "../PrivateRouter/PrivateRouter";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/cart-page',
        element: <CartPage />
      },
      {
        path: '/update-profile',
        element: <UpdateProfile />
      }
    ]
  },
  {
    path: 'signin',
    element: <SignIn />
  },
  {
    path: 'signup',
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <DashBoard />
      },
      {
        path: 'add-menu',
        element: <AddMenu />
      },
      {
        path: 'manager-items',
        element: <ManagerItems />
      },
      {
        path: 'update-menu',
        element: <UpdateMenu />
      },
      {
        path: 'user',
        element: <User />
      }
    ]
  }
]);

export default router;
