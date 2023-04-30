import React from "react";
import Link from "next/link";
import { Box, Button } from "@mui/material";


export default function CustomLinkButton({ text, to }) {
    return (
        <Box marginTop={2}>
            <Link href={to}>
                <Button variant="contained">{text}</Button>
            </Link>
        </Box>
    );
}
