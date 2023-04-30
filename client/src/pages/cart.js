import { Alert, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProducts from "../components/user/cart/CartProducts";
import CartTotal from "../components/user/cart/CartTotal"
import { deleteCart } from "../store/user/cart";

export default function Cart() {
    let { items } = useSelector(state => state.cart);
    
    return (
        items.length > 0 ?
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CartProducts />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" marginBottom={2} color="primary.main">cart total</Typography>
                    <CartTotal />
                </Grid>
            </Grid> :
            <Alert severity="info">cart is empty</Alert>
    )
}
