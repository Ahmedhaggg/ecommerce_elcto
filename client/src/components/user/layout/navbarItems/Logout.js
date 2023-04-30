import { Button } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../../store/user/user';

export default function Logout() {
    let dispatch = useDispatch();
    let router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/login")
    }
    return (
        <Button color="inherit" sx={{ marginLeft: 2 }} onClick={handleLogout}>logout</Button>
    )
}
