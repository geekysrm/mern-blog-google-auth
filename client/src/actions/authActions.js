import axios from "axios";

import { SET_CURRENT_USER } from "./types";

export const setCurrentUser = () => dispatch => {
  axios
    .get("/api/current_user")
    .then(res => {
      //this.setState({ profile: res.data });
      console.log(res.data);
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};
