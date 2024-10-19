import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AppContext from './Context/AppContext';
import ClientAppBarComponent from './ClientComponent/ClientAppBarComponent/ClientAppBarComponent';
import Loginn from './ClientComponent/Login/login';
import Signup from './ClientComponent/Login/signup';
import Start from './ClientComponent/Login/start';
import RoleBasedRoute from './RoleBasedRoute';
import PostRequirements from './ClientComponent/Requirements/Requirements';
import ViewProfiles from './ClientComponent/ViewProfiles/ViewProfiles';
import RecruiterLogin from './RecruiterComponent/Login/RecruiterLogin';
import RecruiterRegister from './RecruiterComponent/Login/RecruiterRegister';
import RecruiterAppBarComponent from './RecruiterComponent/RecruiterAppBar/RecruiterAppBarComponent';
import ApplyForPosition from './RecruiterComponent/ApplyForPosition/ApplyForPosition';
import StatusOfPosition from './RecruiterComponent/StatusOfPosition/StatusOfPosition';
import { ProtectedRoute } from './ProtectedRoute';
import AppProvider from './Context/AppProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chat from './Chat/ChatWIndow.js';
import JobSeekerAppbarComponent from './JobSeekerComponent/JobSeekerAppBar/JobSeekerAppbarComponent';
import JobSeekerApplyForPosition from './JobSeekerComponent/JobSeekerApplyForPosition/JobSeekerApplyForPosition';
import JobSeekerStatusOfPosition from './JobSeekerComponent/StatusOfPosition/JobSeekerStatusOfPosition';
import JobSeekerLogin from './JobSeekerComponent/Login/JobSeekerLogin';
import JobSeekerRegister from './JobSeekerComponent/Login/JobSeekerRegister';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
        },
      },
    },
  },
});


const App = () => {
  const { auth, fields } = useContext(AppContext);
  const RedirectToDashboard = () => {
    if (auth && fields.role) {
      if (fields.role === 'client') {
        return <Navigate to="/client-dashboard" />;
      } else if (fields.role === 'recruiter') {
        return <Navigate to="/recruiter-dashboard" />;
      } else if (fields.role === 'jobseeker') {
        return <Navigate to="/jobseeker-dashboard" />;
      }
    }
    return <Navigate to="/" />;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/client/login" element={<Loginn />} />
            <Route path="/client/register" element={<Signup />} />
            <Route path="/recruiter/login" element={<RecruiterLogin />} />
            <Route path="/recruiter/register" element={<RecruiterRegister />} />
            <Route path="/jobseeker/login" element={<JobSeekerLogin />} />
            <Route path="/jobseeker/register" element={<JobSeekerRegister />} />
            <Route path="/client-dashboard/*" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['client']}>
                  <ClientAppBarComponent />
                </RoleBasedRoute>
              </ProtectedRoute>
            }>
              <Route path='view-profiles/Chat/:roomId' element={<Chat/>}/>
              <Route path="post-requirements" element={<PostRequirements />} />
              <Route path="view-profiles" element={<ViewProfiles />} />
              
            </Route>
            <Route path="/recruiter-dashboard/*" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['recruiter']}>
                  <RecruiterAppBarComponent />
                </RoleBasedRoute>
              </ProtectedRoute>
            }>
              <Route path='status-of-positions/Chat/:roomId' element={<Chat/>}/>
              <Route path="apply-for-positions" element={<ApplyForPosition />} />
              <Route path="status-of-positions" element={<StatusOfPosition />} />
            </Route>
            <Route path="/jobseeker-dashboard/*" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['jobseeker']}>
                  <JobSeekerAppbarComponent />
                </RoleBasedRoute>
              </ProtectedRoute>
            }>
              <Route path='status-of-positions-jobseeker/Chat/:roomId' element={<Chat/>}/>
              <Route path="apply-for-positions-jobseeker" element={<JobSeekerApplyForPosition />} />
              <Route path="status-of-positions-jobseeker" element={<JobSeekerStatusOfPosition />} />
            </Route>
            <Route path="*" element={<RedirectToDashboard />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>

  );
};

export default App;
