import { createBrowserRouter } from 'react-router-dom';
import { Result } from 'postcss';
import axios from 'axios';
import Main from '@/layout/Main';
import Home from '@/pages/home/Home';
import Menu from '@/pages/shop/Menu';
import MenuDetail from '@/pages/shop/MenuDetail';
import CartPage from '@/pages/shop/CartPage';
import Payment from '@/pages/shop/Payment';
import OrderPage from '@/pages/shop/Order';
import UpdateProfile from '@/pages/dashboard/UpdateProfile';
import SignIn from '@/pages/register/SignIn';
import Signup from '@/pages/register/Signup';
import DashboardLayout from '@/layout/DashboardLayout';
import DashBoard from '@/pages/dashboard/admin/DashBoard';
import AddMenu from '@/pages/dashboard/admin/AddMenu';
import ManagerItems from '@/pages/dashboard/admin/ManagerItems';
import ManagerOrders from '@/pages/dashboard/admin/ManagerOders';
import UpdateMenu from '@/pages/dashboard/admin/UpdateMenu';
import User from '@/pages/dashboard/admin/User';

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
        path: '/menu/:id',
        element: <MenuDetail />,
        loader: async ({ params }) => {
          const response = await axios.get(`${import.meta.env.VITE_URL_API_ON_LOCAL}/menu/${params.id}`);
          if (!response) {
            throw new Result('Not found', { status: 404 });
          }
          return response.data;
        }
      },
      {
        path: '/cart-page',
        element: <CartPage />
      },
      {
        path: '/process-checkout',
        element: <Payment />
      },
      {
        path: '/order-page',
        element: <OrderPage />
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
        path: 'manager-orders',
        element: <ManagerOrders />
      },
      {
        path: 'update-menu/:id',
        element: <UpdateMenu />,
        loader: async ({ params }) => {
          const response = await axios.get(`${import.meta.env.VITE_URL_API_ON_LOCAL}/menu/${params.id}`);
          if (!response) {
            throw new Result('Not found', { status: 404 });
          }
          return response.data;
        }
      },
      {
        path: 'user',
        element: <User />
      }
    ]
  }
]);

export default router;
