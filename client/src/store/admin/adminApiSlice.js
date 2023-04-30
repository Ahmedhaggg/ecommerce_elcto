import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import {env}  from "../../next.config"

export const AdminApiSlice = createApi({
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE)
            return action.payload[reducerPath]
    },
    reducerPath: "adminApiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: env.API_URL }),
    tagTypes: ["Category", "Product", "Order"],
    endpoints: builder => ({
    })
})


// export const { useGetAllCategoriesQuery, useCreateCategoryQuery, util: { getRunningOperationPromises } } = AdminApiSlice;
// export const { getAllCategories, createCategory } = AdminApiSlice.endpoints;