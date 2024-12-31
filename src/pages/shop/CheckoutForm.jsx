/* eslint-disable react/prop-types */
import { AuthContext } from '@/contexts/AuthProvider';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutForm({ price, cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cartError, setCartError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (price !== 'price' && price < 1) {
      return;
    }
    axiosSecure.post('/create-payment-intent', { price }).then((res) => {
      console.log('res: ', res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // create card element
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setCartError(error.message);
      console.log('[error]', cartError);
    } else {
      setCartError('success');
      console.log('[PaymentMethod]', paymentMethod);
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'anonymous',
          email: user?.email || 'unknown'
        }
      }
    });
    if (confirmError) {
      console.log('confirmError: ', confirmError);
    }
    console.log('paymentIntent: ', paymentIntent);
    if (paymentIntent.status === 'succeeded') {
      console.log('paymentIntentId: ', paymentIntent.id);
      setCartError(`Your transition id is ${paymentIntent.id}`);

      const paymentInformation = {
        email: user.email,
        transitionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: 'order pending',
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemId)
      };
      console.log('paymentInformation: ', paymentInformation);
      axiosSecure.post('/payment', paymentInformation).then((res) => {
        console.log('data: ', res.data);
        alert('Payment Successful!!!');
        navigate('/order-page');
      });
    }
  };

  return (
    <div className='flex justify-center py-6'>
      <div className='w-1/2 flex flex-col items-start justify-start'>
        <h2 className='text-3xl font-bold py-4'>Order Checkout</h2>
        <h4 className='text-xl font-medium py-2'>Total Price : {price}$</h4>
        <h4 className='text-xl font-medium py-2'>Quantity Item : {cart.length}</h4>
      </div>
      <div className='md:w-1/3 w-full py-5 px-3 gap-5 space-y-3 shadow-md rounded-sm shadow-slate-600 flex flex-col items-start justify-start'>
        <h4 className='text-2xl font-bold'>Process your payment!</h4>
        <h5 className='text-xl font-bold py-4'>Credit/Debit cash</h5>
        {/* stripe */}
        <form className='w-full h-[60px] flex-col items-start justify-start space-y-6 gap-4' onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#9e2146'
                }
              }
            }}
          />
          <button
            className='w-full text-white bg-green py-2 rounded-sm shadow-md shadow-slate-500'
            type='submit'
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
        {cartError ? <p className='text-red'>{cartError}</p> : ''}
        <button
          className='w-full text-white bg-blue-500 py-2 rounded-sm shadow-md shadow-slate-500'
          type='submit'
          disabled={!stripe}
        >
          Pay pal
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;
