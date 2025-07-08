import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constaints';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../../utils/connectionsSlice';

const Connections = () => {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()
    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true })
            if (res?.data?.data) {
                dispatch(addConnections(res?.data?.data))
            }
            console.log(res?.data?.data);


        } catch (error) {
            console.log(error.essage);

        }
    }
    useEffect(() => {
        getConnections()
    }, [])

    if (!connections || connections?.length === 0) {
        return (
            <div className='flex justify-center mt-10'>
                <h1 className='font-bold text-2xl'>No connections</h1>
            </div>)
    }
    return (
        <div className='flex flex-col items-center mt-10 text-center'>
            <h1 className='font-bold text-2xl mb-10'>Connections</h1>
            <div className='flex flex-col w-1/2 justify-center'>
                {connections?.map((connection) => {
                    const {_id, firstName, lastName, photoUrl, about } = connection;
                    return (
                        <div key={_id} className='flex h-20 bg-base-300 my-2 items-center rounded-full'>
                            <img src={photoUrl} className='h-20 w-20 rounded-full' />
                            <div className='ml-5 justify-items-start'>
                                <p className='text font-bold'>{firstName} {lastName}</p>
                                <p className='text-sm'>{about}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connections