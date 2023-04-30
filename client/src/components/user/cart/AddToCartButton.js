import { Button, Typography } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../store/user/cart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


export default function AddToCartButton({ item, text = "", ...props }) {
    let dispatch = useDispatch();

    let addProductToCart = () => {
        dispatch(addItemToCart({...item, quantity: 1}))
    }
    
    return (
        <Button size="meduim" color="primary" onClick={addProductToCart} {...props}>
            <ShoppingCartCheckoutIcon />
            { text ? <Typography component="span" marginLeft={2}>{text}</Typography> : "" }
        </Button>
    )
}
