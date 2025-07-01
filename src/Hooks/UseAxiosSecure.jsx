import axios from 'axios';
import React from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';


const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})



const UseAxiosSecure = () => {
    const { user, logout } = UseAuth()
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(config => {
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(res => {
        return res
    }, error => {
        const status = error.status;
        if(status === 403) {
            navigate("/forbidden")
        }
        else if(status === 401) {
            logout()
            .then(() => {
                navigate("/login")

            })
            .catch((err) => {
                console.log(err);
            })
        }
        return Promise.reject(error)
    })


    return axiosSecure;
};

export default UseAxiosSecure;