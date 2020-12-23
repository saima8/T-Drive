import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const FileShareSection = ({ file }) => {
  const [username, setUsername] = useState("");

  const submitShareFile = (e) => {
    e.preventDefault();

    Meteor.call("shareFileWithUser", file._id, username);

    setUsername("");
  };

  const sharedWithUsers = [];
  for (const propertyName in file) {
    if (propertyName.startsWith("sharedWith#") && file[propertyName]) {
      const sharedUserName = propertyName.replace("sharedWith#", "");
      sharedWithUsers.push(sharedUserName);
    }
  }

  const loginForm = (
    <>
      <tr>
        <td colSpan="2">
          <div className="card">
            <div className="card-header">
              <form onSubmit={submitShareFile} className="">
                <div>
                  <label className="mr-2" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <button className="btn btn-sm btn-primary ml-3" type="submit">
                    Share File
                  </button>
                </div>
              </form>
            </div>

            {sharedWithUsers.length > 0 && (
              <div className="card-body">
                Shared with:{" "}
                <h5>
                  {sharedWithUsers.map((sharedUserName) => (
                    <div
                      className="badge badge-secondary mx-1"
                      key={file._id + " shared with " + sharedUserName}
                    >
                      <span>{sharedUserName}</span>

                      <span
                        className="ml-2"
                        onClick={() =>
                          Meteor.call(
                            "stopSharingFileWithUser",
                            file._id,
                            sharedUserName
                          )
                        }
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </h5>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );

  return loginForm;
};
