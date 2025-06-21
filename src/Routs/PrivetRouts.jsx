import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate } from 'react-router';

const PrivetRouts = ({children}) => {

    const {user, loading} = UseAuth;


    if(loading) {
        return
    }

    if(!user) {
        return <Navigate to={"/login"}></Navigate>
    }
    return children;
};

export default PrivetRouts;