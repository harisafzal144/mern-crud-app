import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { getUser, getToken } from "./helper";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.bubble.css";
import renderHtml from "react-render-html";

const Create = (props) => {
  //states  hooks

  const [state, setState] = useState({
    title: "",

    user: getUser(),
  });

  const [content, setContent] = useState("");

  //destructure values from state

  const { title, user } = state;

  //onchange event handler

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleContent = (event) => {
    setContent(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let contentcreate = renderHtml(content);
    console.log("Content console", contentcreate.props.children[0]);

    const postData = { ...state, content };
    console.log(postData);
    //create and post
    axios

      .post(`${process.env.REACT_APP_API}/post`, postData, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        console.log(res, "Response");

        setState({ ...state, title: "", user: getUser() });
        setContent("");

        alert(`Post titled ${res.data.title} is created`);
      })
      .catch((err) => {
        console.log(err, "Error");
      });

    console.table({ title, content, user });
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>Create Post</h1>
      <br />

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
            //  style={{border}}
          />
          {/* <textarea
           
          /> */}
        </div>
        <div className="form-group">
          <label className="text-muted">User </label>
          <input
            onChange={handleChange("user")}
            value={user}
            disabled
            type="text"
            className="form-control"
            placeholder="Your Name"
            required
          />
        </div>

        <div style={{ paddingTop: 10 }}>
          <button className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
