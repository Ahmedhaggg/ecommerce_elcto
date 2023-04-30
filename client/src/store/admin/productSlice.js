import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const productSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: (page) => ({
                method: "GET",
                url: `v1/products?page=${page}`
            }),
            providesTags: ["Product"]
        }),
        getProduct: builder.query({
            query: (slug) => {
                return ({
                    method: "GET",
                    url: `v1/products/${slug}`
                })
            },
            providesTags: ["Product"]
        }),
        createProduct: builder.mutation({
            query: (productData) => {
                let productFormData = new FormData();
                productFormData.append("title", productData.title);
                productFormData.append("categoryId", productData.categoryId);
                productFormData.append("image", productData.image);
                productFormData.append("price", productData.price);
                productFormData.append("description", productData.description);
                productFormData.append("isAvailable", productData.isAvailable);

                return {
                    method: "POST",
                    url: "v1/products",
                    headers: {
                        "authorization": cookies.get(adminTokenKey)
                    },
                    body: productFormData
                }
            },
            invalidatesTags: ["Product"]
        }),
        updateProduct: builder.mutation({
            query: ({ slug, newData }) => ({
                method: "PATCH",
                url: "v1/products/" + slug,
                headers: {
                    "authorization": cookies.get(adminTokenKey),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            }),
            invalidatesTags: ["Product"]
        }),
        updateProductImage: builder.mutation({
            query: ({ slug, newImage }) => {
                let productFormData = new FormData();
                productFormData.append("newImage", newImage);
                return {
                    method: "PATCH",
                    url: `v1/products/${slug}/image`,
                    headers: {
                        "authorization": cookies.get(adminTokenKey)
                    },
                    body: productFormData
                }
            },
            invalidatesTags: ["Product"]
        }),
        countProducts: builder.query({
            query: () => ({
                method: "GET",
                url: `v1/products/count`
            })
        })
    })
})

export const { 
    useCreateProductMutation, 
    useGetAllProductsQuery, 
    useGetProductQuery,
    useUpdateProductMutation,
    useUpdateProductImageMutation,
    useCountProductsQuery
} = productSlice;
export const { getAllProducts, getProduct } = productSlice.endpoints;