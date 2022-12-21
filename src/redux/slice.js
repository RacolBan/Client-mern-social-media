import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  mode: 'light',
  token: null,
  user: null,
  post: []
};
export const authSlice = createSlice( {
  name: 'auth',
  initialState,
  reducers: {
    setMode: state => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    handleLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    handleLogout: state => {
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {
      state.user 
        ? state.user.friends = action.payload.friends 
        : console.error('user friends non-existent')
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatePosts = state.post.map( post => {
        if( post._id === action.payload.post_id ) return action.payload.post 
          return post
      });
      state.posts = updatePosts;
    }
  }
});
export const { setMode, handleLogin, handleLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;