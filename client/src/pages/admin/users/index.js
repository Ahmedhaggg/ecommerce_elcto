import UsersTable from "../../../components/admin/users/UsersTable";
import PageLoading from "../../../components/PageLoading";
import { useGetAllUsersQuery, useCountUsersQuery } from "../../../store/admin/userSlice";
import PageHeader from "../../../components/PageHeader";
import { Box, Grid, Alert } from "@mui/material";
import CustomPagination from "../../../components/CustomPagination";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
    let router = useRouter();
    let { page } = router.query;
    let { data, isSuccess } = useGetAllUsersQuery(page, { skip: page ? false : true });
    let usersCount = useCountUsersQuery();
    
    const handlePagination = (value) => {
        router.push({
            query: { page: value }
        });
    };
    
    return (
        isSuccess ?
            <Grid item xs={12} sm={10}>
                <Box textAlign="center" width="100%" marginTop="40px" marginBottom="20px"  >
                    <PageHeader text="users" />
                    <Box textAlign="center" margin="0px auto">
                        {data.users.length === 0 ? <Alert severity="info">no matched users</Alert> :
                            <UsersTable rows={data.users}  page={page || 1}/>
                        }
                    </Box>
                    { 
                        usersCount.isSuccess &&  usersCount.data.count > 10 ? 
                            <CustomPagination 
                                handleChange={handlePagination} 
                                counts={usersCount.data.count} 
                        /> : null 
                    }
                </Box>
            </Grid>
            : <PageLoading />
    );
}

