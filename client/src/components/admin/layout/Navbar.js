import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../../../store/admin/adminAuth';
import { useDispatch } from 'react-redux';
import cookies from '../../../services/cookies';
import { adminTokenKey } from '../../../services/cookies/cookies_keys';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar({ toggleSidebar }) {
    let dispatch = useDispatch();
    let router = useRouter();

    let logoutHandler = () => {
        dispatch(logout());
        cookies.destroy(adminTokenKey);
        router.push("/admin/login")
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        onClick={toggleSidebar}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link href="/admin">
                            <Typography variant="h6" component="div" sx={{ cursor: "pointer" }}>ELCTO</Typography>
                        </Link>
                    </Box>
                    <Button color="inherit" onClick={logoutHandler}>logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
