import React from 'react'
import SamsungLogo from "../../../assets/samsung.png"
import AppleLogo from "../../../assets/apple.png" 
import DellLogo from "../../../assets/dell.png"
import HpLogo from "../../../assets/hp.png" 
import XiaomiLogo from "../../../assets/xiaomi.png" 
import AliceCarousel from 'react-alice-carousel'
import { Box } from '@mui/material'

const marketsLogoList = [
    SamsungLogo,
    AppleLogo,
    DellLogo,
    HpLogo,
    XiaomiLogo
]

export default function OurMarkets() {
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 4 }
    };
    return (
        <AliceCarousel
            key="carousel"
            mouseTracking
            items={marketsLogoList.map(marketLogo => (
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
                    <img width="100px" height="100px" src={marketLogo.src} />
                </Box>
            )) }
            responsive={responsive}
        />
    )
}
