import { Pagination } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'

export default function OrdersPagination({ ordersCount }) {
  let router = useRouter();
  
  const handleChange = (_, value) => {
    router.push({
      query: { status: router.query.status || "completed", page: value }
    });
  };
  
  return (
    <Box  sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
      <Pagination 
        count={ordersCount} 
        variant="outlined" 
        shape="rounded" 
        size='large'
        onChange={handleChange}
      />
    </Box>
  )
}

