import React from "react";
import { useGlobalContext } from "../../context/context";
import PostItem from "./PostItem";

const Posts = () => {
  const { state, getPosts, addPost } = useGlobalContext();
  const { posts } = state;
  React.useEffect(() => getPosts(), [getPosts]);
  const [formData, setFormData] = React.useState("");
  return (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            addPost(formData);
            setFormData("");
          }}
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="posts">
        {posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </>
  );
};

export default Posts;
