import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

export default function Brands() {
    return (
        <List>
            <ListItem disablePadding>
                <ListItemText primary="samsung" sx={{ fontSize: "10px", color: "white" }}/>
            </ListItem>
            <ListItem disablePadding>
                <ListItemText primary="apple" sx={{ fontSize: "10px", color: "white" }}/>
            </ListItem>
            <ListItem disablePadding>
                <ListItemText primary="xiaomi" sx={{ fontSize: "10px", color: "white" }}/>
            </ListItem>
            <ListItem disablePadding>
                <ListItemText primary="hp" sx={{ fontSize: "10px", color: "white" }}/>
            </ListItem>
            <ListItem disablePadding>
                <ListItemText primary="dell" sx={{ fontSize: "10px", color: "white" }}/>
            </ListItem>
        </List>
    )
}
