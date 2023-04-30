import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const userSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: (page) => ({
                method: "GET",
                url: `v1/users?page=${page}`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        }),
        getUser: builder.query({
            query: (userId) => ({
                method: "GET",
                url: `v1/users/${userId}`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        }),
        countUsers: builder.query({
            query: () => ({
                method: "GET",
                url: `v1/users/count`,
            })
        })
    })
})

export const { useGetAllUsersQuery, useGetUserQuery, useCountUsersQuery, util: { getRunningOperationPromises } } = userSlice;
export const { getUser } = userSlice.endpoints;