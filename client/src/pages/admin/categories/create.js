import { Alert, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomButton from "../../../components/admin/CustomButton";
import Input from "../../../components/admin/Input";
import PageHeader from "../../../components/PageHeader";
import useSuccess from "../../../customHooks/useSuccess";
import { useCreateCategoryMutation } from "../../../store/admin/categories";

export default function Create() {
    let router = useRouter();
    let { control, formState: { errors }, handleSubmit } = useForm();
    let [createCategory, { isSuccess, error, data }] = useCreateCategoryMutation();

    const submitHandler = (values) => createCategory(values)

    let showMessage = useSuccess(isSuccess, `/admin/categories${data ? "/" + data.newCategory.slug : "" }`)

    return (
        <Grid item xs={12} sm={10} marginBottom={3}>
            <PageHeader text="create category" />
            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    name="title"
                    rules={{ required: false }}
                    type="text"
                    control={control}
                    error={errors.title}
                />
                {
                    error?.data.error == "VALIDATION_ERROR" ?
                        <Alert severity="error" sx={{ marginBottom: 2 }} >{error.data.description[0].msg}</Alert>
                        : null
                }
                {
                    showMessage && <Alert severity="success" sx={{ marginBottom: 2}}>category is created successfully</Alert> 
                }
                <CustomButton text="create category" />
            </form>
        </Grid>
    )
}
