import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";
import {env}  from "../../next.config"
import { EventSourcePolyfill } from "event-source-polyfill"

export const orderSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllOrders: builder.query({
            query: ({ status, userId = null, page = null}) => ({
                method: "GET",
                url: `v1/orders?${
                    userId ? `userId=${userId}` :
                    status == "pending" ? `status=${status}` 
                    : status !== "pending" ? `status=${status}&page=${page}`
                    : ""
                }`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            }),
            providesTags: ["Order"],
            transformResponse: (response) => response.orders,
            async onCacheEntryAdded(
                args,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                if (!args.status || args.status !== "pending")
                    return;
                const eventSource = new EventSourcePolyfill(`${env.API_URL}v1/orders/subscribe`, {
                    headers: {
                        "authorization": cookies.get(adminTokenKey)
                    },
                    heartbeatTimeout: 360000
                });
                try {
                    await cacheDataLoaded;
                    
                    eventSource.onmessage = (data) => {
                        let newOrder = JSON.parse(data.data);
                        updateCachedData((draft) => {
                            draft.unshift(newOrder)
                        })
                    }
                } catch(error) {
                    eventSource.close()
                }
                await cacheEntryRemoved;
                eventSource.close()
            }
        }),
        countOrders: builder.query({
            query: (status) => {
                return ({
                    method: "GET",
                    url: `v1/orders/count?status=${status}`,
                    headers: {
                        "authorization": cookies.get(adminTokenKey)
                    }
                })
            }
        }),
        getOrder: builder.query({
            query: (orderId) => {
                return {
                    method: "GET",
                    url: `v1/orders/${orderId}`,
                    headers: {
                        "authorization": cookies.get(adminTokenKey)
                    }
                }
            },
            transformResponse: (response) => response.order,
            providesTags: ["Order"]
        }),
        updateOrder: builder.mutation({
            query: ({ id, newStatus }) => {
                return ({
                    method: "PATCH",
                    url: `v1/orders/${id}/status`,
                    headers: {
                        "authorization": cookies.get(adminTokenKey)
                    },
                    body: { status: newStatus }
            })},
            invalidatesTags: ["Order"]
        })
    })
});

export const { useGetAllOrdersQuery, useCountOrdersQuery, useGetOrderQuery, useUpdateOrderMutation } = orderSlice;
