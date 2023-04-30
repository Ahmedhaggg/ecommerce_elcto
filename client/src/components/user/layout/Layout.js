import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Landing from "../Home/Landing";
import Footer from './footer'
import Head from "next/head";

export default function Layout({ children }) {
    const [isSSR, setIsSSR] = useState(true);
    let router = useRouter();

    useEffect(() => {
        setIsSSR(false);
    }, []);

    return (
        !isSSR && <>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            </Head>
            <Navbar />
            {
                router.asPath == "/" ? <Landing /> : null
            }
            <Container sx={{ marginTop: "100px", marginBottom: 5 }}>
                {children}
            </Container>
            {
                router.asPath == "/" ? <Footer /> : null
            }
        </>
    );
}
