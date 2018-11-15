import React from "react";
import { connect } from "react-redux";

import { setCurrentUser } from "../../actions/authActions";

import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: [] };
  }

  async componentDidMount() {
    await this.props.setCurrentUser();
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push("/");
    // }
  }
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <div className="jumbotron">
          <h1 className="display-4">Howdy, {this.props.auth.user.name}!</h1>
          <p className="lead">We got these details about you.</p>
          <hr className="my-4" />
          <center>
            <ul>
              <li>Your Name: {this.props.auth.user.name}</li>
              <li>Your Email: {this.props.auth.user.email}</li>
              <img className="photo" src={this.props.auth.user.photo} alt="" />
            </ul>
          </center>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { setCurrentUser }
)(Profile);
