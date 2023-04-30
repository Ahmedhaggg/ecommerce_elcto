import React from 'react';
import { Alert, Box, Button, Divider, Grid } from '@mui/material';
import useSuccess from "../../../customHooks/useSuccess"
import { errorFormat } from '../../../helpers/errorFormat';
import { useUpdateOrderMutation } from '../../../store/admin/orderSlice';

export default function OrderDetails({ order }) {
    let [updateOrder, { isSuccess, error, data }] = useUpdateOrderMutation();

    const handleUpdate = (newStatus) => updateOrder({ id: order._id, newStatus });

    let nextStatus = order.status === "pending" ? "shipped" : "completed";
    let { message } = error ? errorFormat(error.data) : {};

    let showSuccessMessage = useSuccess(isSuccess);

    return (
        <Box>
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>total price</Grid>
                <Grid item xs={3}>{order.amount}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>status</Grid>
                <Grid item xs={3}>{order.status}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2}>
                <Grid item xs={9}>location</Grid>
                <Grid item xs={3}>{order.location}</Grid>
            </Grid>
            <Divider />
            <Grid container paddingTop={2} paddingBottom={2} marginBottom={3}>
                <Grid item xs={9}>paymentId</Grid>
                <Grid item xs={3}>{order.paymentId}</Grid>
            </Grid>
            {
                showSuccessMessage && <Alert severity="success" sx={{ marginBottom: 2}}>order is {order.status}</Alert>
            }
            {
                order.status === "completed" ? null :
                    <Grid container spacing={3} alignItems="center" >
                        <Grid item xs={9}>
                            <Button variant='contained' type="button"
                                onClick={() => handleUpdate(nextStatus)}
                            >
                                {nextStatus} order       
                            </Button>
                        </Grid>
                    </Grid>
            }
            {message ? <Alert severity="error">{message}</Alert> : null}
        </Box>
    );
}