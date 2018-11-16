import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      photo: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      title: this.state.title,
      photo: this.state.photo,
      user
    };

    this.props.addPost(newPost);
    this.setState({ text: "", title: "", photo: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  value={this.state.title}
                  onChange={this.onChange}
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Title of your post"
                  style={{ marginBottom: 5 }}
                  name="title"
                />
                <input
                  value={this.state.photo}
                  onChange={this.onChange}
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="URL of image"
                  style={{ marginBottom: 5 }}
                  name="photo"
                />
                <small
                  style={{
                    marginBottom: 5,
                    fontSize: "11px",
                    fontStyle: "italic"
                  }}
                  className="form-text text-muted"
                >
                  Upload your image on{" "}
                  <a href="https://postimages.org/" target="_blank">
                    PostImages
                  </a>
                  &nbsp;and paste link here
                </small>

                <textarea
                  value={this.state.text}
                  onChange={this.onChange}
                  placeholder="Write something"
                  className="form-control"
                  rows="3"
                  name="text"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
