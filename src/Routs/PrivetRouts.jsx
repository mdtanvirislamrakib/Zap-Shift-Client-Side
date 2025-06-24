import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate } from 'react-router';
import Loader from '../Components/Loader/Loader';

const PrivetRouts = ({ children }) => {

    const { user, loading } = UseAuth();


    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate to={"/login"}></Navigate>;
    }

    return children;


};

export default PrivetRouts;