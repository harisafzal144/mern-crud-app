import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import renderHtml from "react-render-html";

const SinglePost = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    console.log(props);

    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((res) => {
        console.log(res, "single Post");
        setPost(res.data);
      })
      .catch((error) => alert("Error Fetching Single Post"));
  }, []);

  const showSinglePost = () => {
    return (
      <div className="col container pt-3 pb-2">
        <h2>{post.title}</h2>
        <p className="lead ">{renderHtml(post.content)}</p>
        <p>
          Author{" "}
          <span style={{ color: "#000000" }} className="badge">
            {post.user}
          </span>{" "}
          Published on{" "}
          <span style={{ color: "#000000" }} className="badge">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </p>
        <button
          onClick={() => props.history.push("/", post)}
          class="btn btn-primary"
        >
          Back
        </button>
      </div>
    );
  };

  return (
    <div className="container pb-5">
      <Nav />

      <br />

      {post && showSinglePost()}
    </div>
  );
};

export default SinglePost;
