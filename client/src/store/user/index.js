import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { UserApiSlice } from "./userApiSlice"
import userSlice from "./user"
import cartSlice from "./cart"
import notificationSlice from "./notifications";

const UserStore = () => configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        notifications: notificationSlice,
        [UserApiSlice.reducerPath]: UserApiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }).concat(UserApiSlice.middleware)
});


export const AppStore = UserStore;
export const RootState = AppStore["getState"]
export const AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(UserStore, { debug: true });