/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from 'api/api.config';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { setPosts } from 'redux/slice';
import PostWidget from './PostWidget';
export default function PostsWidget({userId, isProfile = false}) {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const getPosts = async () => {
    try { 
      const {data} = await axiosClient.get('/post');
      dispatch(setPosts({posts: data}));
    } catch(error) {
      toast.error(error.response.data.msg)
    };
  }
  const getUserPosts = async () => {
    try {
      const {data} = await axiosClient.get(`post/${userId}`);
      dispatch(setPosts({posts: data}));
    } catch (error) {
      toast.error(error.response.data.msg)
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
};
