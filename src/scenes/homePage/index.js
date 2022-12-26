import React from 'react'
import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../navbar';
import { useSelector } from 'react-redux';
import UserWidget from 'scenes/widgets/UserWidget';
export default function HomePage() {
  const {_id, picturePath } = useSelector(state => state.user);
  console.log(_id, picturePath)
  const isNonMobileScreen = useMediaQuery('(min-width:1000px ');
  return (
    <>
      <Box>
        <Navbar />
        <Box 
          display={isNonMobileScreen ? 'flex' : 'block'}
          width='100%'
          p='2rem 6%'
          gap='0.5rem'
          justifyContent='space-between'
        >
          <Box flexbasic={isNonMobileScreen ? '26%' : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box flexbasic={isNonMobileScreen ? '42%' : undefined} mt={isNonMobileScreen ? undefined : '2rem'}
          >
          </Box>
          {isNonMobileScreen && <Box flexbasic={isNonMobileScreen ? '26%' : undefined}></Box>}

        </Box>
      </Box>
    </>
  )
}
