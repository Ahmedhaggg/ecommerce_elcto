import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Alert, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form"
import PageHeader from "../components/PageHeader";
import CustomButton from "../components/user/CustomButton";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/user/authSlice"
import { setUser } from "../store/user/user";
import Link from "next/link";
import PageLoading from "../components/PageLoading"
export default function Login() {
    let { control, handleSubmit, formState: { errors } } = useForm();
    let router = useRouter();
    let user = useSelector(state => state.user);
    let [login, loginResult] = useLoginMutation();
    let [pageLoading, setPageLoading] = useState(true);
    let dispatch = useDispatch();


    useEffect(() => setPageLoading(false) , []);

    useEffect(() => {
        if (user.token)
            router.push("/")
    }, [])

    useEffect(() => {
        if (loginResult.isSuccess) {
            dispatch(setUser({ token: loginResult.data.token, userId: loginResult.data.userId }));
            router.push("/")
        }

    }, [loginResult])

    let loginSubmit = (loginData) => {
        login(loginData)
    }


    if (pageLoading || user.token)
        return <PageLoading />;

    return (
        <Grid container justifyContent="center" height="100vh" alignItems="center" >
            <Grid item xl={6} xs={11} md={6} >
                <PageHeader text="login" />
                <form onSubmit={handleSubmit(loginSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                            <TextField
                                type="email"
                                variant="outlined"
                                fullWidth
                                label="email"
                                error={Boolean(errors.email)}
                                sx={{ marginBottom: 2 }}
                                {...field}
                            ></TextField>
                        )}
                    ></Controller>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 8,
                        }}
                        render={({ field }) => (
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                label="Password"
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.password)}
                                {...field}
                            ></TextField>
                        )}
                    ></Controller>
                    {
                        loginResult?.error?.data?.message ? <Alert severity="error" sx={{ marginBottom: 2 }}>{loginResult.error.data.message}</Alert> : null
                    }
                    <CustomButton text="login" />
                    <Typography variant="body1" textAlign="center" marginTop={2}>haven't account ? click <Link href="/register">here</Link></Typography>
                </form>
            </Grid>
        </Grid>

    )
}
