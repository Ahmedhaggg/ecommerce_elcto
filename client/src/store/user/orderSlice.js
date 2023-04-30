import { UserApiSlice } from "./userApiSlice";
import cookies from "../../services/cookies"
import { userTokenKey } from "../../services/cookies/cookies_keys"
import { env } from "../../next.config";

export const notificationSlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => ({
                method: "GET",
                url: "v1/orders",
                headers: {
                    'authorization': cookies.get(userTokenKey)
                }
            }),
            providesTags: ["Order"]
        }),
        getOrder: builder.query({
            query: ({ id, userToken }) => ({
                method: "GET",
                url: "v1/orders/" + id,
                headers: {
                    'authorization': userToken
                }
            })
        }),
        createOrder: builder.mutation({
            query: (orderData) => {
                return ({
                    method: "POST",
                    url: "v1/orders/",
                    headers: {
                        'authorization': cookies.get(userTokenKey),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                })
            },
            invalidatesTags: ["Order"]
        })
    })
})

export const { useGetOrdersQuery, useCreateOrderMutation } = notificationSlice;
export const { getOrder } = notificationSlice.endpoints;