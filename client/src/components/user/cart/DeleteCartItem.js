import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../../../store/user/cart';

export default function DeleteCartItem({ productId }) {
    let dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteCartItem({ productId }));
    }

    return (
        <Button variant='contained' sx={{ padding: 1}} size='small' onClick={handleDelete}>
            <DeleteIcon fontSize='24px'/>
        </Button>
    )
}
