import { Pagination } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function CustomPagination({ counts, handleChange }) {
  let onChange = (_event, value) => handleChange(value);
  
  let  pagesCount = Math.ceil(counts / 10);

  return (
    <Box  sx={{ marginTop: 5, display: "flex", justifyContent: "center" }}>
      <Pagination 
        count={pagesCount} 
        variant="outlined" 
        shape="rounded" 
        size='large'
        onChange={onChange}
      />
    </Box>
  )
}

