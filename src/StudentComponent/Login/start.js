import React, { useContext } from 'react';
import { Container, Button, Typography, Box, GlobalStyles } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import RoleContext from '../../Context/RoleContext';
import AppContext from '../../Context/AppContext';

const Start = () => {
  const navigate = useNavigate();
  const { setRole, role } = useContext(RoleContext);
  const { auth, fields } = useContext(AppContext);
  
  if (auth && fields.role) {
    if (fields.role === 'student') {
      return <Navigate to="/student-dashboard" />;
    } else if (fields.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    }
  }


  const handleRoleSelect = (role, action) => {
    setRole(role);
    console.log("START Route----", `/${role}/${action}`);
    navigate(`/${role}/${action}`);
  };
  console.log("role", role)

  return (
    <>
      <GlobalStyles
        styles={{
          html: { backgroundColor: '#202227' },
          body: { backgroundColor: '#202227', margin: 0, padding: 0, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
        }}
      />
      <Container
        maxWidth="false"
        disableGutters
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            borderRadius: '8px',
            color: 'white',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back 👋
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleRoleSelect('student', 'login')}
          >
            Login as Student
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleRoleSelect('admin', 'login')}
          >
            Login as Admin
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Start;
