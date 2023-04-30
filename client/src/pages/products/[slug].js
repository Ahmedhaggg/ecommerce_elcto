import React from 'react'
import { Grid, CardMedia, Typography, Divider, Alert } from '@mui/material';
import { env } from '../../next.config';
import { Box } from '@mui/system';
import AddToCartButton from '../../components/user/cart/AddToCartButton';
import SectionHeader from "../../components/SectionHeader";
import { useSelector } from 'react-redux';
import CartActions from '../../components/user/cart/CartActions';
import { fetchData } from '../../helpers/fetch';

export default function show({ product }) {
    let cart = useSelector(state => state.cart)

    let productInCart = cart.items.find(cartItem => cartItem._id === product._id);
    
    if (!product.isAvailable) 
        return <Alert severity='error'>current, product is not available</Alert>;


    return (
        <Box>
            <SectionHeader text={product.title} fontSize="fontSizes.large" paddingBottom={3}/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={`${env.IMAGE_URL}/${product.image}`}
                        alt={product.title}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography variant="subtitle1" fontSize="fontSizes.regular" paddingY={2}>
                            Category: {product.category.title}
                        </Typography>
                        <Divider />
                        <Typography variant="h6" color="textSecondary" fontSize="fontSizes.regular" paddingY={2}>
                            Price: {product.price}
                        </Typography>
                        <Divider />
                        <Typography variant="body1" fontSize="fontSizes.regular" paddingY={2} >
                            {product.description}
                        </Typography>
                        <Divider />
                    </Box>
                    <Box marginTop={3}>
                        {
                            productInCart ?
                            <CartActions item={product}/>
                            : <AddToCartButton item={product} text="add to cart" variant='outlined' sx={{ padding: 2}} />
                        }
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )

}


export const getServerSideProps = async ({params}) => {
    let { data, isError } = await fetchData("v1/products/" + params.slug);

    if (!isError)
        return {
            props: {
                product: data.product
            }
        }
    else 
        return {
            notFound: true,
        }
    
}
