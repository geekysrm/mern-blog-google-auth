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
    if (this.props.post.posts.length === 0) this.props.getPosts();
    if (this.props.post.posts.length !== prevProps.post.posts.length) {
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
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
