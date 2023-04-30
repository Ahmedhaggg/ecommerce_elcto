import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notifications",
    initialState: { notifications: [] },
    reducers: {
        addNotifications: (state, action) => {
            state.notifications = action.payload.notifications;
        },
        addNewNotification: (state, action) => {
            state.notifications = [...state.notifications, action.payload];
        },
        removeAllNotifications: (state, action) => {
            state.notifications = [];
        }
    }
})

export const { addNotifications, addNewNotification, removeAllNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;