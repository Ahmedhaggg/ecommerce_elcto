import React, { useState } from "react";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { styled } from '@mui/material/styles';
import { Container, Grid } from "@mui/material";
import cookies from "../../../services/cookies";
import { adminTokenKey } from "../../../services/cookies/cookies_keys";
import { useRouter } from "next/router";
import Head from "next/head";

const Content = styled("div")(({ theme }) => ({
    display: "flex"
}));


export default function AdminLayout({ children }) {
    let [toggledSidebar, setToggledSidebar] = useState(false);
    let router = useRouter();
    let toggleSidebar = () => setToggledSidebar(!toggledSidebar)
    
    return <div>
        <Head>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <Navbar toggleSidebar={toggleSidebar} />
        <Content sx={{ marginTop: { xs: "56px", sm: "64px" } }}>
            <SideBar isOpened={toggledSidebar} toggleSidebar={toggleSidebar} />
            <Container>
                <Grid container justifyContent="center" >
                    {children}
                </Grid>
            </Container>
        </Content>
    </div>;
}
