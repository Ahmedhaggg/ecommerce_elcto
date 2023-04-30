import { Box, Grid } from "@mui/material";
import React from "react";
import OrderProducts from "../../components/user/order/OrderProducts";
import { userTokenKey } from "../../services/cookies/cookies_keys";
import OrderDetails from "../../components/user/order/OrderDetails";
import { fetchData } from "../../helpers/fetch";
export default function Order({ order }) {
    return (
        <Box>
            <Grid container spacing={5}>
                <Grid item xs={12} md={7}>
                    <OrderProducts orderProducts={order.products} />
                </Grid>
                <Grid item xs={12} md={5}>
                    <OrderDetails order={order} />
                </Grid>
            </Grid>
        </Box>
    )
}



export const getServerSideProps = async (context) => {
    let { id } = context.params;

    let { data, isError } = await fetchData("v1/orders/" + id, context.req.cookies[userTokenKey])

    if (isError)
        return {
            redirect: {
                destination: "/404",
                permanent: true
            }
        };
    return {
        props: {
            order: data.order
        }
    }

}