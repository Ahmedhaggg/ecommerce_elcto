import React, { useEffect } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { Controller, useForm } from "react-hook-form"
import PageHeader from "../components/PageHeader";
import CustomButton from "../components/user/CustomButton";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../store/user/authSlice"
export default function Login() {
    let { control, handleSubmit, formState: { errors } } = useForm();
    let router = useRouter();
    let [register, registerResult] = useRegisterMutation();

    let loginSubmit = (registerData) => {
        register(registerData)
    }
    console.log(registerResult)
    useEffect(() => {
        if (registerResult.isSuccess) {
            router.push("/login")
        }
    }, [registerResult])

    return (
        <Grid container justifyContent="center" height="100vh" alignItems="center" >
            <Grid item xl={6} xs={11} md={6} >
                <PageHeader text="register" />
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
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="firstName"
                                error={Boolean(errors.userName)}
                                sx={{ marginBottom: 2 }}
                                {...field}
                            ></TextField>
                        )}
                    ></Controller>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        render={({ field }) => (
                            <TextField
                                type="text"
                                variant="outlined"
                                fullWidth
                                label="lastName"
                                error={Boolean(errors.userName)}
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
                        registerResult?.error?.data?.message ? <Alert severity="error" sx={{ marginBottom: 2 }}>{registerResult.error.data.message}</Alert> : null
                    }
                    <CustomButton text="register" />
                </form>
            </Grid>
        </Grid>

    )
}
