import OrderStatus from '@/enums/orderStatus';
import usePayment from '@/hooks/usePayment';
import {} from 'react-icons/fa';

function OrderPage() {
  const [payment] = usePayment();
  console.log('payments ', payment);
  return (
    <div className='pt-20 section-container -z-0'>
      <div className='bg-gradient-to-r from-[#FAFAFA] fron-0% to-[#FCFCFC] to-100%'>
        <div className='py-12 flex flex-col items-center justify-center gap-8'>
          {/** texts */}
          <div className='space-y-7 px-4'>
            <h3 className='md:text-5xl text-4xl md:leading-nug leading-snug font-bold'>
              Track All Your <span className='text-green'>Order!</span>
            </h3>
          </div>
        </div>
      </div>
      <div className='overflow-x-auto -z-0'>
        <table className='table -z-0'>
          {/* head */}
          <thead className='bg-green text-white rounded-sm'>
            <tr>
              <th>#</th>
              <th>Order Date</th>
              <th>Transition Id</th>
              <th>Price</th>
              <th>Status</th>
              <th>Contact</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderPage;
