import { Button } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';

const ButtonContainer = styled("div")(({ theme }) => ({
    textAlign: "center",
}));


export default function CustomButton({ text }) {
    return <ButtonContainer>
        <Button variant="outlined" type="submit">{text}</Button>
    </ButtonContainer>;
}
