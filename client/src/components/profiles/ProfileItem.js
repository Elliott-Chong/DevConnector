import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  const { status, company, location, skills, user } = profile;

  return (
    <div className="profile bg-light">
      {user && <img src={user.avatar} alt="avatar" className="round-img" />}
      <div>
        {!user && <h2>User Deleted :(</h2>}
        {user && <h2>{user.name}</h2>}
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        {user && (
          <Link to={`/profile/${user._id}`} className="btn btn-primary">
            View User's Profile
          </Link>
        )}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => {
          return (
            <li key={index} className="text-primary">
              <i className="fas fa-check"></i> {skill}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileItem;
