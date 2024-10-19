import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link, Outlet, useLocation } from "react-router-dom";
import PreviewIcon from '@mui/icons-material/Preview';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Synxalogo from '../../Images/synxa logo.png';
import AppContext from '../../Context/AppContext';

const drawerWidth = 200;
const userName = "Hitesh";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: "#1c1c1c",
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: "#143655",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = (theme) => ({
  text: {
    color: 'white',
    marginLeft: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    margin: '10px 40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  navItem: {
    width: '90%',
    marginBottom: '16px'
  },
  clientHeader: {
    color: '#868686',
    marginLeft: '20px',
    cursor: 'pointer'
  },
  synxalogo: {
    width: '150px',
    height: '60px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10px'
  },
});

const navItems = [
  { name: "Apply for positions", icon: <PreviewIcon />, path: "apply-for-positions-jobseeker" },
  { name: "Status of positions", icon: <AccountCircleIcon />, path: "status-of-positions-jobseeker" },
];

const JobSeekerAppbarComponent = () => {
  const {fields} = useContext(AppContext)
  const location = useLocation();
  const theme = useTheme();
  const styles = useStyles(theme);
  const [state, setState] = useState({
    open: true,
    active: location.pathname
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, active: location.pathname }));
  }, [location.pathname]);

  const handleDrawerOpen = () => setState({ ...state, open: true });
  const handleDrawerClose = () => setState({ ...state, open: false });

  return (
    <Box sx={{ display: "flex", width: '100%', height: '100%' }}>
      <CssBaseline />
      <AppBar open={state.open} sx={{ backgroundColor: "transparent" }} />
      <Drawer variant="permanent" open={state.open}>
        <Box sx={{ display: 'flex', flexGrow: "1", flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <DrawerHeader sx={{ background: "#1c1c1c" }}>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar alt="Profile Avatar" />
                </Grid>
                <Grid item>
                  <Typography variant="body1" style={{ fontSize: '16px', color: 'white' }}>{fields.firstName} {fields.lastName}</Typography>
                </Grid>
              </Grid>
            </DrawerHeader>
            <List sx={{ background: "#1c1c1c1A", color: "#fff" }}>
              <Box sx={styles.navItem}>
                <Typography variant="body1" style={styles.clientHeader}>Job Seeker</Typography>
              </Box>
              {navItems.map((item) => (
                <Box sx={styles.navItem} key={item.name}>
                  <Button
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: state.active === item.path ? '#323232' : 'transparent',
                      color: 'white',
                      width: '100%',
                      padding: '6px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: state.active === item.path ? '#3b3b3b' : '#2a2a2a',
                      },
                    }}
                    onClick={() => setState((prevState) => ({ ...prevState, active: item.path }))}
                  >
                    {item.name}
                  </Button>
                </Box>
              ))}
            </List>
          </Box>
          <Box>
            <List sx={{ background: "#1c1c1c1A", color: "#fff" }}>
              <img src={Synxalogo} style={styles.synxalogo} alt="Synxa Logo" />
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: "100%", overflow: "hidden" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default JobSeekerAppbarComponent