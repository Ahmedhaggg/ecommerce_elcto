import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from "react-redux";
import { useGetAllNotificationsQuery } from "../../../../store/user/notificationSlice";
import { addNewNotification, addNotifications } from "../../../../store/user/notifications";
// export default function Notification() {
//     let { notifications } = useSelector(state => state.notifications);
//     let { data, isSuccess } = useGetAllNotificationsQuery();

//     let dispatch = useDispatch();

//     useEffect(() => {
        
//         if (isSuccess && notifications.length == 0)
//             dispatch(addNotifications({ notifications: data }));
//         else if (isSuccess)
//             dispatch(addNewNotification(data[0]));
        
//     }, [data])


//     return <Badge badgeContent={notifications.length || 0} color="error">
//         <NotificationsIcon />
//     </Badge>
// }

export default function Notification() {
    let { data, isSuccess } = useGetAllNotificationsQuery();

    return <Badge badgeContent={isSuccess ? data.length : 0} color="error">
        <NotificationsIcon />
    </Badge>
}
