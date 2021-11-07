import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.bubble.css";

import { getUser, getToken } from "./helper";

const UpdatePost = (props) => {
  const [state, setState] = useState({
    title: " ",
    slug: "",
    // content: " ",
    user: "",
  });

  const [content, setContent] = useState("");

  const { title, slug, user } = state;

  useEffect(() => {
    console.log(props);

    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((res) => {
        const { title, user, content, slug } = res.data;
        setState({ ...state, title, user, slug });
        setContent(content);
      })
      .catch((error) => alert("Error Fetching Single Post"));
  }, []);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleContent = (event) => {
    setContent(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatePostData = { title, user, content };
    console.log(updatePostData);
    //create and post
    axios
      .put(`${process.env.REACT_APP_API}/post/${slug}`, updatePostData, {
        headers: { authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        setState({ ...state, title, content, user });
        alert(`Post titled ${title} is updated`);
        //props.history.push("/");
      })
      .catch((err) => {
        console.log(err, "Error");
      });

    console.table({ title, content, user });
  };

  const showUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title </label>
        <input
          onChange={handleChange("title")}
          value={title}
          type="text"
          className="form-control"
          placeholder="Post"
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Content</label>
        <ReactQuil
          onChange={handleContent}
          value={content}
          theme="bubble"
          className="form-control"
          placeholder="Write Something...."
          required
        />
      </div>
      <div className="form-group">
        <label className="text-muted">User </label>
        <input
          onChange={handleChange("user")}
          value={user}
          type="text"
          className="form-control"
          placeholder="Your Name"
          required
        />
      </div>

      <div style={{ paddingTop: 10 }}>
        <button className="btn btn-primary">Update</button>
      </div>
    </form>
  );

  return (
    <div className="container pb-5">
      <Nav />

      <br />
      <h1>Update Post</h1>
      <hr />
      <div className="col container pt-3 pb-2">
        {showUpdateForm()}

        {/* <div>
          <button
            onClick={() => props.history.push("/")}
            class="btn btn-primary"
          >
            Back
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UpdatePost;
