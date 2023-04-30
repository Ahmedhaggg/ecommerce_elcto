import * as React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Link } from "@mui/material"

export default function CategoriesSideBar({ categories }) {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography variant='h4'>categories</Typography>
            <nav aria-label="secondary mailbox folders">
                <List>
                    {
                        categories.map((category, index) => (
                            <Link href={"categories/" + category.title} style={{ textDecoration: "none" }} key={category._id}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={category.title} sx={{ color: "primary.main" }} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </nav>
        </Box>
    );
}
