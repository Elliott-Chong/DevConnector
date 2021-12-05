import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { AiTwotoneHeart } from "react-icons/ai";

const PostItem = ({ post }) => {
  const {
    state: { user },
    like,
    deletePost,
  } = useGlobalContext();
  const { text, name, avatar, likes, comments, date } = post;
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user._id}`}>
          <img className="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button
          type="button"
          className="btn btn-light"
          style={{ position: "relative" }}
          onClick={() => like(post._id)}
        >
          <AiTwotoneHeart
            style={{
              fontSize: "1.2rem",
              color: "red",
              position: "relative",
              top: "3.5px",
            }}
          />
          {"   "}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>

        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {user._id === post.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deletePost(post._id);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
