import React from "react";

const ProfileAbout = ({ profile }) => {
  const {
    bio,
    skills,
    user: { name },
  } = profile;
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
      <p>{bio}</p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, idx) => {
          return (
            <div key={idx} className="p-1">
              <i className="fa fa-check"></i> {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileAbout;
