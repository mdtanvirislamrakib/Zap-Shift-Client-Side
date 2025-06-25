import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Components/Loader/Loader';

const PrivetRouts = ({ children }) => {

    const { user, loading } = UseAuth();
    const location = useLocation();

    if (loading) {
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate state={{from: location.pathname}} to={"/login"}></Navigate>;
    }

    return children;


};

export default PrivetRouts;