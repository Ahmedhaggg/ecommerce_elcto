import { env } from "../../next.config";
import { UserApiSlice } from "./userApiSlice";

export const productSlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: ({ page, categoryId, title }) => ({
                method: "GET",
                url: `v1/products?${page ? "page=" + page + "&": "" }${title ? `title=${title}&` : ""}${categoryId ? "categoryId=" + categoryId : ""}`
            })
        }),
        getProduct: builder.query({
            query: (slug) => ({
                method: "GET",
                url: `v1/products/${slug}`
            })
        })
    })
}) 

export const {  util, useGetAllProductsQuery } = productSlice;
export const { getAllProducts, getProduct } = productSlice.endpoints;