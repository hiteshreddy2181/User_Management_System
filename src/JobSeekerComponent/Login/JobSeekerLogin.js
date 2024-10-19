import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Checkbox, FormControlLabel, Typography, Box, IconButton, GlobalStyles, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import RoleContext from '../../Context/RoleContext';
import AppContext from '../../Context/AppContext';
import Cookies from 'js-cookie';
import { jobseekerLogin } from '../../services/jobseekerService';


const JobSeekerLogin = () => {
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);
  console.log("role", role)
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  const { setAuth, handleAccessToken } = useContext(AppContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAgreeToTermsChange = (e) => setAgreeToTerms(e.target.checked);

  const handleGoRegister = () => {
    navigate('/jobseeker/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    formData["role"] = role
    try {
      const response = await jobseekerLogin(formData);
      console.log('Login successful:', response);
      if (response) {
        window.sessionStorage.setItem('token', response.token);
        await handleAccessToken(); // Fetch user details after setting the token
        setAuth(true);
        navigate("/jobseeker-dashboard");
    }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

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
        <IconButton
          onClick={handleBackClick}
          sx={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'white',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
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
          <Typography variant="body1" gutterBottom>
            We are happy to have you back
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: '#8692A6' } }}
                  InputProps={{ style: { color: '#8692A6' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#8692A6',
                      },
                      '&:hover fieldset': {
                        borderColor: '#8692A6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8692A6',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: '#8692A6' } }}
                  InputProps={{ style: { color: '#8692A6' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#8692A6',
                      },
                      '&:hover fieldset': {
                        borderColor: '#8692A6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8692A6',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControlLabel
                  control={<Checkbox checked={agreeToTerms} onChange={handleAgreeToTermsChange} value="terms" color="primary" />}
                  label={<Typography variant="body2" style={{ color: 'white' }}>I agree to terms & conditions</Typography>}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={handleGoRegister}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant="body1" align="center" gutterBottom>
                  Or
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                  startIcon={<GoogleIcon />}
                >
                  Register with Google
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default JobSeekerLogin;
