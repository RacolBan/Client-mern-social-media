import React from 'react'
import { Box, useMediaQuery } from '@mui/material';
import Navbar from '../navbar';
import { useSelector } from 'react-redux';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidgets from 'scenes/widgets/MyPostWidgets';
import PostsWidget from 'scenes/widgets/PostsWidget';
import AdverWidget from 'scenes/widgets/AdverWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
export default function HomePage() {
  const { _id, picturePath } = useSelector(state => state.user);
  const isNonMobileScreen = useMediaQuery('(min-width:1000px)');
  return (
    <Box>
      <Navbar />
      <Box
        display={isNonMobileScreen ? 'flex' : 'block'}
        width='100%'
        p='2rem 6%'
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? '42%' : undefined}
          mt={isNonMobileScreen ? undefined : '2rem'}
        >
          <MyPostWidgets picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen &&
          <Box flexBasis='26%'>
            <AdverWidget />
            <Box m='2rem 0' />
            <FriendListWidget userId={_id} />
          </Box>
        }
      </Box>
    </Box>
  )
}
