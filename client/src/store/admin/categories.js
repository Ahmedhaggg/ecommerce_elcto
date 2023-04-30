import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const categorySlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCategories: builder.query({
            query: () => ({
                method: "GET",
                url: "v1/categories",
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            }),
            providesTags: ["Category"]
        }),
        getCategory: builder.query({
            query: (slug) => {
                return {
                    method: "GET",
                    url: `v1/categories/${slug}`
                }
            }
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "v1/categories",
                headers: {
                    "authorization": cookies.get(adminTokenKey),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["Category"]
        })
    })
})

export const { useCreateCategoryMutation, useGetAllCategoriesQuery, useGetCategoryQuery } = categorySlice;
export const { getAllCategories, getCategory } = categorySlice.endpoints;