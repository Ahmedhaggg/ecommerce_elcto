import { Alert, Grid, Box } from "@mui/material";
import React from "react";
import PageHeader from "../../../components/PageHeader"
import ProductItem from "../../../components/admin/category/ProductItem";
import { useGetCategoryQuery } from "../../../store/admin/categories";
import { useRouter } from "next/router";
import PageLoading from "../../../components/PageLoading";
import Error from "next/error";

export default function Category() {
    let router = useRouter()
    let { data, isError, isLoading } = useGetCategoryQuery(router.query.slug)
    
    return isLoading ? <PageLoading />
        : isError ? <Error statusCode={404} />
        :   <Grid item xs={12} sm={10} marginBottom={3}>
                <Box textAlign="center" width="100%" >

                    <PageHeader text={data.category.title} />
                    {
                        data.category.products.length === 0 ?
                            <Alert severity="info">no products in ths category</Alert>
                            : (
                                <Grid container>
                                    {
                                        data.category.products.map(product => (
                                            <ProductItem product={product} />
                                        ))
                                    }
                                </Grid>
                            )
                    }
                </Box>
            </Grid>
    
}
