import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
export default function SelectInput({ error, control, name, defaultValue, rules, items }) {
    return (
        <FormControl
            fullWidth
            error={Boolean(error)}
            sx={{ marginBottom: 2 }}

        >
            <InputLabel>{name}</InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <Select
                        name={field.name}
                        value={field.value}
                        label={field.name}
                        error={Boolean(error)}
                        {...field}
                    >
                        {
                            items.map(item => <MenuItem key={item._id || item.value} value={item._id || item.value}>{item.title || item.text}</MenuItem>)
                        }
                    </Select>
                )}
            ></Controller>
        </FormControl>
    );
}
