import { Facebook, Google, Instagram, Twitter, YouTube } from '@mui/icons-material'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'

import React from 'react'

export default function SocialMedia() {
    return (
        <List>
            <Link href="https://www.facebook.com">
                <ListItem>
                    <ListItemIcon sx={{ cursor: 'pointer'}}>
                        <Facebook sx={{ fontSize: "22px", color: "white"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Elcto" sx={{ color: 'white'}}/>
                </ListItem>
            </Link>
            <Link href="https://www.youtube.com">
                <ListItem>
                    <ListItemIcon sx={{ cursor: 'pointer'}}>
                        <YouTube sx={{ fontSize: "22px", color: "white"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Elcto"  sx={{ color: 'white'}}/>
                </ListItem>
            </Link>
            <Link href="https://www.instagram.com">
                <ListItem>
                    <ListItemIcon sx={{ cursor: 'pointer'}}>
                        <Instagram sx={{ fontSize: "22px", color: "white"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Elcto"  sx={{ color: 'white'}}/>
                </ListItem>
            </Link>
            <Link href="https://www.twitter.com">
                <ListItem>
                    <ListItemIcon sx={{ cursor: 'pointer'}}>
                        <Twitter sx={{ fontSize: "22px", color: "white"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Elcto"  sx={{ color: 'white'}}/>
                </ListItem>
            </Link>
            <Link href="https://www.gmail.com">
                <ListItem>
                    <ListItemIcon sx={{ cursor: 'pointer'}}>
                        <Google sx={{ fontSize: "22px", color: "white"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Elcto"  sx={{ color: 'white'}}/>
                </ListItem>
            </Link>
        </List>
    )
}
