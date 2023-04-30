import { Alert, Box, Grid, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDeleteAllNotificationsMutation, useGetAllNotificationsQuery } from "../store/user/notificationSlice";
import ProtectedUserPage from "../components/pagesProviders/ProtectedUserPage";
import NextLink from "next/link"
import PageLoading from "../components/PageLoading";
function Notifications() {
  
  let notifications = useGetAllNotificationsQuery(undefined, { refetchOnMountOrArgChange: false })
  
  let [deleteNotifications, _deleteNotificationresult] = useDeleteAllNotificationsMutation();
  
  useEffect(() => {
    return () => {
      deleteNotifications()
    }
  }, []);

  return (
    notifications.isSuccess ? 
      <>
        <Typography sx={{ textAlign: "center", fontSize: "fontSizes.meduim", color: "secondary.main", marginBottom: 3 }}>Notifications</Typography>
        {
          notifications.data.length > 0 ?
            <Box>
              {
                notifications.data.map((notification, index) => (
                  <Box sx={{ border: 1, borderColor: "#eee", marginBottom: 2, width: "100%", padding: 3, backgroundColor: "primary.main" }} key={index}>
                    <Grid container>
                      <Grid item xs={8}>
                        <Typography variant="body2" color="white">{notification.message}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "center"}}>
                        <NextLink href={"/orders/" + notification.relatedId}>
                          <Link sx={{ textDecoration: "none", color: "#eee", border: "1px solid #eee", paddingX: 2, paddingY: 1 }} href={"/orders/" + notification.orderId}>show order</Link>
                        </NextLink>
                      </Grid>
                    </Grid>
                  </Box>
                ))
              }
            </Box>
          : <Alert severity="info">There are currently no notifications</Alert>
        }
      </>
    : <PageLoading />
  );
}

export default ProtectedUserPage(Notifications)