import { Box, Typography, useTheme, Divider } from '@mui/material';
import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import UserImage from 'component/UserImage';
import WidgetWrapper from 'component/WidgetWrapper';
import FlexBetween from 'component/FlexBetween';
import { memo, useEffect, useState } from 'react';
import axiosClient from 'api/api.config';
import { useNavigate } from 'react-router-dom';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const navigate = useNavigate();
  const getUser = async () => {
    const { data } = await axiosClient.get(`/user/${userId}`);
    setUser(data);
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }
  const {
    firstName, lastName, location, occupation, viewedProfile, impressions, friends
  } = user

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap='0.5rem' pb='1.1rem' onClick={() => navigate(`/profile/${userId}`)}>
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              fontWeight='500'
              color={dark}
              sx={{
                "&:hover": {
                  color: palette.neutral.light,
                  cursor: 'pointer'
                }
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />
      {/* SECOND ROW */}
      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem' >
          <LocationOnOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium} >{location}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem' >
          <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
          <Typography color={medium} >{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* THIRD ROW */}
      <Box p='1rem 0' >
        <FlexBetween mb='0.5rem'>
          <Typography color={medium} >Who's viewed your profile</Typography>
          <Typography color={main} fontWeight='500' >{viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium} >Impression of your posts</Typography>
          <Typography color={main} fontWeight='500' >{impressions}</Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* FOURTH ROW */}
      <Box p='1rem 0'>
        <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>Social Profile</Typography>
        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={main} >Twitter</Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap='1rem' >
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='linkedin' />
            <Box>
              <Typography color={main} >Linkedin</Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
};
export default memo(UserWidget);