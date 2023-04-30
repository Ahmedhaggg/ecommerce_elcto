import { UserApiSlice } from "./userApiSlice";
import cookies from "../../services/cookies";
import { userTokenKey } from "../../services/cookies/cookies_keys";
import { EventSourcePolyfill } from "event-source-polyfill";
import { env } from "../../next.config";

export const notificationSlice = UserApiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllNotifications: builder.query({
            query: () => ({
                method: "GET",
                url: "v1/notifications",
                headers: {
                    'authorization': cookies.get(userTokenKey)
                }
            }),
            transformResponse: (response) => response.notifications,
            async onCacheEntryAdded(
                _args,
                { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
                const eventSource = new EventSourcePolyfill(`${env.API_URL}v1/notifications/subscribe`, {
                    headers: {
                        "authorization": cookies.get(userTokenKey)
                    },
                    heartbeatTimeout: 360000
                });
                try {
                    await cacheDataLoaded;
                    
                    eventSource.onmessage = (data) => {
                        let newNotification = JSON.parse(data.data);
                        updateCachedData((draft) => {
                            draft.push(newNotification)
                        })
                    }
                } catch(error) {
                    eventSource.close()
                }
                await cacheEntryRemoved;
                eventSource.close()
            }
        }),
        subscribeOnNotification: builder.query({
            query: () => ({
                method: "GET",
                url: "v1/notifications/subscribe",
                headers: {
                    'authorization': cookies.get(userTokenKey)
                }
            })
        }),
        deleteAllNotifications: builder.mutation({
            query: () => ({
                method: "DELETE",
                url: `v1/notifications`,
                headers: {
                    'authorization': cookies.get(userTokenKey)
                }
            }),
            async onQueryStarted(_args, { dispatch }) {
                dispatch(UserApiSlice.util.updateQueryData("getAllNotifications", undefined, (draft) => {
                    draft.splice(0, draft.length);
                }))
            }
        })
    })
})

export const { useDeleteAllNotificationsMutation, useGetAllNotificationsQuery, useSubscribeOnNotificationQuery } = notificationSlice;