import React from 'react';
import { Grid, Typography, Container, Paper } from '@mui/material';

import Brands from './Brands';
import SocialMedia from './SocialMedia';

const Footer = () => {

  return (
    <Paper component="footer" sx={{ backgroundColor: "#333", paddingY: 4 }} >
      <Container>
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Typography variant='h5' textAlign="left" color="primary.main" marginBottom={1}>brands</Typography>
                <Brands />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant='h5' textAlign="left" color="primary.main" marginBottom={1}>our social media</Typography>
                <SocialMedia />
            </Grid> 
        </Grid>
      </Container>
    </Paper>
  );
};

export default Footer;

