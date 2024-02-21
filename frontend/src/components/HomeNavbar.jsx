import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function HomeNavbar() {
  const user = useAuth();
  // const { _id, username, name, email } = user.user;
  const newUser = JSON.parse(localStorage.getItem('user-todolist'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem('user-todolist'));
    if(userInfo){
      user.setUser({
        _id : userInfo._id,
        username : userInfo.username,
        name : userInfo.name,
        email : userInfo.email
      })
    }
  })
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TO DO LIST
          </Typography>
          {newUser ? 
            <> 
              <p onClick={handleMenu} style={{ cursor : 'pointer'}}>{newUser.name}</p> 
              <Paper elevation={1} />
            </>:
            <>
              <Link to="/sign-up" style={{ textDecoration: 'none', color: 'inherit' }}><Button color="inherit">SignUp</Button></Link>
              <Link to="/sign-in" style={{ textDecoration: 'none', color: 'inherit' }}><Button color="inherit">Login</Button></Link>
            </>
          }
          <Menu
                sx={{ mt: '40px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}