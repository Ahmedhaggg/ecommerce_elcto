import React from "react";
import { Box, Container } from "@mui/material"
export default function Content({ children }) {
    return <Container marginTop={2}>{children}</Container>;
}
