import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthProvider';
import Card from '@/components/Card';

const MenuDetail = () => {
  const item = useLoaderData();
  console.log('item: ', item);

  const url = `${import.meta.env.VITE_URL_API_ON_LOCAL}/cart`;
  const { name, image, price, _id } = item;

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const localtion = useLocation();

  // Add to cart btn
  const handleAddToCart = () => {
    if (user && user?.email) {
      const cartItem = { menuItemId: _id, name, image, price, quantity: 1, email: user.email };
      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            console.log(data);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              title: 'Please Login?',
              text: "without an account can't able to add product!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Signup Now!'
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/signup', { state: { from: localtion } });
              }
            });
          }
        });
    }
  };
  return (
    <div className='section-container'>
      <div className='bg-gradient-to-r from-[#FAFAFA] fron-0% to-[#FCFCFC] to-100%'>
        <div className='py-20 flex flex-col items-center justify-center gap-8'>
          <div className='space-y-7 px-4'>
            <h3 className='md:text-4xl text-4xl md:leading-nug leading-snug font-bold'>
              Item Detail <span className='text-green'>Menu</span>
            </h3>
          </div>
        </div>
        {item !== null ? (
          <div className='flex w-full items-center justify-center gap-4 pb-4'>
            <div className='md:w-[40%] w-full flex-col items-start justify-start'>
              <Card item={item} />
            </div>
            <div className='md:w-1/2 w-full flex flex-col space-y-5 items-start justify-start'>
              <h2 className='text-3xl font-medium'>Ten thu pham : {item.name}</h2>
              <h3 className='text-3xl font-bold text-red'>Gia : {item.price}</h3>
              <h4 className='text-[16px] font-bold text-slate-900'>Mo ta : {item.recipe}</h4>
              <div className='md:w-1/2 w-full flex justify-between items-center mt-2'>
                <h5 className='font-semibold'>
                  <span className='text-sm text-red'>$ </span> {item.price}
                </h5>
                <button className='btn bg-green text-white' onClick={() => handleAddToCart(item)}>
                  Add to Cart{' '}
                </button>
              </div>
            </div>
          </div>
        ) : (
          'Not found menu item'
        )}
      </div>
    </div>
  );
};

export default MenuDetail;
