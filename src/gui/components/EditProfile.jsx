import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../../utils/constaints';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice.js'
import UserCard from './UserCard.jsx'


const EditProfile = ({ user }) => {
    const User = user;
    const [firstName, setFirstName] = useState(User?.firstName);
    const [lastName, setLastName] = useState(User?.lastName);
    const [about, setAbout] = useState(User?.about);
    const [age, setAge] = useState(User?.age);
    const [gender, setGender] = useState(User?.gender);

    const [skills, setSkills] = useState(User?.skills);
    const [photoUrl, setPhotoUrl] = useState(User?.photoUrl);
    const [error, setError] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const handleEditProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', {
                firstName, lastName, age: parseInt(age), gender: (gender)?.toLowerCase(), about, photoUrl, skills
            }, { withCredentials: true })
            console.log(res?.data?.data);
            dispatch(addUser(res?.data?.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
            }, 3000)
        } catch (error) {
            setError(error?.message ? error.message : "Somethign went wrong!")
            console.log(error);
        }
    }
    const obj = {
        firstName, lastName, age: parseInt(age), gender: (gender)?.toLowerCase(), about, photoUrl, skills
    }

    return (
        <div className='flex flex-row justify-center items-center gap-4'>
        {showToast &&
            <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
            <div className='flex justify-center'>
                <div className="card bg-base-300 text-primary-content w-96">
                    <div className="card-body items-center">
                        <h2 className="card-title">Edit Profile</h2>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="input rounded-lg mt-3 mb-2" />
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="input rounded-lg mb-2" />
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="age" className="input rounded-lg mb-2" />
                        <select value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" className="select rounded-lg mb-2">
                            <option value="">Select Gender</option>  {/* This is the placeholder */}
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        <input type="text-area" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About" className="textarea rounded-lg mb-2" />
                        <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Photo Url" className="input rounded-lg mb-2" />

                        {
                            error && <div role="alert" className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{errorMessage}</span>
                            </div>
                        }
                        <div className="card-actions">
                            <button className="btn" onClick={handleEditProfile}>Save</button>
                        </div>
                    </div>
                </div>

            </div>
            <UserCard user={obj} disabled={true}/>
        </div>
    )
}

export default EditProfile