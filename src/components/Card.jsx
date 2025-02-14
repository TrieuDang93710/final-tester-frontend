/* eslint-disable react/prop-types */
import { AuthContext } from '@/contexts/AuthProvider';
import { useContext, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Card({ item }) {
  const url = `${import.meta.env.VITE_URL_API_ON_LOCAL}/cart`;
  const { name, image, price, _id } = item;

  const [isHeartFilled, setIsHeartFilled] = useState(false);
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

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  return (
    <div className='card shadow-xl relative mr-5 md:my-5'>
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? 'text-rose-500' : 'text-white'
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className='w-5 h-5 cursor-pointer' />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt='Shoes' className='hover:scale-105 transition-all duration-300 md:h-72' />
        </figure>
      </Link>
      <div className='card-body'>
        <Link to={`/menu/${item._id}`}>
          <h2 className='card-title'>{item.name}!</h2>
        </Link>
        <p className='line-clamp-2'>{item.recipe}</p>
        <div className='card-actions justify-between items-center mt-2'>
          <h5 className='font-semibold'>
            <span className='text-sm text-red'>$ </span> {item.price}
          </h5>
          <button className='btn bg-green text-white' onClick={() => handleAddToCart(item)}>
            Add to Cart{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
