import React from "react";
import { useGlobalContext } from "../../context/context";
import ProfileItem from "./ProfileItem";

import Spinner from "../layout/Spinner";

const AllProfiles = () => {
  const { state, get_all_profiles } = useGlobalContext();
  const { all_profiles, loading } = state;
  React.useEffect(() => get_all_profiles(), [get_all_profiles]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {all_profiles &&
            all_profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
        </>
      )}
    </>
  );
};

export default AllProfiles;
