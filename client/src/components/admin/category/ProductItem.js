import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { env } from '../../../next.config';
export default function ProductItem({ product }) {

    return (
        <Card sx={{ padding: 2 }}>
            <CardActionArea sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <CardMedia
                    component="img"
                    image={env.IMAGE_URL + product.image}
                    alt={product.title}
                    sx={{ maxWidth: "250px", height: "200px", display: "flex", justifyContent: "center" }}
                />
                <CardContent sx={{ textAlign: "left", width: "100%" }}>
                    <Typography gutterBottom variant="p" component="div">
                        name: {product.title}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                        price: {product.price}$
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
