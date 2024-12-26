import React, { useState, useEffect, useContext } from 'react'
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

function NavBar() {
  const menuItems = [
    { href: '/', title: 'Home' },
    { href: '/', title: 'Menu', subItems: ['All', 'Salad', 'Pizza'] },
    { href: '/', title: 'Services', subItems: ['Online Orders', 'Table Bootting', 'Order Tracking'] },
    { href: '/', title: 'Offers' }
  ];
  const navItems = menuItems.map((item, index) =>
    item.subItems == undefined ? <>
      <li><a href='/'>{item.title}</a></li>
    </>
      : <>
        <li>
          <details>
            <summary>{item.title}</summary>
            <ul className="p-2">
              {item.subItems.map(element =>
                <li><a href='/menu'>{element}</a></li>
              )}
            </ul>
          </details>
        </li>
      </>
  )
  const [sticky, setSticky] = useState(false)
  const { user } = useContext(AuthContext)
  console.log(user);

  const [cart, refetch] = useCart()
  console.log(cart);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.addEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className='max-w-screen-2xl container mx-auto bg-white fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out'>
      <div className={`navbar xl:px-24 ${sticky ? "shadow-md  text-black transition-all duration-300 ease-in-out" : ""}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItems}
            </ul>
          </div>
          <a>
            <img src={logo} alt="" width={50} height={50} />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/** search */}
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          {/** cart item */}
          <Link to={'/cart-page'}>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:flex hidden items-center justify-center mr-3">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
              </div>
            </div>
          </Link>
          {/** login btn */}
          {
            user ? <Profile user={user} /> : <button
              onClick={() => document.getElementById('my_modal_5').showModal()}
              className="btn rounded-full bg-green px-6 flex items-center gap-2 text-white"><FaRegUser /> Login</button>
          }
          <Modal />
        </div>
      </div>
    </header>
  )
}

export default NavBar