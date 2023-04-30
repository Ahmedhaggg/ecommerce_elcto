import React, { useState } from 'react'
import SearchBar from '../components/user/searchProduct/SearchBox'
import { Alert, Box, Grid } from '@mui/material'
import ProductItem from '../components/user/Home/ProductItem'
import { useGetAllProductsQuery } from "../store/user/productSlice"
import { useRouter } from 'next/router'
import PageLoading from '../components/PageLoading'
import SectionHeader from '../components/SectionHeader'
export default function products() {
    let router = useRouter();
    let { 
        data: searchResult, isSuccess, isError, isLoading, isUninitialized
    } = useGetAllProductsQuery({ title: router.query.title }, { skip: router.query?.title ? false : true })
    
    const handleSubmit = (values) => {
        if (values.title === router.query.title)
            return;
        router.push({
            query: {
                ...router.query,
                ...values
            }
        })    
    }
    
    return (
        <>
            <Box sx={{ marginBottom: 3 }}>
                <SectionHeader text="Search About Product"/>
                <SearchBar onSubmit={handleSubmit}/>
            </Box>
            {
                isUninitialized ? <Alert severity="info">Enter Product Title</Alert> :
                isLoading ? <PageLoading /> :
                isError ? <Alert severity="error">something went wrong</Alert> :
                isSuccess ? 
                    <Box>
                        {
                            searchResult.products.length ?
                                <Grid container>
                                    {
                                        searchResult.products.map((product) => (
                                            <Grid item xs={12} md={6} lg={4}>
                                                <ProductItem product={product} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                : <Alert severity="info">No Applying Result</Alert>
                        }
                    </Box>
                : null
            }
        </>
    )
}
