import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import Spinner from "../layout/Spinner";
import { Link, withRouter } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = () => {
  const { state, getCurrentProfile, delete_account } = useGlobalContext();
  const { profile, loading, user } = state;
  useEffect(() => getCurrentProfile(), [getCurrentProfile]);
  if (loading) return <Spinner />;
  return (
    <>
      {!loading && (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fa fa-user"></i>
            Welcome {user && user.name}
          </p>
          {profile === null ? (
            <>
              <p> You have not set up a profile, please add some info </p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </>
          ) : (
            <>
              <DashboardActions />
              {profile && <Experience experiences={profile.experience} />}
              {profile && <Education educations={profile.education} />}
              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    delete_account();
                  }}
                >
                  <i className="fas fa-user-minus"></i> Delete My Account
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default withRouter(Dashboard);
