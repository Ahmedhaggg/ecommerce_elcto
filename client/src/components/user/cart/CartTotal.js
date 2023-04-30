import { useSelector } from 'react-redux';
import { Box, Divider, Grid } from '@mui/material';
import  CustomLinkButton from "../CustomLinkButton"

export default function CartTotal() {
    let { items, totalPrice } = useSelector(state => state.cart);
    
    let totalAmount = (totalPrice * 0.15) + totalPrice;
    let tax = totalPrice * 0.15;

    return (
        <Box>
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>number of products</Grid>
                <Grid item xs={3}>{items.length}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>number of all quantities</Grid>
                <Grid item xs={3}>{items.map(item => +item.quantity)}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>amount without Tax</Grid>
                <Grid item xs={3}>{totalPrice}</Grid>
            </Grid>
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>Tax</Grid>
                <Grid item xs={3}>{tax}</Grid>
            </Grid>
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>total amount</Grid>
                <Grid item xs={3}>{totalAmount}</Grid>
            </Grid>
            <CustomLinkButton text={`checkout ${totalAmount}$`} to="/checkout" />
        </Box>
    );
}
