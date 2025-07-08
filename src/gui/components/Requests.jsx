import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constaints';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../../utils/requestsSlice';


const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()
    const getRequests = async () => {
        try {
            console.log("get requests callaed");
            
            const res = await axios.get(BASE_URL + '/user/requests/pending', { withCredentials: true })
            if (res?.data?.data) {
                dispatch(addRequests(res?.data?.data))
            }else{

                dispatch(addRequests([]))
            }
            console.log(res?.data?.data);
        } catch (error) {
            console.log(error);

        }
    }
    const reviewRequest = async (status, id) => {
        console.log("request id: ", id);
        try {
            const res = await axios.post(BASE_URL+ "/request/review/"+status+"/"+id, {},{withCredentials: true});
            console.log(res?.data);
            dispatch(removeRequest(id));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRequests()
    },[])
    if (!requests || requests?.length === 0) {
        return (
            <div className='flex justify-center mt-10'>
                <h1 className='font-bold text-2xl'>No New Requests</h1>
            </div>)
    }
    return (
        <div className='flex flex-col items-center mt-10 text-center'>
            <h1 className='font-bold text-2xl mb-10'>Requests</h1>
            <div className='flex flex-col w-3/4 justify-center'>
                {requests?.map((request) => {
                    const { _id, firstName, lastName, photoUrl, about, age, gender } = request.fromUserId;
                    return (
                        <div key={_id} className='flex h-20 bg-base-300 my-2 items-center rounded-full justify-between'>
                            <div className="flex items-center">
                                <img src={photoUrl} className='h-20 w-20 rounded-full' />
                                <div className='ml-5 justify-items-start'>
                                    <p className='text font-bold'>{firstName} {lastName}</p>
                                    <p className='text-xs'>{about}</p>
                                    <p className='text-xs'>Age: {age}, {(gender)?.toUpperCase()}</p>
                                    {/* <p className='text-sm'>{gender}</p> */}

                                </div>
                            </div>
                            <div className=' flex gap-2 mr-10'>
                                <button className="btn btn-outline btn-error" onClick={()=>reviewRequest("rejected", request._id)}>Reject</button>
                                <button className="btn btn-outline btn-success" onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Requests