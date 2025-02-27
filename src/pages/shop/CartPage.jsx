/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useCart from '@/hooks/useCart';
import { AuthContext } from '@/contexts/AuthProvider';

function CartPage() {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // calculate price
  const calculatePrice = (item) => {
    return item.quantity * item.price;
  };

  // calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  // Decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`${import.meta.env.VITE_URL_API_ON_LOCAL}/cart/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          quantity: item.quantity - 1
        })
      })
        .then((res) => res.json())
        .then((data) => {
          const updateCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1
              };
            }
            return cartItem;
          });
          refetch();
          setCartItems(updateCart);
        });
      refetch();
    } else {
      alert("Item can't be zero!");
    }
  };

  // Increase function
  const handleIncrease = (item) => {
    fetch(`${import.meta.env.VITE_URL_API_ON_LOCAL}/cart/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        quantity: item.quantity + 1
      })
    })
      .then((res) => res.json())
      .then((data) => {
        const updateCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updateCart);
      });
    refetch();
  };

  // Delete item to cart
  const handleDeleteCartItem = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_URL_API_ON_LOCAL}/cart/${item._id}`, {
          method: 'DELETE'
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
              });
            }
          });
      }
    });
  };
  return (
    <div className='section-container'>
      {/** banner */}
      <div className='bg-gradient-to-r from-[#FAFAFA] fron-0% to-[#FCFCFC] to-100%'>
        <div className='py-36 flex flex-col items-center justify-center gap-8'>
          {/** texts */}
          <div className='space-y-7 px-4'>
            <h3 className='md:text-5xl text-4xl md:leading-nug leading-snug font-bold'>
              Item Add To The <span className='text-green'>Cart</span>
            </h3>
          </div>
        </div>
      </div>
      {/** table */}
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead className='bg-green text-white rounded-sm'>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle w-12 h-12'>
                        <img src={item.image} alt='Avatar Tailwind CSS Component' />
                      </div>
                    </div>
                  </div>
                </td>
                <td className='font-medium'>{item.name}</td>
                <td>
                  <button className='btn btn-xs' onClick={() => handleDecrease(item)}>
                    -
                  </button>
                  <input
                    type='number'
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className='w-10 mx-2 text-center overflow-hidden appearance-none'
                  />
                  <button className='btn btn-xs' onClick={() => handleIncrease(item)}>
                    +
                  </button>
                </td>
                <td>{calculatePrice(item).toFixed(2)}</td>
                <th>
                  <button className='btn btn-ghost btn-xs text-red' onClick={() => handleDeleteCartItem(item)}>
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/** Customer details */}
      <div className='my-15 flex flex-col md:flex-row items-center justify-around'>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User_id: {user.uid}</p>
        </div>
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Shopping Details</h3>
          <p>Total Item: {cart.length}</p>
          <p>Total Price: ${orderTotal.toFixed(2)}</p>
          <Link to={'/process-checkout'}>
            <button className='btn bg-green text-white'>Proccess Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
