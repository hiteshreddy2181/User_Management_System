import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const settings = ['Dashboard', 'Logout'];

function StudentAppBarComponent() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'Logout') {
      handleLogout();
    }
  };

  const handleLogout = () => {
    // Clear the session storage
    sessionStorage.removeItem("token"); // Adjust the key if necessary
    console.log("Logging out...");
    // Redirect to the login page or home page
    window.location.href = "/login"; // Change this URL based on your routing
  };

  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#000' }}>
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ marginRight: 2 }}> {/* Add margin on the right */}
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                <Typography sx={{ textAlign: 'right' }}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
          <Box sx={{ padding: '10px' }}> {/* Adjust padding as needed */}
        </Box>
        </>
  );
}

export default StudentAppBarComponent;
