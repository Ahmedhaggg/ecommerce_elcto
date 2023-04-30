import React, { useEffect } from "react";
import { useGetStatisticsQuery } from "../../store/admin/statisticsSlice";
import Statics from "../../components/admin/statics/Statics"
import { Grid, Box } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import PageLoading from "../../components/PageLoading"

export default function Index() {
    let { data, isLoading } = useGetStatisticsQuery();
    
    return (
        isLoading ? <PageLoading /> :  
        <Grid item xs={12} sm={10}>
            <Box textAlign="center" width="90%" margin="auto" marginTop="40px" marginBottom="20px"  >
                <PageHeader text="statistics" />
                <Box textAlign="center" margin="0px auto">
                    <Statics stats={data.statistics} />
                </Box>
            </Box>
        </Grid>
    )
};
