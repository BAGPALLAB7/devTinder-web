import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constaints';
import { addFeeds } from '../../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';
import Loadder from '../common/Loadder';

const Feed = () => {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user);
    const feeds = useSelector((store) => store.feed);
    const navigate = useNavigate()
    useEffect(() => {
        console.log("feed calls");
        
        if (!user) {
            return navigate('/login')
        }
        else{
            getFeed()
        }
    }, [])
    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
            console.log(res.data?.data);
            dispatch(addFeeds(res.data?.data))
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        feeds &&
        <div>
            {/* <Loadder/> */}
            {feeds ?
                <UserCard user={feeds[0]} />
                : <Loadder />
            }
        </div>
    )
}

export default Feed
