import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function Input({ name, type, control, rules, error, ...props }) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={rules}
            render={({ field }) => (
                <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    label={name}
                    error={Boolean(error)}
                    sx={{ marginBottom: 2 }}
                    {...field}
                    {...props}
                ></TextField>
            )}
        ></Controller>
    );
}
