import { DeleteOutlineOutlined, PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { IconButton, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import axiosClient from 'api/api.config';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setFriends, setPosts } from 'redux/slice';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

export default function Friend({ postId, friendId, name, subtitle, userPicturePath }) {
  const dispatch = useDispatch();
  const { _id } = useSelector(state => state.user);
  console.log(_id)
  const { friends } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends?.find(friend => friend._id === friendId);
  const isYourSelf = Boolean(_id === friendId);

  const patchFriend = async () => {
    try {
      const { data } = await axiosClient.patch(`/user/${_id}/${friendId}`);
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error);
    };
  };
  const deletePost = async () => {
    try {
      const { data } = await axiosClient.delete(`/post/${postId}/${_id}/delete`);
      dispatch(setPosts({ posts: data }));
      toast.success('delete succesfully');
    } catch(error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              "&:hover": { color: primaryLight, cursor: 'pointer' }
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {isYourSelf ? (
        <>
          <IconButton onClick={() => deletePost()}>
            <DeleteOutlineOutlined />
          </IconButton>
        </>
      ) : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{
            backgroundColor: primaryLight,
            p: '0.6rem'
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )
          }
        </IconButton>
      )}

    </FlexBetween>
  )
}
