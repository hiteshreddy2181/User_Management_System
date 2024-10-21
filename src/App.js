import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppContext from './Context/AppContext';
import Loginn from './StudentComponent/Login/login';
import Start from './StudentComponent/Login/start';
import RoleBasedRoute from './RoleBasedRoute';
import RecruiterAppBarComponent from './AdminComponent/AdminAppBar/AdminAppBarComponent.js';
import { ProtectedRoute } from './ProtectedRoute';
import AppProvider from './Context/AppProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StudentAppBarComponent from './StudentComponent/StudentAppBarComponent/StudentAppBarComponent.js';
import AdminLogin from './AdminComponent/Login/AdminLogin.js'
import StudentDashboard from './StudentComponent/Dashboard/Studentdashboard.js'
import Admindashboard from './AdminComponent/Admindashboard/Admindashboard.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      if (fields.role === 'student') {
        return <Navigate to="/student-dashboard" />;
      } else if (fields.role === 'admin') {
        return <Navigate to="/admin-dashboard" />;
      }
    }
    return <Navigate to="/" />;
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    <ThemeProvider theme={darkTheme}>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/student/login" element={<Loginn />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/student-dashboard" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['student']}>
                  <StudentAppBarComponent />
                  <StudentDashboard/>
                </RoleBasedRoute>
              </ProtectedRoute>
            }>
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              
            </Route>
            <Route path="/admin-dashboard" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin']}>
                  <RecruiterAppBarComponent />
                </RoleBasedRoute>
              </ProtectedRoute>
            }>
              <Route path="/admin-dashboard" element={<Admindashboard />} />
            </Route>
            <Route path="*" element={<RedirectToDashboard />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  </>
  );
};

export default App;
