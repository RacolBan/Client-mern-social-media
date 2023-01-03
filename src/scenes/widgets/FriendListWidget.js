import { Typography, useTheme, Box } from '@mui/material';
import axiosClient from 'api/api.config';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'redux/slice';
import Friend from 'component/Friend';
import WidgetWrapper from 'component/WidgetWrapper';
import { toast } from 'react-toastify';
export default  function FriendListWidget({userId}) {
  const {palette} = useTheme();
  const { friends } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getFriends = async () => {
    try{
      const {data} =  await axiosClient.get(`user/${userId}/friends`);
      dispatch(setFriends({friends: data}));
    } catch(error){
      toast.error(error.response.data.msg)
    };
  };
  useEffect(() => {
    getFriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <WidgetWrapper>
      <Typography 
        color={palette.neutral.dark} 
        variant='h5' 
        fontWeight='500' 
        sx={{mb:'1.5rem'}} 
      >
        Friend List
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {friends.map(friend => (
            <Friend key={friend._id} 
            friendId={friend._id} 
            name={`${friend.firstName} ${friend.lastName}`} 
            subtitle={friend.occupation} 
            userPicturePath={friend.picturePath} 
            />
        ))}
      </Box>
    </WidgetWrapper>
  )
};
