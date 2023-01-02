/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'api/api.config';
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'redux/slice';
import PostWidget from './PostWidget';
export default memo(function PostsWidget({userId, isProfile = false}) {
  console.log(isProfile)
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  console.log(posts);
  const getPosts = async () => {
    try { 
      const {data} = await axiosClient.get('/post');
      dispatch(setPosts({posts: data}));
    } catch(error) {
      console.error(error)
    };
  }
  const getUserPosts = async () => {
    try {
      const {data} = await axiosClient.get(`post/${userId}`);
      dispatch(setPosts({posts: data}));
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    isProfile ? getUserPosts() : getPosts()
  }, []);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          picturePath,
          location,
          description,
          userPicturePath,
          likes,
          comments
      }) => (
        <PostWidget 
          key={_id}
          postId={_id}
          postUserId={userId}
          firstName={firstName}
          lastName={lastName}
          picturePath={picturePath}
          location={location}
          description={description}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
        />
      ))}   
    </>
  )
});
