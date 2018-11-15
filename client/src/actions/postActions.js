import axios from "axios";

import { ADD_POST, GET_POSTS, GET_POST, POST_LOADING } from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/posts/create/", postData)
    .then(res => {
      console.log(res.data);
      dispatch({ type: ADD_POST, payload: res.data });
    })
    .catch(err => console.log(err));
};

// Get Posts
export const getPosts = () => dispatch => {
  axios
    .get("/posts/")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
