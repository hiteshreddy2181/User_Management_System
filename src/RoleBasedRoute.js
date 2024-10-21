import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AppContext from './Context/AppContext';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { auth, fields } = useContext(AppContext);
  const location = useLocation();
  console.log("-----Inside RoleBasedRoute--- auth-", auth, " field: ", fields);
  
  if (auth === null) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!auth) {
    return <Navigate to="/" />;
  }
  console.log("*************************", allowedRoles.includes(fields.ROLE))
  if (auth && !allowedRoles.includes(fields.ROLE)) {
    const dashboardPath = fields.ROLE === 'student' ? '/student-dashboard' : '/admin-dashboard';
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", dashboardPath)
    return <Navigate to={dashboardPath} state={{ from: location }} />;
  }

  return children;
};

export default RoleBasedRoute;
