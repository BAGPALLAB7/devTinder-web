import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Loadder from '../common/Loadder.jsx'
import ThemeToggle from '../common/ThemeToggle.jsx'
import axios from 'axios'
import { BASE_URL } from '../../utils/constaints.js'
import { useDispatch } from 'react-redux'
import { addUser } from '../../utils/userSlice.js'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const getUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile', { withCredentials: true });
      console.log("res from body get profile call ", res);

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status == 401) {
        setErrorMessage(true)
      }
      navigate('/login')
      console.log(error.message);

    }
  }
  useEffect(() => {
    getUser()
  },[])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body