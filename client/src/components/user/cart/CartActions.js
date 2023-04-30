import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../../store/user/cart';

export default function CartActions({ item, small = false }) {
    let { items } = useSelector(state => state.cart)
    let dispatch = useDispatch();

    const handleDecrease = () => {
        dispatch(addItemToCart({ ...item, price: -item.price, quantity: -1}));
    }

    const handleIncrease = () => {
        dispatch(addItemToCart({...item, quantity: 1}));
    }
    let currentQuantity = items.find(product => product._id === item._id).quantity;

    return (
        <Box display="flex">
            <Button 
                disabled={ currentQuantity === 1 ? true : false }
                size={small ? "small" : "meduim"} 
                variant="contained" 
                color="primary" 
                onClick={handleDecrease}
            >-</Button>
            <Typography variant="subtitle1" paddingX={2} fontSize={small ? "15px" : "20px"}>{currentQuantity}</Typography>
            <Button 
                size={small ? "small" : "meduim"}
                variant="contained" 
                color="primary" 
                onClick={handleIncrease}
            >+</Button>
        </Box>
    );
}

