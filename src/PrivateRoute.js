import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import RoleContext from '../../Context/RoleContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { role } = useContext(RoleContext);

  if (!role) {
    return <Navigate to="/login" />;
  }

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/client-dashboard" />;
};

export default PrivateRoute;
