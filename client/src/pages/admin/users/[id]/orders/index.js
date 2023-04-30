import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'
import PageLoading from '../../../../../components/PageLoading'
import PageHeader from '../../../../../components/PageHeader'
import { useGetAllOrdersQuery } from '../../../../../store/admin/orderSlice'
import OrdersTable from '../../../../../components/admin/orders/OrdersTable'

export default function index() {
    let { query } = useRouter()
    let { data, isSuccess } = useGetAllOrdersQuery({ userId: query.userId}, { skip: query.id ? false : true });
    return (
        isSuccess ? 
            <Grid item xs={12} sm={10}>
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px">
                    <PageHeader text="user orders" />
                    <OrdersTable rows={data} />
                </Box>
            </Grid>
        : <PageLoading />
    )
}
