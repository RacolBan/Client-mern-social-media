import React, { useState } from 'react'
import { Box, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material';
import { Search, Close, Message, DarkMode, LightMode, Notifications, Help, Menu } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../redux/slice';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../component/FlexBetween';
export default function Navbar() {
  const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');
  const theme = useTheme();
  console.log(theme);
  
  const user = state => state.user;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.deafult;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullname = `${user.firstName} ${user.lastName}`;
  return (
    <FlexBetween padding='1rem 6%' background={alt}>
      <FlexBetween gap='1.75rem'>
        <Typography 
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)' 
          onClick={() => navigate('/home')} 
          sx={{
            "&:hover": { 
              color: primaryLight, 
              cursor: 'pointer'
            }
          }}>
            Sociopedia
        </Typography>
      </FlexBetween>
    </FlexBetween>
  )
}
