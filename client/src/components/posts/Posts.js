import React, { Component } from "react";
import { connect } from "react-redux";

import { getPosts } from "../../actions/postActions";
import { setCurrentUser } from "../../actions/authActions";
import RemoveDuplicates from "../../utilities/RemoveDuplicates";

import "./Posts.css";

export class Posts extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    await this.props.setCurrentUser();
    await this.props.getPosts();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.post.posts.length === 0) this.props.getPosts();
    if (this.props.post !== prevProps.post) {
      console.log(RemoveDuplicates(this.props.post.posts));
      this.setState({
        posts: RemoveDuplicates(this.props.post.posts)
      });
    }
  }
  render() {
    return (
      <div className="posts-container">
        <center>
          <h1>All Posts</h1>
          <hr />
        </center>
        <div className="card-container">
          {this.state.posts.length !== 0 ? (
            this.state.posts.map(item => (
              <React.Fragment key={item.post._id}>
                <div className="card" style={{ width: "25rem" }}>
                  <img
                    className="card-img-top"
                    src={item.post.photo}
                    alt="Card cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.post.title}</h5>
                    <p className="card-text">{item.post.text}</p>
                    <hr />
                    <img
                      className="avatar"
                      src={item.user.photo}
                      alt="User avatar"
                    />
                    <span className="username text-muted">
                      {item.user.name}
                    </span>
                    <br />
                    <i className="date text-muted">
                      {item.post.date.split("T")[0]}
                    </i>
                  </div>
                </div>
                <br />
              </React.Fragment>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, setCurrentUser }
)(Posts);
