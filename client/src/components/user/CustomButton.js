import { Button } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import { useState } from "react";

const ButtonContainer = styled("div")(({ theme }) => ({
    textAlign: "center",
}));


export default function CustomButton({ text, disabled = false }) {
    return <ButtonContainer>
        <Button variant="outlined" type="submit" disabled={disabled}>{text}</Button>
    </ButtonContainer>;
}
