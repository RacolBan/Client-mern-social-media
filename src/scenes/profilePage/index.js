import { useMediaQuery } from '@mui/material'
import { Box } from '@mui/material';
import axiosClient from 'api/api.config';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidgets from 'scenes/widgets/MyPostWidgets';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';

export default function ProfilePage() {
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const { data } = await axiosClient.get(`/user/${userId}`)
      setUser(data);
    } catch (error) {
     console.error(error)
    };
  };
  useEffect(() => {
    getUser();
  }, []);
  if(!user) return null;
  return (
    <Box>
      <Navbar />
      <Box 
          display={isNonMobileScreen ? 'flex' : 'block'}
          width='100%'
          p='2rem 6%'
          gap='0.5rem'
          justifyContent='center'
        >
          <Box flexbasic={isNonMobileScreen ? '26%' : undefined}>
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m='2rem 0' />
            <FriendListWidget userId={userId} />
          </Box>
          <Box flexbasic={isNonMobileScreen ? '42%' : undefined} mt={isNonMobileScreen ? undefined : '2rem'}
          >
            <MyPostWidgets picturePath={user.picturePath} />
            <Box m='2rem 0' />
            <PostsWidget userId={userId} isProfile/>
          </Box>
     
        </Box>
    </Box>
  )
}
