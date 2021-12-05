import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Spinner from "../layout/Spinner";

const SinglePost = ({ match }) => {
  const [formData, setFormData] = React.useState("");
  const id = match.params.id;
  const { state, getPost, addComment, deleteComment } = useGlobalContext();
  const { post, user } = state;
  React.useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    <>
      {!post ? (
        <Spinner />
      ) : (
        <>
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user._id}`}>
                <img
                  className="round-img"
                  src={post.user.avatar}
                  alt="avatar"
                />
                <h4>{post.user.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
            </div>
          </div>

          <div className="post-form">
            <div className="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form
              className="form my-1"
              onSubmit={(e) => {
                e.preventDefault();
                addComment(post._id, formData);
                setFormData("");
              }}
            >
              <textarea
                name="text"
                cols="30"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                rows="5"
                placeholder="Comment on this post"
                required
              ></textarea>
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>

          <div className="comments">
            <>
              {post.comments.length === 0 && <h4>Wow such empty!</h4>}
              {post.comments.map((comment) => {
                return (
                  <div key={comment._id} className="post bg-white p-1 my-1">
                    <div>
                      <Link to={`/profile/${comment.user._id}`}>
                        <img
                          className="round-img"
                          src={comment.avatar}
                          alt="avatar"
                        />
                        <h4>{comment.name}</h4>
                      </Link>
                    </div>
                    <div>
                      <p className="my-1">{comment.text}</p>
                      <p className="post-date">
                        Posted on{" "}
                        <Moment format="YYYY/MM/DD">{comment.date}</Moment>
                      </p>
                      {comment.user === user._id && (
                        <button
                          onClick={() => deleteComment(comment._id, post._id)}
                          className="btn btn-danger"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        </>
      )}
    </>
  );
};

export default SinglePost;
