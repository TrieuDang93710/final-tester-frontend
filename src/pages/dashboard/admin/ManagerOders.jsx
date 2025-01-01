import { TbTruckDelivery } from 'react-icons/tb';
import { MdCancel } from 'react-icons/md';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import OrderStatus from '@/enums/orderStatus';

function ManagerOrders() {
  const axiosSecure = useAxiosSecure();
  const token = localStorage.getItem('access-token');
  console.log('token: ', token);
  const { refetch, data: payment = [] } = useQuery({
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

  const handleMakeDeliveryStatus = (item) => {
    axiosSecure
      .patch(
        `/payment/admin/${item._id}`,
        { status: 'order delivery' },
        {
          headers: {
            Authorization: `Bearer${token}`
          }
        }
      )
      .then(() => {
        alert(`Order status is updated`);
        refetch();
      });
  };

  const handleMakeCompleteStatus = (item) => {
    axiosSecure
      .patch(
        `/payment/admin/${item._id}`,
        { status: 'order completed' },
        {
          headers: {
            Authorization: `Bearer${token}`
          }
        }
      )
      .then(() => {
        alert(`Order status is updated`);
        refetch();
      });
  };

  const handleMakeCancelStatus = (item) => {
    axiosSecure
      .patch(
        `/payment/admin/${item._id}`,
        { status: 'order cancelled' },
        {
          headers: {
            Authorization: `Bearer${token}`
          }
        }
      )
      .then(() => {
        alert(`Order status is updated`);
        refetch();
      });
  };

  return (
    <div>
      <div className='flex items-center justify-between m-4'>
        <h5>All Orders</h5>
        <h5>Total orders: {payment.length}</h5>
      </div>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead className='bg-green text-white rounded-sm'>
            <tr>
              <th>#</th>
              <th>Order Date</th>
              <th>Transition Id</th>
              <th>Price</th>
              <th>Status</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payment.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.createAt}</td>
                <td>{item.transitionId}</td>
                <td>{item.price}</td>
                <td>
                  <p
                    className={`${
                      item.status === OrderStatus.ORDER_PENDING
                        ? 'text-white text-center bg-yellow-400 rounded-md px-2 py-1'
                        : item.status === OrderStatus.ORDER_DELIVERY
                        ? 'text-white text-center bg-purple-500 px-2 rounded-md py-1'
                        : item.status === OrderStatus.ORDER_COMPLETED
                        ? 'text-white text-center bg-green px-2 rounded-md py-1'
                        : 'text-white text-center bg-red px-2 rounded-md py-1'
                    }`}
                  >
                    {' '}
                    {item.status}
                  </p>
                </td>
                <td>{item.email}</td>
                <td className='flex gap-2'>
                  <button
                    onClick={() => handleMakeDeliveryStatus(item)}
                    className='btn btn-xs btn-circle bg-indigo-500 text-white'
                  >
                    <TbTruckDelivery />
                  </button>
                  <button
                    onClick={() => handleMakeCompleteStatus(item)}
                    className='btn btn-xs btn-circle bg-green text-white'
                  >
                    <IoCheckmarkDoneCircle />
                  </button>
                  <button
                    onClick={() => handleMakeCancelStatus(item)}
                    className='btn btn-xs btn-circle bg-red text-white'
                  >
                    <MdCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerOrders;
