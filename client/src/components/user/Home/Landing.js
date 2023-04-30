import React from 'react'
import landingImage from "../../../assets/landing3.webp"
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import SearchBox from '../searchProduct/SearchBox';
import { useRouter } from 'next/router';

const LandingContainer = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    height: `100vh`,
    backgroundImage:  `url(${landingImage.src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
}));

const LandingTextContainer = styled(Box)(({theme}) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(94 88 88 / 70%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}))

export default function Landing() {
    let router = useRouter();

    const onSubmit = (values) => {
        router.push({
            pathname: "/products",
            query: {
                title: values.title
            }
        })
    }

    return (
        <LandingContainer>
            <LandingTextContainer>
                <Box sx={{ width: { xs: "100%", md: "70%" } }}  textAlign="center">
                    <Typography variant='h4' marginBottom={2} color="#333">Enter product title</Typography>
                    <SearchBox onSubmit={onSubmit}/>
                </Box>
            </LandingTextContainer>
        </LandingContainer>
    )
}
