import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { getUser, getToken } from "./helper";
import renderHtml from "react-render-html";

const App = (props) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((error) => alert("Error Fetching Post"));
  };

  useEffect(() => {
    console.log(props, "this is App console");
    fetchPosts();
  }, []);

  const deleteConfirm = (slug) => {
    if (window.confirm(`Are you sure  want to delete `)) {
      deletePost(slug);
    }
  };

  const deletePost = (slug) => {
    // alert("this post deleted" + slug);

    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        console.log(response);
        alert(response.data.message);

        fetchPosts();
      })
      .catch((error) => alert("Error when Deleteing Post", error));
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1>MERN CRUD</h1>
      <hr />

      {posts.map((post, i) => (
        <div
          className="row"
          key={post._id}
          style={{ borderBottom: "1px solid  #000000" }}
        >
          <div className="col pt-3 pb-2">
            <div className="row">
              <div style={{ overflowWrap: "anywhere" }} className="col-md-10">
                <Link to={`post/${post.slug}`}>
                  {" "}
                  <h2
                    style={{
                      background: "black",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    {post.title}
                  </h2>{" "}
                </Link>
                <p className="lead">
                  {renderHtml(post.content.substring(0, 100))}
                </p>
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
              </div>
              {getUser() && (
                <div className="col-md-2">
                  <Link
                    style={{ marginRight: 10 }}
                    to={`post/update/${post.slug}`}
                    className="btn btn-sm btn-outline-warning "
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteConfirm(post.slug)}
                    className="btn btn-sm btn-outline-danger mr-1"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
