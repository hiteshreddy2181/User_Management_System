import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Checkbox, FormControlLabel, Typography, Box, IconButton, GlobalStyles, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import RoleContext from '../../Context/RoleContext';
import { recruiterRegister } from '../../services/recruitmentService';

const RecruiterRegister = () => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: role
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');

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

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    try {
      const response = await recruiterRegister(formData);
      console.log('Registration successful:', response.data);
      navigate('/recruiter/login');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please check your inputs and try again.');
    }
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
            Create an Account 👋
          </Typography>
          <Typography variant="body1" gutterBottom>
            Kindly fill in your details to create an account
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
            <Grid container  justifyContent="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
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
                  label="Create Password"
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  type="tel"
                  defaultValue="+91"
                  value={formData.mobileNumber}
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
              {/* <Grid item xs={12} sm={8}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Website"
                  name="website"
                  // type="url"
                  value={formData.website}
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
              </Grid> */}
              <Grid item xs={12} sm={8} container justifyContent="center">
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
                  Register Account
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={() => navigate('/recruiter/login')}
                >
                  Login
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
}

export default RecruiterRegister;
