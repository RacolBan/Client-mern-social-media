import { Box, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFoundData() {
  const navigate = useNavigate();
  return (
   <Box onClick={() => navigate('/')} sx={{cursor: 'pointer'}}>
    <Typography variant='h1'>
      Your Data that you are looking up is not existed
    </Typography>
   </Box>
  )
}
