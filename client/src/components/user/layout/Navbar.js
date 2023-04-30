import React, { useState, useEffect } from 'react';
import {  useSelector } from "react-redux"
import { Box, AppBar, Toolbar, IconButton, Typography, Button, MenuItem, Menu} from "@mui/material"
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import Cart from './navbarItems/Cart';
import Notification from './navbarItems/Notification';
import OrderIcon from "@mui/icons-material/AccountCircle"
import Logout from './navbarItems/Logout';
import NavbarMobileMenu from './NavbarMobileMenu';
import CategoriesDropDown from './navbarItems/CategoriesDropDown';

export default function Navbar() {
    let { token} = useSelector(state => state.user)
    
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const mobileMenuId = 'primary-search-account-menu-mobile'


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" >
                <Toolbar>
                    <Link href="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{ cursor: "pointer" }}
                        >
                            ELCTO
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        token ? (
                            <>
                                {/* display logged user navbar */}
                                <CategoriesDropDown />
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <Link href="/orders">
                                        <IconButton size="large" aria-label="show cart items" color="inherit">
                                            <OrderIcon />
                                        </IconButton>
                                    </Link>
                                    <Link href="/notifications">
                                        <IconButton size="large" aria-label="show cart items" color="inherit">
                                            <Notification />
                                        </IconButton>
                                    </Link>
                                    <Link href="/cart">
                                        <IconButton
                                            size="large"
                                            color="inherit"
                                        >
                                            <Cart />
                                        </IconButton>
                                    </Link>
                                    <Logout />
                                </Box>
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="show more"
                                        aria-controls={mobileMenuId}
                                        aria-haspopup="true"
                                        onClick={handleMobileMenuOpen}
                                        color="inherit"
                                    >
                                        <MoreIcon />
                                    </IconButton>
                                </Box>
                            </>
                        )
                            : (
                                <>
                                    {/* display anonymous user navbar */}
                                    <CategoriesDropDown />
                                    <Link href="/cart">
                                        <IconButton size="large" aria-label="show cart items" color="inherit">
                                            <Cart />
                                        </IconButton>
                                    </Link>
                                    <Link href="/login">
                                        <Button href="/login" variant="inherit">login</Button>
                                    </Link>
                                </>
                            )
                    }
                </Toolbar>
            </AppBar>

            {token && <NavbarMobileMenu mobileMoreAnchorEl={mobileMoreAnchorEl} mobileMenuId={mobileMenuId} handleMobileMenuClose={handleMobileMenuClose} />}
        </Box>
    );
}
