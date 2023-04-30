import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import PageHeader from "../../../components/PageHeader";
import { useGetAllCategoriesQuery } from "../../../store/admin/categories";
import PageLoading from "../../../components/PageLoading";
import CreateProduct from "../../../components/admin/products/CreateProduct";
import Error from "next/error";

export default function create() {
    let getAllCategoriesResult = useGetAllCategoriesQuery();

    return (
        getAllCategoriesResult.isLoading ? 
            <PageLoading />
        : getAllCategoriesResult.isError ? 
            <Error statusCode={505} />
        :
            <Grid item xs={12} sm={10} marginBottom={3}>
                <PageHeader text="create product" />
                <CreateProduct 
                    categories={getAllCategoriesResult.data.categories} 
                />
            </Grid> 
    )
}

// export const getStaticProps = wrapper.getStaticProps((store) =>
//     async () => {
//         let { data } = await store.dispatch(getAllCategories.initiate());
        
//         await Promise.all(getRunningOperationPromises());

//         return {
//             props: {
//                 categories: data.categories
//             }
//         }
//     }
// )