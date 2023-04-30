import { Box } from "@mui/system";
import React from "react";
import PageHeader from "../../../components/PageHeader";
import { useGetProductQuery } from "../../../store/admin/productSlice";
import PageLoading from "../../../components/PageLoading"
import Error from "next/error";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import EditProductInfo from "../../../components/admin/products/editProduct/EditProductInfo"
import EditProductImage from "../../../components/admin/products/editProduct/EditProductImage"

export default function Product() {
    let router = useRouter();
    let { slug } = router.query;
    let { isError,isSuccess , data } = useGetProductQuery(slug, { skip: slug ? false : true});
    
    return  isError ? <Error statusCode={404} />
        : isSuccess ?  <Grid item xs={12} sm={10} marginBottom={3}>
                <PageHeader text={data.product.title} />
                <Box>
                    <EditProductInfo product={{
                        title: data.product.title,
                        description: data.product.description,
                        price: data.product.price,
                        isAvailable: data.product.isAvailable
                    }}/>
                </Box>
                <Box marginTop={3}>
                    <EditProductImage productImage={data.product.image} />
                </Box>
            </Grid>
        : <PageLoading />
}


{/* <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <img src={data.product.image} alt={data.product.title} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" component="h1">{data.product.title}</Typography>
                            <Typography variant="body1">{data.product.price}</Typography>
                            <Typography variant="body1">{data.product.description}</Typography>
                            <Button variant="contained" color="primary" disabled={!data.product.isAvailable}>
                            {data.product.isAvailable ? 'Add to cart' : 'Out of stock'}
                            </Button>
                        </Grid>
                    </Grid> */}