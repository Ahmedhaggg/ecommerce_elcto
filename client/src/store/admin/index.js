import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { AdminApiSlice } from "./adminApiSlice"
import AdminAuth from "./adminAuth"

const AdminStore = () => configureStore({
    reducer: {
        auth: AdminAuth,
        [AdminApiSlice.reducerPath]: AdminApiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }).concat(AdminApiSlice.middleware)
})


export const AppStore = AdminStore;
export const RootState = AppStore["getState"]
export const AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper(AdminStore, { debug: true });