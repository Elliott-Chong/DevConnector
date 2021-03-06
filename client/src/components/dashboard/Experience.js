import React from "react";
import Moment from "react-moment";
import { useGlobalContext } from "../../context/context";

const Experience = ({ experiences }) => {
  const { delete_experience } = useGlobalContext();
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => {
            return (
              <tr key={experience._id}>
                <td>{experience.company}</td>
                <td className="hide-sm">{experience.title}</td>
                <td>
                  <Moment format="YYYY/DD/MM">{experience.from}</Moment> -{" "}
                  {experience.to === null ? (
                    "Now"
                  ) : (
                    <Moment format="YYYY/DD/MM">{experience.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      delete_experience(experience._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Experience;
