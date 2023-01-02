import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material';
import { IconButton, Typography, useTheme, Box, Divider } from '@mui/material';
import axiosClient from 'api/api.config';
import FlexBetween from 'component/FlexBetween';
import Friend from 'component/Friend';
import WidgetWrapper from 'component/WidgetWrapper';
import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'redux/slice';
export default memo(function PostWidget(props) {
  const {
    postId,
    postUserId,
    firstName,
    lastName,
    picturePath,
    location,
    description,
    userPicturePath,
    likes,
    comments,
  } = props;
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector(state => state.user._id);
  const isLike = Boolean(likes[loggedInUserId]);
  const countLike = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const name = `${firstName} ${lastName}`;
  const patchLike = async () => {
    try {
      const { data } = await axiosClient.patch(`/post/${postId}/like`, { userId: loggedInUserId });
      dispatch(setPost({ post: data }));
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <WidgetWrapper m='2rem 0'>
      <Friend userPicturePath={userPicturePath} name={name} friendId={postUserId} subtitle={location} />
      <Typography
        color={main}
        sx={{ mt: '1rem' }}
      >
        {description}
      </Typography>
      {picturePath &&
        <img
          height='auto'
          width='100%'
          src={`http://localhost:8000/assets/${picturePath}`}
          alt={`${picturePath}`}
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
        />
      }
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLike ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{countLike}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment &&
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={i}>
              <Divider />
              <Typography sx={{ color: main, pl: '1rem', m: '0.5rem 0' }}>{comment}</Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      }

    </WidgetWrapper>
  )
});
