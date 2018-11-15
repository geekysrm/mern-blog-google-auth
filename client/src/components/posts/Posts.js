import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";

import "./Posts.css";

export class Posts extends Component {
  state = {
    posts: []
  };
  async componentDidMount() {
    await this.props.getPosts();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== prevProps.post) {
      this.setState({ posts: this.props.post.posts });
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
              <React.Fragment>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src="https://via.placeholder.com/150"
                    alt="Card cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">*Card Title*</h5>
                    <p className="card-text">{item.text}</p>
                    <hr />
                    <img
                      className="avatar"
                      src="https://via.placeholder.com/150"
                      alt="User avatar"
                    />
                    <span className="username text-muted">*name of user*</span>
                    <br />
                    <i className="date text-muted">12 May</i>
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
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
