import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '@/hooks/useCart';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_SECRET_KEY}`);

function Payment() {
  const [cart] = useCart();
  console.log('cart: ', cart);
  const calculatePrice = (item) => {
    return item.quantity * item.price;
  };
  const cartTotal = cart.reduce((sum, item) => sum + calculatePrice(item), 0);
  console.log('cartTotal: ', cartTotal);
  const totalPrice = parseFloat(cartTotal.toFixed(2));
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 pt-20 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%'>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={totalPrice} cart={cart} />
      </Elements>
    </div>
  );
}

export default Payment;
