import React, { useEffect, useState } from 'react'
import ThemeToggle from '../common/ThemeToggle'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../../utils/constaints';
import { Link, useNavigate } from 'react-router-dom';

const navbar = () => {
    const currentUser = useSelector((store) => store.user);
    const  [user, setUser] = useState(currentUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            dispatch(removeUser())
            await  axios.post(BASE_URL + "/logout",{},{ withCredentials: true})
            navigate("/login")
        } catch (error) {
            console.log(error.message);
        }
    }
useEffect(()=>{
    setUser(currentUser)
},[currentUser])
    
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl"> DevTinder 💐</Link>
            </div>
            <div className="flex flex-row items-center mr-5">
                <ThemeToggle />
                {user &&
                    <>
                        <div className="dropdown dropdown-end m-4">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                    <span className="badge badge-sm indicator-item">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoUrl} 
                                        // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlA9S19kdxOC5NKPh33s4hnN2tuRxgP9SA8aHO3FtziFyWuOk5UaYN3nyMHGrbaSUJ3BA&usqp=CAU'

                                        />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link to={'/requests'}>Requests</Link></li>
                                <li><Link to={'/connections'}>Connections</Link></li>
                                <li onClick={handleLogout}><a>Logout</a></li>
                            </ul>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default navbar
