/* eslint-disable no-unused-vars */
import Modal from '@/components/Modal';
import { AuthContext } from '@/contexts/AuthProvider';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const { createUser, signUpWithGmail, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfor = {
            name: data.name,
            email: data.email
          };
          axiosPublic.post('/user', userInfor).then((response) => {
            console.log('response: ', response.data);
            alert('Signin successful!');
            navigate('/');
          });
        });
        document.getElementById('my_modal_5').close();
      })
      .catch((error) => {
        const errorCode = error.errorCode;
        const errorMesage = error.message;
      });
  };
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        console.log(user?.displayName, user?.email);
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email
        };
        axiosPublic.post('/user', userInfor).then((response) => {
          console.log(response);
          alert('Signin successful!');
          navigate('/');
        });
        document.getElementById('my_modal_5').close();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className='max-w-md bg-white shadow mx-auto my-20 flex items-center justify-center'>
      <div className='modal-action flex flex-col justify-center mt-0'>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body' method='dialog'>
          <h3 className='font-bold text-lg'>Create An Account!</h3>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input type='name' placeholder='name' className='input input-bordered' {...register('name')} />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input type='email' placeholder='email' className='input input-bordered' {...register('email')} />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input type='password' placeholder='password' className='input input-bordered' {...register('password')} />
            <label className='label'>
              <a href='#' className='label-text-alt link link-hover'>
                Forgot password?
              </a>
            </label>
          </div>
          <div className='form-control mt-6'>
            <input type='submit' value='Signup' className='btn bg-green text-white' />
          </div>
          <p className='text-center my-2'>
            Have an account?{' '}
            <Link to={'/signin'} className='underline text-red ml-1'>
              Login
            </Link>
          </p>
        </form>
        <div className='text-center space-x-3 mb-5'>
          <button className='btn btn-circle hover:bg-green hover:text-white' onClick={handleRegister}>
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
      <Modal />
    </div>
  );
}

export default Signup;
