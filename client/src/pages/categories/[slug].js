import { Alert, Grid } from "@mui/material";
import React from "react";
import ProductItem from "../../components/user/Home/ProductItem";
import PageHeader from "../../components//PageHeader"
import { fetchData } from "../../helpers/fetch";
export default function Category({ category }) {
  return (
    <>
      <PageHeader text={category.title} />
      <Grid container marginTop={5} key={category._id}>
        {
          category.products.length ? 
            category.products.map(product => (
              <Grid item xs={12} md={6} lg={4} key={product._id} padding={3}>
                <ProductItem product={product} />
              </Grid>
            ))
          :
              <Alert severity="info" sx={{ width: "100%"}}>category not match and product</Alert>
        }
      </Grid>
    </>
  );
}

/**
 * we cann't access url of node.js (http://localhost:4000/api/) server which is ruunig outside container
 * so we use common fetch api method instead of rtk query to use http://fullstack-project-ecommerce_api-1:4000/api/ 
 */


export const getStaticPaths = async () => {
    let { data, isError } = await fetchData("v1/categories/") 
    
    let paths = isError ? [] : data.categories.map(category => ({ 
      params: { slug: category.slug} 
    }))

    return {
      paths: paths,
      fallback: "blocking"
    }
}

export const getStaticProps = async ({ params }) => {
    let { data, isError } = await fetchData("v1/categories/" + params.slug);
    if (isError)
      return {
        notFound: true
      }    
    
    return {
        props: {
          categories: data.category
        },
        revalidate: 60 * 60 * 24
    }
}





