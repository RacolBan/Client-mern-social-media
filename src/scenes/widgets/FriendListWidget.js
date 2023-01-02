import { Typography, useTheme, Box } from '@mui/material';
import axiosClient from 'api/api.config';
import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { setFriends } from 'redux/slice';
import Friend from 'component/Friend';
export default memo( function FriendListWidget({userId}) {
  const {palette} = useTheme();
  const friends = useSelector(state => state.user.friends);
  const getFriends = async () => {
    const {data} = axiosClient.get(`user/${userId}/friends`)
    dispatchEvent(setFriends({friends: data}))
  };
  useEffect(() => {
    getFriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
   <>
    <Typography color={palette.neutral.dark} variant='h5' fontWeight='500' sx={{mg:'1.5rem'}} >
      Friend List
    </Typography>
    <Box>
      {
        friends.map(friend => (
          <Friend key={friend._id} friendId={friend._id} name={`${friend.firstName} ${friend.lastName}`} subtitle={friend.occupation} userPicturePath={friend.picturePath} />
        ))
      }
    </Box>
   </>
  )
});
