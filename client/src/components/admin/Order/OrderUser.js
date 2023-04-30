import { Box, Divider, Grid } from '@mui/material'
import React from 'react'
export default function OrderUser({ user }) {
  return (
    <Box>
        <Grid container paddingTop={2} paddingBottom={2}>
            <Grid item xs={9}>name</Grid>
            <Grid item xs={3}>{user.firstName} {user.lastName}</Grid>
        </Grid>
        <Divider />
        <Grid container paddingTop={2} paddingBottom={2}>
            <Grid item xs={9}>email</Grid>
            <Grid item xs={3}>{user.email}</Grid>
        </Grid>
    </Box>
  )
}
