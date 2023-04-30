import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardActions, Grid } from '@mui/material';
import { env } from '../../../next.config';
import CustomLinkButton from '../../admin/CustomLinkButton';
import AddToCartButton from '../cart/AddToCartButton';
export default function ProductItem({ product }) {
    return (
        <Card sx={{ padding: 2 }}>
            <CardActionArea sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <CardMedia
                    component="img"
                    image={`${env.IMAGE_URL}/${product.image}`}
                    alt={product.title}
                    sx={{ maxWidth: "250px", height: "200px", display: "flex", justifyContent: "center" }}
                />
                <CardContent sx={{ textAlign: "left", width: "100%", marginTop: 2, height: "80px" }}>
                    <Typography gutterBottom variant="p" component="div" fontSize="fontSizes.regular">
                        {product.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: "space-between"}}>
                <Box>
                    <Typography variant="p">
                        {product.price}
                    </Typography>
                </Box>
                <Box>
                    <AddToCartButton item={{...product, quantity: 1}}/>
                </Box>
            </CardActions>
            <CustomLinkButton text="show" to={`/products/${product.slug}`} />
        </Card>
    );
}
