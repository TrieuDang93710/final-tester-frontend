/* eslint-disable no-unused-vars */
import { AuthContext } from '@/contexts/AuthProvider';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateProfile() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { updateUserProfile } = useContext(AuthContext);
  const image_hosting_key = '2c274d9864cbfc376e7800ed110baed1';
  console.log('image_hosting_key: ', image_hosting_key);
  const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    const name = data.name;
    const photoURL = data.photoURL;

    const res = updateUserProfile(name, photoURL)
      .then((res) => {
        if (res) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your profile is updated successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // const imageFile = { image: data.image[0] };
    // const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // });
    // if (hostingImg.data.success) {
    //   const data = {
    //     name: data.name,
    //     image: hostingImg.data.data.display_url
    //   };
    // }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
        <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='font-bold'>Update Your Profile</h3>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              {...register('name')}
              type='text'
              placeholder='your name'
              className='input input-bordered'
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Upload Photo</span>
            </label>

            <input
              type='text'
              {...register('photoURL')}
              placeholder='photoURL'
              className='input input-bordered'
              required
            />

            {/* TODO: Uplodaing image will be later */}
            <input type='file' className='file-input w-full max-w-xs' />
          </div>
          <div className='form-control mt-6'>
            <button className='btn bg-green text-white'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
