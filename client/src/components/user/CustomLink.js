import NextLink from "next/link";
import React from "react";
import { Link, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    fontSize: theme.typography.fontSizes.small,
    cursor: "pointer",
    // border: "1px solid",
    // borderColor: theme.palette.primary.main,
    // padding: "4px 7px"
}));

export default function CustomLink({ text, to }) {
    return (
        <NextLink href={to}>
            <LinkStyled href={to}>{text}</LinkStyled>
        </NextLink>
    )
}
