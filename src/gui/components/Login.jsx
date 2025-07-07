import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("pallab.bag@gmail.com");
    const [password, setPassword] = useState("Pallab@12345");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:7777/login", {
                email,
                password
            }, { withCredentials: true })
            console.log(res.data);
            dispatch(addUser(res.data.data));
            navigate("/");
        } catch (error) {
            setError(true)
            setErrorMessage(error.response?.data || "Something went wrong / check internet connection")

        }
        console.log("email", email, "password", password);


    }
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

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input rounded-lg mt-3 mb-2" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input rounded-lg mb-3" />
                    {
                        error && <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    }
                    <div className="card-actions">
                        <button className="btn" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login
