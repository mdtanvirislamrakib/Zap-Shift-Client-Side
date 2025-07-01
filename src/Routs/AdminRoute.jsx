import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/UseAuth';
import useUserRole from '../Hooks/useUserRole';
import Loader from '../Components/Loader/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = useUserRole();
  const location = useLocation(); // <-- Needed for redirect state

  if (loading || isLoading) {
    return <Loader />;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AdminRoute;
