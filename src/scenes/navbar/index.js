import React, { useState } from 'react'
import { Box, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { Search, Close, Message, DarkMode, LightMode, Notifications, Help, Menu } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, handleLogout } from '../../redux/slice';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../component/FlexBetween';
export default function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');
  const theme = useTheme();
  const user = state => state.user;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullname = `${user.firstName} ${user.lastName}`;
  console.log(fullname);
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
        {isNonMobileScreen && (
          <FlexBetween backgroundColor={neutralLight} borderRadius='9px' padding='0.1rem 1.5rem' gap='3rem' >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreen
        ? <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.dark === 'dark'
              ? <DarkMode sx={{ fontSize: '25px' }} />
              : <LightMode sx={{ color: 'dark', fontSize: '25px' }} />
            }
          </IconButton>
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />
          <FormControl variant='standard' value={fullname} >
            <Select
              value={fullname}
              sx={{
                backgroundColor: neutralLight,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem',
                '& .MuiSvgicon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullname}>
                <Typography>{fullname}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(handleLogout())}> Logout </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween >
        : <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      }
      {/* MOBILE NAV */}
      {!isNonMobileScreen && isMobileMenuToggled &&
        <Box
          position='fixed'
          right='0'
          bottom='0'
          minWidth='300px'
          maxWidth='500px'
          height='100%'
          zIndex='10'
          backgroundColor={background}
        >
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>
          {/* MENU ITEMS */}
          <FlexBetween display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='2rem'>
            <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: '25px' }}>
              {theme.palette.dark === 'dark'
                ? <DarkMode sx={{ fontSize: '25px' }} />
                : <LightMode sx={{ color: 'dark', fontSize: '25px' }} />
              }
            </IconButton>
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />
            <FormControl variant='standard' value={fullname} >
              <Select
                value={fullname}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem',
                  '& .MuiSvgicon-root': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: neutralLight,
                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullname}>
                  <Typography>{fullname}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(handleLogout())}> Logout </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween >

        </Box>
      }
    </FlexBetween>
  )
}
