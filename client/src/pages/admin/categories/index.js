import React from "react";
import PageHeader from "../../../components/PageHeader"
import { Alert, Box, Grid } from "@mui/material";
import CategoriesTable from "../../../components/admin/categories/CategoriesTable";
import CustomLinkButton from "../../../components/admin/CustomLinkButton";
import { fetchData } from "../../../helpers/fetch";
 

export default function Index({ categories }) {
    return  <Grid item xs={12} sm={10} marginBottom={3}>
            <Box textAlign="center" width="100%">
                <PageHeader text="categories" />
                <Box textAlign="center" margin="0px auto">
                    {categories.length === 0 ? <Alert severity="info">no matched categories</Alert> :
                        <CategoriesTable rows={categories} />
                    }
                </Box>
                <Box>
                    <CustomLinkButton to="categories/create" text="add new category" />
                </Box>
            </Box>
        </Grid>
}

export const getStaticProps = async () => {
    let { data, isError } = await fetchData("v1/categories");

    if (!isError)
        return {
            props: {
                categories: data.categories
            },
            revalidate: 60 *  60
        }
    else 
        return {
            notFound: true,
            revalidate: 1
        }
}