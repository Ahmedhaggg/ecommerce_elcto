import React from "react";
import { useGetOrderQuery } from "../../../store/admin/orderSlice";
import { Grid } from "@mui/material";
import OrderProducts from "../../../components/admin/Order/OrderProducts";
import OrderDetails from "../../../components/admin/Order/OrderDetails";
import OrderUser from "../../../components/admin/Order/OrderUser";
import { useRouter } from "next/router";
import Error from "next/error";
import PageLoading from "../../../components/PageLoading";
import SectionHeader from "../../../components/SectionHeader"
import { Box } from "@mui/system";

export default function order() {
  let router = useRouter()
  let { data, isError, isSuccess } = useGetOrderQuery(router.query.id, { skip: router.query.id ? false : true });
    
  return (
    isSuccess ? 
      <Grid item xs={12} sm={10} marginTop={3} marginBottom={5}>
          <Box marginTop={3} marginBottom={4}>
            <SectionHeader text="order products" textAlign="left" color="#333" fontSize="25px" />
            <OrderProducts orderProducts={data.products} />
          </Box>
          <Box marginTop={3} marginBottom={4}>
            <SectionHeader text="order details" textAlign="left" color="#333" fontSize="25px" />
            <OrderDetails order={data} />
          </Box>
          <Box marginTop={3}>
            <SectionHeader text="order user" textAlign="left" color="#333" fontSize="25px" />
            <OrderUser user={data.user}/>
          </Box>
      </Grid>
    : isError ? <Error statusCode={404} />
    :  <PageLoading />
  )
}


{/* <Grid item xs={12} sm={10}>
        {/* <PageHeader text="order" /> */}
        // <Grid container spacing={5}>
        //   <Grid item xs={12} md={7}>
        //     <SectionHeader text="products" />
        //     <OrderProducts orderProducts={data.products} />
        //   </Grid>
        //   <Grid item xs={12} md={5}>
        //     <OrderDetails order={data} />
        //   </Grid>
        //   <Grid>
            
        //   </Grid>
        // </Grid>
      // </Grid> */}


// export const getServerSideProps = wrapper.getServerSideProps(store =>
//   async (context) => {
//     let { isSuccess, data, error } = await store.dispatch(getOrder.initiate({
//       orderId: context.params.id,
//       adminToken: context.req.cookies[adminTokenKey]
//     }));

//     if (!isSuccess)
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/admin/404"
//         }
//       }

//     return {
//       props: {
//         order: data.order
//       }
//     }
//   }
// )