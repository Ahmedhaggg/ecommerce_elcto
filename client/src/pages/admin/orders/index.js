import { Grid, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import OrdersFilter from "../../../components/admin/orders/OrdersFilter";
import OrdersTable from "../../../components/admin/orders/OrdersTable";
import CustomPagination from "../../../components/CustomPagination";
import PageHeader from "../../../components/PageHeader";
import PageLoading from "../../../components/PageLoading";
import { useGetAllOrdersQuery, useCountOrdersQuery } from "../../../store/admin/orderSlice"

export default function index() {
    let router = useRouter();
    let { status } = router.query;
    let { data, isSuccess } = useGetAllOrdersQuery(router.query, { skip: status ? false : true });
    let countOrders = useCountOrdersQuery(router.query.status, { skip: !status || status == "pending" ? true : false });
    
    const handlePagination = (value) => {
        router.push({
            query: { status: router.query.status || "completed", page: value }
        });
    };
    
    return (
        isSuccess ?
            <Grid item xs={12} sm={10} >
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px"  >
                    <PageHeader text="orders" />
                    <Box sx={{ marginTop: 3, marginBottom: 3}}>
                        <OrdersFilter />
                    </Box>
                    <Box textAlign="center" margin="0px auto">
                        {data.length === 0 ? <Alert severity="info">no orders</Alert> :
                            <OrdersTable rows={data} page={router.query.page || 1} />
                        }
                    </Box>
                    {
                        countOrders.isSuccess && countOrders.data.count > 10 ? <CustomPagination counts={countOrders.data.count} handleChange={handlePagination}/> : null
                    }
                </Box>
            </Grid>
            : <PageLoading />
    )
}
