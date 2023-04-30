import React, { useEffect } from "react";
import { Grid, TextField, Button, Alert } from "@mui/material";
import { Controller, useForm } from "react-hook-form"
import PageHeader from "../../components/PageHeader";
import CustomButton from "../../components/admin/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/admin/adminAuth"
import PageLoading from "../../components/PageLoading";
import { useRouter } from "next/router";

export default  function Login() {
    let { control, handleSubmit, formState: { errors } } = useForm();
    let auth = useSelector(state => state.auth);
    let dispatch = useDispatch();
    let router = useRouter();

    let loginSubmit = (loginData) => {
        dispatch(login(loginData))
    }
    
    if (auth.token) {
        router.push("/admin")
    }

    return (
        auth.token ? <PageLoading /> :
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
                            auth.loginError && <Alert severity="error" sx={{ marginBottom: 2 }}>{auth.loginError}</Alert>
                        }
                        <CustomButton text="login" />
                    </form>
                </Grid>
            </Grid>

    )
}