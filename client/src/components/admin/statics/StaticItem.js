import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

let backgroundColors = ["primary.main", "secondary.main", "primary.light", "info.main", "error.light", "success.main", "secondary.light"]
export default function StaticItem({ staticName, staticLength, index }) {
  return (
    <Box sx={{
        cursor: "pointer",
        width: "100%",
        height: { md: "180px" , xs: "230px"},
        backgroundColor: backgroundColors[index],
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transition: "transform .5s ease-in-out",
        ":hover": {
          transform: "scale(1.1)"
        }
    }}
    >
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>{staticLength}</Typography>
        <Typography sx={{ letterSpacing: 1.6}}>{staticName}</Typography>
    </Box>
  )
}
