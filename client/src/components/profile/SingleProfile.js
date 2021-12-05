import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
const SingleProfile = ({ match }) => {
  const id = match.params.id;
  const { get_profile_by_user_id, state } = useGlobalContext();
  const { loading, profile, isAuthenticated } = state;
  React.useEffect(() => {
    get_profile_by_user_id(id);
  }, [get_profile_by_user_id, id]);

  return (
    <>
      {loading || !profile ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profile" className="btn btn-light">
            Back to profiles
          </Link>
          {isAuthenticated && profile.user._id === state.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Profile
            </Link>
          )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => {
                    return (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    );
                  })}
                </>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => {
                    return (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    );
                  })}
                </>
              ) : (
                <h4>No Education Credentials</h4>
              )}
            </div>

            {profile.githubusername && <ProfileGithub />}
          </div>
        </>
      )}
    </>
  );
};

export default SingleProfile;
