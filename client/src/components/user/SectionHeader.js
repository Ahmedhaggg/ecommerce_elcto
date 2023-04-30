import React from "react";
import { styled } from '@mui/material/styles';

const Header = styled("h3")(({ theme }) => {
    return ({
        color: theme.palette.primary.main,
        fontSize: theme.typography.fontSizes.large,
        fontWeight: theme.typography.fontWeightBold,
        textAlign: "center",
        marginBottom: theme.spacing(3),
    })
});

export default function PageHeader({ text }) {
    return <Header>
        {text}
    </Header>
}
