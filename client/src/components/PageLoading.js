import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const LoaderContainer = styled("div")(({ theme }) => ({
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));

export default function PageLoading() {
    return (
        <LoaderContainer>
            <Box>
                <CircularProgress />
            </Box>
        </LoaderContainer>
    );
}