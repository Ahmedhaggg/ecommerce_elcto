import React from 'react';
import { Box, Divider, Grid } from '@mui/material';


export default function OrderDetails({ order }) {
  const tax = order.amount * 0.15;
  const amountWithoutTax = order.amount - (order.amount * 0.15);
  return (
    <Box>
      <Grid container paddingTop={2} paddingBottom={2} >
        <Grid item xs={6}>Tax</Grid>
        <Grid item xs={6} textAlign="right">{tax}</Grid>
      </Grid>
      <Divider />
      <Grid container paddingTop={2} paddingBottom={2} >
        <Grid item xs={6}>amount without tax</Grid>
        <Grid item xs={6} textAlign="right">{amountWithoutTax}</Grid>
      </Grid>
      <Divider />
      <Grid container paddingTop={2} paddingBottom={2} >
        <Grid item xs={6}>amount without tax</Grid>
        <Grid item xs={6} textAlign="right">{order.amount}</Grid>
      </Grid>
      <Divider />
      <Grid container paddingTop={2} paddingBottom={2} >
        <Grid item xs={6}>createdAt</Grid>
        <Grid item xs={6} textAlign="right">{new Date(order.createdAt).toLocaleString("en-US")}</Grid>
      </Grid>
      <Grid container paddingTop={2} paddingBottom={2} >
        <Grid item xs={6}>completedAt</Grid>
        <Grid item xs={6} textAlign="right">{new Date(order.updatedAt).toLocaleString("en-US")}</Grid>
      </Grid>
      <Divider />
      <Grid container paddingTop={2} paddingBottom={2}>
        <Grid item xs={6}>location</Grid>
        <Grid item xs={6} textAlign="right">{order.location}</Grid>
      </Grid>
      <Divider />
      <Grid container paddingTop={2} paddingBottom={2}>
        <Grid item xs={6}>status</Grid>
        <Grid item xs={6} textAlign="right">{order.status}</Grid>
      </Grid>
    </Box>
  );
}