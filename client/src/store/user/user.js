import { createSlice } from "@reduxjs/toolkit"
import cookies from "../../services/cookies"
import { userTokenKey, userIdKey } from "../../services/cookies/cookies_keys"

const userSlice = createSlice({
    name: "user",
    initialState: { token: cookies.get(userTokenKey) || null, userId: cookies.get(userIdKey) || null },
    reducers: {
        setUser: (state, action) => {
            cookies.set(userTokenKey, action.payload.token)
            state.token = action.payload.token;
            cookies.set(userIdKey, action.payload.userId)
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            cookies.destroy(userTokenKey);
            cookies.destroy(userIdKey);
            state.token = null;
            state.userId = null;
        }
    }
})

export const { logout, setUser, addSocket } = userSlice.actions;

export default userSlice.reducer;