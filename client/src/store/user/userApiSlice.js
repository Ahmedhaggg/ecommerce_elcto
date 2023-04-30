import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { env }  from "../../next.config"
export const UserApiSlice = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE)
            return action.payload[reducerPath]
    },
    reducerPath: "userApiSlice",
    baseQuery: fetchBaseQuery({ 
        baseUrl: env.API_URL
    }),
    tagTypes: ["Order", "Notification"],
    endpoints: builder => ({
    
    })
})

