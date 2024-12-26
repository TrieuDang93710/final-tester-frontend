import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider';

function Modal() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { signUpWithGmail, login, } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("")

  // Rediraation to home page or Specifig page
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"

  // Login with form
  const onSubmit = (data) => {
    const email = data.email
    const password = data.password
    login(email, password).then((res) => {
      const user = res.user
      const userInfor = {
        name: data.name,
        email: data.email,
      };
      axios
        .post("http://localhost:3000/user", userInfor)
        .then((response) => {
          // console.log(response);
          alert("Signin successful!");
          // navigate(from, { replace: true });
          navigate("/");
        });
      document.getElementById("my_modal_5").close()
    }).catch((error) => {
      const errorMessage = error.message
      setErrorMessage("Provider a correct email and password")
    })
  };

  //signin with google
  const handleLoginWithGoogle = () => {
    signUpWithGmail().then((res) => {
      const user = res.user
      alert("Login Successfull!")
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-lg">Please Login!</h3>
            {/** email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
            </div>
            {/** password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            {/** error */}
            {
              errorMessage ? <p className='text-red text-sm italic'>{errorMessage}</p> : ""
            }
            {/* login btn */}
            <div className="form-control mt-6">
              <input type="submit" value="Login" className="btn bg-green text-white" />
            </div>
            <p className="text-center my-2">
              Donot have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>{" "}
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button>
          </form>
          {/* social sign in */}
          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLoginWithGoogle}>
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default Modal