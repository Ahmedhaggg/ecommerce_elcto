import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import DevicesIcon from '@mui/icons-material/Devices';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DashboardIcon from '@mui/icons-material/Dashboard';

let sidebarItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        link: "/"
    },
    {
        text: "categories",
        icon: <CategoryIcon />,
        link: "/categories"
    },
    {
        text: "products",
        icon: <DevicesIcon />,
        link: "/products?page=1"
    },
    {
        text: "users",
        icon: <PeopleIcon />,
        link: "/users?page=1"
    },
    {
        text: "orders",
        icon: <ShoppingCartCheckoutIcon />,
        link: "/orders?status=pending"
    }
]

export default function SideBar({ isOpened, toggleSidebar }) {
    return (
        <Box sx={{
            position: "fixed",
            zIndex: 2,
            top: "64px",
            left: isOpened ? "0px" : "-300px",
            width: "250px",
            display: { xs: "none", sm: "block" },
            boxShadow: 6,
            zIndex: 2,
            height: "calc(100vh - 64px)",
            backgroundColor: "#cdcdcd",
            transition: "left 0.5s"
        }}>
            <List sx={{ paddingTop: 3 }}>
                {sidebarItems.map((item, index) => (
                    <Link href={`/admin${item.link}`} key={index}>
                        <ListItem disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    )
}