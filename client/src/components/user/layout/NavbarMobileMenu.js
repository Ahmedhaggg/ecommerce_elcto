import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/user/user";
import {MenuItem, Menu, IconButton} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from "next/link";
import Notification from "./navbarItems/Notification";
import Cart from "./navbarItems/Cart";
import OrderIcon from "@mui/icons-material/AccountCircle"


export default function NavbarMobileMenu({ mobileMoreAnchorEl, mobileMenuId, handleMobileMenuClose }) {
    let dispatch = useDispatch();
    let router = useRouter();
    
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    let handleLogout = () => {
        dispatch(logout());
        router.push("/login")
    }

    return (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link href="/orders">
                <MenuItem>
                    <IconButton size="large" color="inherit">
                        <OrderIcon />
                    </IconButton>
                    <p>orders</p>
                </MenuItem>
            </Link>

            <Link href="/cart">
                <MenuItem>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Cart />
                    </IconButton>
                    <p>cart</p>
                </MenuItem>
            </Link>

            <Link href="/notifications">
                <MenuItem>
                    <IconButton
                        size="large"
                        aria-label="show new notifications"
                        color="inherit"
                    >
                        <Notification />
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <p>logout</p>
            </MenuItem>
        </Menu>
    )
};