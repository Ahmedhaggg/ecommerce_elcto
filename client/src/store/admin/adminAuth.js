import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { env } from "../../next.config";
import cookies from "../../services/cookies/index"
import { adminTokenKey } from "../../services/cookies/cookies_keys"
export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkApi) => {
        let { rejectWithValue } = thunkApi;
        try {
            let sendLogin = await fetch(
                `${env.API_URL}v1/admins/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            )
            let loginResult = await sendLogin.json();
            if (loginResult.success === false)
                return rejectWithValue(loginResult);

            cookies.set(adminTokenKey, loginResult.token);

            return loginResult.token;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const slice = createSlice({
    name: "auth",
    initialState: { token: cookies.get(adminTokenKey) || null, isLoading: false, loginError: null, socket: null },
    reducers: {
        logout: (state) => {
            state.token = null
        },
        addSocket: (state, action) => {
            state.socket = action.payload.socket
        },
        removeSocket: (state) => {
            state.socket = null
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.loginError = null;
            state.token = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.loginError = action.payload.loginError || action.payload.message;
        }

    }

})

export const { logout, addSocket, removeSocket } = slice.actions;

export default slice.reducer;