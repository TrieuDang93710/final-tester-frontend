import { FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useMenu from '@/hooks/useMenu';
import useAxiosSecure from '@/hooks/useAxiosSecure';

function DashBoard() {
  const [menu] = useMenu();
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem('access-token');

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const rs = await axiosSecure.get('/user');
      return rs.data;
    }
  });

  const { data: payment = [] } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const rs = await fetch(`${import.meta.env.VITE_URL_API_ON_LOCAL}/payment`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      return rs.json();
    }
  });

  const paymentTotal = payment.reduce((sum, item) => {
    if (item.price) {
      return sum + item.price;
    }
    return;
  }, 0);
  return (
    <div className='md:w-[950px] w-full flex-col md:flex items-center justify-around m-4'>
      <div className='flex items-center justify-between m-4'>
        <h5>All Users</h5>
        <h5>Total users: </h5>
      </div>
      <div className='w-full flex items-center justify-around m-4'>
        <div className='md:w-1/4 w-full flex-col items-start justify-start rounded-sm shadow-md shadow-slate-200 bg-green gap-4 p-4 m-4 space-y-4'>
          <p className='text-xl text-white font-medium'>Doanh thu</p>
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-slate-900 font-bold'>{paymentTotal}</p>
            <FaUsers className='text-3xl text-white font-bold' />
          </div>
        </div>
        <div className='md:w-1/4 w-full flex-col items-start justify-start rounded-sm shadow-md shadow-slate-200 bg-purple-600 gap-4 p-4 m-4 space-y-4'>
          <p className='text-xl text-white font-medium'>Don hang</p>
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-slate-900 font-bold'>{payment.length}</p>
            <FaUsers className='text-3xl text-white font-bold' />
          </div>
        </div>
        <div className='md:w-1/4 w-full flex-col items-start justify-start rounded-sm shadow-md shadow-slate-200 bg-blue-500 gap-4 p-4 m-4 space-y-4'>
          <p className='text-xl text-white font-medium'>Tong khach hang</p>
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-slate-900 font-bold'>{users.length}</p>
            <FaUsers className='text-3xl text-white font-bold' />
          </div>
        </div>
        <div className='md:w-1/4 w-full flex-col items-start justify-start rounded-sm shadow-md shadow-slate-200 bg-orange-500 gap-4 p-4 m-4 space-y-4'>
          <p className='text-xl text-white font-medium'>Tong menu</p>
          <div className='flex items-center justify-between'>
            <p className='text-2xl text-slate-900 font-bold'>{menu.length}</p>
            <FaUsers className='text-3xl text-white font-bold' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
