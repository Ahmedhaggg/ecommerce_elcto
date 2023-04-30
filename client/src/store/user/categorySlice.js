import { env } from "../../next.config";
import { UserApiSlice } from "./userApiSlice";

export const categorySlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCategories: builder.query({
            query: () => ({
                method: "GET",
                url: "v1/categories"
            })
        }),
        getCategory: builder.query({
            query: (slug) => ({
                method: "GET",
                url: `v1/categories/${slug}`
            })
        })
    })
})

export const { useGetAllCategoriesQuery } = categorySlice;
export const { getAllCategories, getCategory } = categorySlice.endpoints;