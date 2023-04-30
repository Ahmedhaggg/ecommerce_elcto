import cookies from "../../services/cookies";
import { adminTokenKey } from "../../services/cookies/cookies_keys";
import { AdminApiSlice } from "./adminApiSlice";

export const staticSlice = AdminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getStatistics: builder.query({
            query: () => ({
                method: "GET",
                url: `v1/statistics`,
                headers: {
                    "authorization": cookies.get(adminTokenKey)
                }
            })
        })
    })
});

export const { useGetStatisticsQuery } = staticSlice;
