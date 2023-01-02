import { Typography, useTheme } from '@mui/material'
import FlexBetween from 'component/FlexBetween'
import WidgetWrapper from 'component/WidgetWrapper'
import React, { memo } from 'react'

export default memo(function AdverWidget(){
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography 
          color={dark} 
          variant='h5' 
          fontWeight='500'
        >
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img 
        width='100%'
        height='auto' 
        alt='advert'
        style={{borderRadius: '0.75rem', margin:'0.75rem'}}
        src='http://localhost:8000/assets/info4.jpeg'
      />
      <FlexBetween>
        <Typography color={main} >MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Your pathway to stunning and immaculate beauty and made sure your skin is exfloliating skin and shining like light.  
      </Typography>
    </WidgetWrapper>
  )
});