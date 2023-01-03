import { Button, Divider, Box, IconButton, InputBase, Typography, useMediaQuery, useTheme } from '@mui/material';
import axiosClient from 'api/api.config';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'redux/slice';
import WidgetWrapper from 'component/WidgetWrapper';
import FlexBetween from 'component/FlexBetween';
import UserImage from 'component/UserImage';
import Dropzone from 'react-dropzone';
import { AttachFileOutlined, DeleteOutlined, EditOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
export default function MyPostWidgets({ picturePath }) {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [post, setPost] = useState('');
  const { _id } = useSelector(state => state.user);
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', _id)
      formData.append('description', post)
      if (image) {
        formData.append('picture', image)
        formData.append('picturePath', image.name)
      };
      const { data } = await axiosClient.post('/post', formData);
      dispatch(setPosts({ posts: data }))
      setImage(null);
      setPost('');
    } catch (error) {
      toast.error(error.response.data.msg)
    }
   
  }
  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase
          placeholder="what's on your mind"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem'
          }}
        />
      </FlexBetween>
      {isImage &&
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              setImage(acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width='100%'
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image &&
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '15%' }}>
                    <DeleteOutlined />
                  </IconButton>
                }
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      }
      <Divider sx={{ margin: '1.25rem 0' }} />
      <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
        <FlexBetween>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            sx={{
              "&:hover": {
                cursor: 'pointer',
                color: medium
              }
            }}
            color={mediumMain}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreen ? (
          <>
            <FlexBetween gap='0.25rem'>
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography sx={{
                "&:hover": {
                  cursor: 'pointer',
                  color: medium
                }
              }} color={mediumMain}
              >
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap='0.25rem'>
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography sx={{
                "&:hover": {
                  cursor: 'pointer',
                  color: medium
                }
              }} color={mediumMain}
              >
                Attachment
              </Typography>
            </FlexBetween>
            <FlexBetween gap='0.25rem'>
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography sx={{
                "&:hover": {
                  cursor: 'pointer',
                  color: medium
                }
              }} color={mediumMain}
              >
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap='0.25rem'>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={() => handlePost()}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRaidus: '3rem'
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
};
