import { MenuItem, Select } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

export default function OrdersFilter() {
    let router = useRouter();
    let { status } = router.query;
    
    let handleFilterChange = (event) => {
        router.push({
            query: {
                ...router.query,
                status: event.target.value
            }
        })
    }

    return (
        <Select value={status} onChange={handleFilterChange} fullWidth>
            <MenuItem value="pending">Pending Orders</MenuItem>
            <MenuItem value="shipped">Shipped Orders</MenuItem>
            <MenuItem value="completed">Completed Orders</MenuItem>
        </Select>
    )
}
