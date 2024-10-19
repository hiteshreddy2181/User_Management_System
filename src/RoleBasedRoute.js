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
  console.log("*************************", allowedRoles.includes(fields.role))
  if (auth && !allowedRoles.includes(fields.role)) {
    const dashboardPath = fields.role === 'client' ? '/client-dashboard' : fields.role === "jobseeker" ? '/jobseeker-dashboard' : '/recruiter-dashboard';
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%", dashboardPath)
    return <Navigate to={dashboardPath} state={{ from: location }} />;
  }

  return children;
};

export default RoleBasedRoute;
