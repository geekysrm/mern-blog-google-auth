import React from "react";
import axios from "axios";
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  componentDidMount() {
    axios
      .get("/api/current_user")
      .then(res => {
        if (!res.data) window.location.assign("/");
        this.setState({ profile: res.data });
        console.log(this.state.profile);
      })
      .catch(err => {
        console.log(err.response);
      });
  }
  render() {
    return (
      <div>
        <ul>
          <li>Name:{this.state.profile.name}</li>
          <li>email:{this.state.profile.email}</li>
          <img src={this.state.profile.photo} alt="" />
        </ul>
        <a href="/api/logout">Logout</a>
      </div>
    );
  }
}

export default Profile;
