import React, { useState } from "react";
import "./Header.css";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, MenuItem, Menu } from "@material-ui/core";
// import { provider } from '../firebase.js';
import firebase from "firebase";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [auth, setAuth] = useState(false);
    const open = Boolean(anchorEl);

    const handleLogin = async () => {
      // Connect to Google Authentication
      const { provider } =  await import('../firebase.js')
      firebase.auth().signInWithPopup(provider)
        .then((response) => {
          console.log(response)
          setAuth(true);
        })
        .catch(err => alert(err))
    }

    function handleClose() {
        setAnchorEl(null);
        setAuth(false);
    }

    const handleLogoutMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    return (
      <div className="header-container">
        {/* App title on the left */}
        <div className="heading">
          <h1>
            <BeenhereIcon className="AppIcon" />
            Notex
          </h1>
        </div>
        {/* Hamburger Menu on the right */}
        <div className="navigation-menu">
          {auth ? <Button
            aria-label="account of current user"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleLogoutMenu}
            style={{ height: '50px', minWidth: '55px' }}
          >
            <MenuIcon style={{ fill: "white", fontSize: '1.8rem', borderRadius: '7px' }} />
          </Button> : <Button
            aria-label="Login button"
            aria-controls="login"
            onClick={handleLogin}
            style={{ height: '50px', minWidth: '55px' }}
          >
            <AccountCircle style={{ fill: "white", fontSize: '1.8rem', borderRadius: '7px' }} />
          </Button>}

          <Menu
            id="logout-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem style={{ color: 'red'}}>Delete Account</MenuItem>
          </Menu>
        </div>
      </div>
    );
}
