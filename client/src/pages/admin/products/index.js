import { Alert, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CustomLinkButton from "../../../components/admin/CustomLinkButton";
import PageHeader from "../../../components/PageHeader";
import { useGetAllProductsQuery, useCountProductsQuery } from "../../../store/admin/productSlice";
import ProductsTable from "../../../components/admin/products/ProductsTable"
import PageLoading from "../../../components/PageLoading"
import Error from "next/error";
import { useRouter } from "next/router";
import CustomPagination from "../../../components/CustomPagination";
export default function Products() {
    let router = useRouter()
    let { page } = router.query;
    let { isError, isSuccess, data } = useGetAllProductsQuery(page, { skip: page ? false : true });
    let productsCount = useCountProductsQuery();
    
    const handlePagination = (value) => {
        router.push({
            query: { page: value }
        });
    };
    useEffect(() => {
        if (!page) 
            router.push({
                ...router.query,
                query: {
                    page: 1
                }
            })
    }, [])
    return isSuccess ?
            (
                <Grid item xs={12} sm={10} marginBottom={3}>
                    <Box textAlign="center" width="100%" >
                        <PageHeader text="products" />
                        <Box textAlign="center" margin="0px auto">
                            {data.products.length === 0 ? <Alert severity="info">no matched products</Alert> :
                                <ProductsTable rows={data.products} />
                            }
                        </Box>
                        { 
                            productsCount.isSuccess &&  productsCount.data.count > 10 ? 
                                <CustomPagination 
                                    handleChange={handlePagination} 
                                    counts={productsCount.data.count} 
                            /> : null 
                        }
                        <Box>
                            <CustomLinkButton to="products/create" text="add new product" />
                        </Box>
                    </Box>
                </Grid>
            )
        : isError ? <Error statusCode={505} />
        : <PageLoading />
}


// export const getStaticProps = wrapper.getStaticProps((store) =>
//     async (context) => {
//         let products = await store.dispatch(getAllProducts.initiate(cookies.get(adminTokenKey)));
//         await Promise.all(getRunningOperationPromises());

//         if (products.data)
//             return {
//                 props: {
//                     products: products.data.products
//                 }
//             }
//     }
// )