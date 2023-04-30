import { useState } from 'react'
import { useGetAllCategoriesQuery } from '../../../../store/user/categorySlice';
import {  Menu, MenuItem } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { KeyboardArrowDown } from '@mui/icons-material';

export default function CategoriesDropDown() {
    let { data, isSuccess } = useGetAllCategoriesQuery();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ color: "#eee", fontSize: "14px"}}
            endIcon={<KeyboardArrowDown/>}
        >
            categories
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            sx={{
                width: "200px"
            }}
        >
            {
                isSuccess &&
                    data.categories.map((category, index) => (
                        <Link href={"/categories/" + category.slug} key={index}>
                            <MenuItem onClick={handleClose} key={index}>{category.slug}</MenuItem>
                        </Link>
                    ))
            }
        </Menu>
    </div>
  );
}