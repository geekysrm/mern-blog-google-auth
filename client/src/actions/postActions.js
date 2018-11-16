import axios from "axios";

import { ADD_POST, GET_POSTS } from "./types";

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
