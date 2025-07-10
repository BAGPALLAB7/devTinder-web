import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constaints';

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loginForm, setLoginForm] = useState(true);
    const [password, setPassword] = useState("");
    const [consifmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                email,
                password
            }, { withCredentials: true })
            dispatch(addUser(res.data.data));
            navigate("/");
        } catch (error) {
            setError(true)
            setErrorMessage(error.response?.data || "Something went wrong / check internet connection")

        }
    }

    const handleSignUp = async () => {
        try {
            
            const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, email, password },{withCredentials: true})
            navigate("/profile");
            dispatch(addUser(res?.data?.data))
        } catch (error) {
            setError(true)
            setErrorMessage(error.response?.data || "Something went wrong / check internet connection")
        }
    }
    const checkPasswordMatch = () => {
        
        if (password != consifmPassword) {
            setError(true);
            setErrorMessage("Confirm password is not matched with password")
        }
        else {
            setError(false)
        }
    }
    useEffect(() => {
        setError(false)
        if (!loginForm) {
            checkPasswordMatch()
        }
    }, [password, consifmPassword,firstName,lastName,email])
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user])
    return (
        <div className='flex justify-center mt-10'>
            <div className="card bg-base-200 text-primary-content w-96">
                <div className="card-body items-center">
                    <h2 className="card-title">Login</h2>
                    {!loginForm && <><input type="name" value={firstName} onChange={(e) => {setFirstName(e.target.value);setError(false)}} placeholder="First Name" className="input rounded-lg mt-3 mb-2" />
                        <input type="name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="input rounded-lg mt-3 mb-2" /></>}

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input rounded-lg mt-3 mb-2" />
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }
                    } placeholder="Password" className="input rounded-lg mb-3" />

                    {!loginForm && <input type="password" value={consifmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="input rounded-lg mb-3" />}
                    {
                        error && <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    }

                    <div className="card-actions">
                        <button className="btn" onClick={loginForm? handleLogin: handleSignUp} disabled={error}>{loginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    {loginForm ?
                        <p onClick={() => setLoginForm(false)}>New to DevTinder? <span className='cursor-pointer text-blue-300'>
                            Sign Up
                        </span>
                        </p> : <p onClick={() => setLoginForm(true)}>Existing user? <span className='cursor-pointer text-blue-300'>
                            Login
                        </span>
                        </p>}
                </div>
            </div>

        </div>
    )
}

export default Login
