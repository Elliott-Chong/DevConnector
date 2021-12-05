import React from "react";
import Moment from "react-moment";

const ProfileEducation = ({ education }) => {
  const { school, degree, fieldofstudy, to, from, description } = education;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : <span>Current</span>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>

      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>

      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
