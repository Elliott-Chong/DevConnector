import React from "react";
import Moment from "react-moment";
import { useGlobalContext } from "../../context/context";

const Education = ({ educations }) => {
  const { delete_education } = useGlobalContext();
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((education) => {
            return (
              <tr key={education._id}>
                <td>{education.school}</td>
                <td className="hide-sm">{education.degree}</td>
                <td>
                  <Moment format="YYYY/DD/MM">{education.from}</Moment> -{" "}
                  {education.to === null ? (
                    "Now"
                  ) : (
                    <Moment format="YYYY/DD/MM">{education.to}</Moment>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      delete_education(education._id);
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

export default Education;
