import { Badge } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Cart() {
    let { items } = useSelector(state => state.cart);

    return <Badge badgeContent={items.length} color="error">
        <ShoppingCartIcon />
    </Badge>
}
