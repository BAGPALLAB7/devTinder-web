import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const User = useSelector((store)=> store.user);
  return (
    <div>
      <EditProfile user={User}/>
    </div>
  )
}

export default Profile
