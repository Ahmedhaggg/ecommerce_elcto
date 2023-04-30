import React from "react";
import { styled } from '@mui/material/styles';

const Header = styled("h5")(({ theme }) => {
    return ({
        fontSize: theme.typography.fontSizes.regular,
        textAlign: "center",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    })
});

export default function PageHeader({ text, ...props }) {
    return <Header sx={props}>
        {text}
    </Header>
}
