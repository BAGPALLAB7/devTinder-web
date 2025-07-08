import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../../utils/constaints';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../../utils/feedSlice';

const UserCard = ({ user, disabled }) => {
    const dispatch = useDispatch()
    const btnStatus = disabled ? true : false;
    console.log(user);
    const handleInterest = async (status, id) => {
        console.log("remove feed id :", id);
        
        try {
            const res = await axios.post(BASE_URL+"/request/sned/"+status+"/"+id, {},{withCredentials: true});
            console.log(res?.data?.message);
            dispatch(removeFeed(id));
        } catch (error) {
            console.log(error.message);
            
        }
    }
    return (
        <div className='flex justify-center my-5 '>
            <div className="card bg-base-300 w-96 shadow-sm rounded-3xl">
                
                    <img
                        src={user?.photoUrl}
                        alt="Profile photo" 
                        className={'max-h-80 max-w-full rounded-t-3xl' }
                        // height="50px"
                        // weight="50px"
                        />
                    

                <div className="card-body flex justify-center items-center">
                    <h2 className="card-title ">{(user?.firstName + " " + user?.lastName).toUpperCase()}</h2>
                    <p className="text-center max-w-prose">{user?.about}</p>
                    {user?.age && <p>Age: {user?.age}</p>}
                    {user?.gender && <p>Gender: {(user?.gender).toUpperCase()}</p>}
                    <div className="card-actions flex-row items-center">
                        <button className="btn btn-success" disabled={btnStatus} onClick={()=> handleInterest("interested",user?._id)}>Interested</button>
                        <button className="btn btn-warning" disabled={btnStatus} onClick={()=> handleInterest("ignored",user?._id)}>Ignore</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard