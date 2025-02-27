import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthProvider';

const Modal = () => {
  const [errorMessage, seterrorMessage] = useState('');
  const { signUpWithGmail, login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then(() => {
        const userInfor = {
          name: data.name,
          email: data.email
        };
        axios
          .post(`${import.meta.env.VITE_URL_API_ON_LOCAL}/user`, userInfor)
          .then((response) => {
            console.log(response);
            alert('Signin successful!');
            navigate(from, { replace: true });
          })
          .catch((error) => {
            seterrorMessage(error);
            alert(errorMessage);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage(errorMessage);
      });
    reset();
  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email
        };
        axios.post(`${import.meta.env.VITE_URL_API_ON_LOCAL}/user`, userInfor).then((response) => {
          console.log(response);
          alert('Signin successful!');
          navigate('/');
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id='my_modal_5' className='modal modal-middle sm:modal-middle'>
      <div className='modal-box'>
        <div className='modal-action flex-col justify-center mt-0'>
          <form className='card-body' method='dialog' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='font-bold text-lg'>Please Login!</h3>

            {/* email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input type='email' placeholder='email' className='input input-bordered' {...register('email')} />
            </div>

            {/* password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                placeholder='password'
                className='input input-bordered'
                {...register('password', { required: true })}
              />
              <label className='label'>
                <a href='#' className='label-text-alt link link-hover mt-2'>
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? <p className='text-red text-xs italic'>Provide a correct username & password.</p> : ''}

            {/* submit btn */}
            <div className='form-control mt-4'>
              <input type='submit' className='btn bg-green text-white' value='Login' />
            </div>

            {/* close btn */}
            <div
              htmlFor='my_modal_5'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={() => document.getElementById('my_modal_5').close()}
            >
              ✕
            </div>

            <p className='text-center my-2'>
              Donot have an account?
              <Link to='/signup' className='underline text-red ml-1'>
                Signup Now
              </Link>
            </p>
          </form>
          <div className='text-center space-x-3 mb-5'>
            <button onClick={handleRegister} className='btn btn-circle hover:bg-green hover:text-white'>
              <FaGoogle />
            </button>
            <button className='btn btn-circle hover:bg-green hover:text-white'>
              <FaFacebookF />
            </button>
            <button className='btn btn-circle hover:bg-green hover:text-white'>
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
