import { Alert } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrdersTable from "../../components/user/orders/OrdersTable";
import { useGetOrdersQuery } from "../../store/user/orderSlice";
import PageLoading from "../../components/PageLoading"
import SectionHeader from "../../components/SectionHeader"
export default function order() {
    let router = useRouter();
    let { data, isSuccess } = useGetOrdersQuery();
 
    // useEffect(() => { if (!token) router.push("/login") }, []);

    return (
        <>
            {
                isSuccess && data.orders.length > 0 ? (
                    <>
                        <SectionHeader 
                            text="your current orders"  
                            paddingBottom={2} 
                            color="primary.main" 
                            fontSize="fontSizes.meduim"
                        />
                        <OrdersTable orders={data.orders} />
                    </>
                )
                    : isSuccess && data.orders.length == 0 ? <Alert severity="info">There are no current requests</Alert>
                        : <PageLoading />
            }
        </>
    );

}