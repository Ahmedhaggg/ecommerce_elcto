import React from 'react'
import SelectInput from '../SelectInput'
let isAvailableItems = [
    {
        value: true,
        text: "iaVailable"
    },
    {
        value: false,
        text: "isNotAvailable"
    }
]

export default function SelectIsAvailable({ control, error }) {
  return (
    <SelectInput
        defaultValue={true}
        name="isAvailable"
        control={control}
        error={error}
        items={isAvailableItems}
    />
  )
}
