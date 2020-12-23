import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { FileShareSection } from "./FileShareSection";

export const FileElement = ({
  file,
  onDeleteClick,
  stopSharingWithMe,
  currentPage,
}) => {
  const [showShareSection, setshowShareSection] = useState(false);

  const [username, setUsername] = useState("");

  const ownerId = file.ownerId;

  Meteor.call("findUsernameFromId", ownerId, function (err, user) {
    if (err) {
      console.log(err);
    }

    if (user) {
      if (!username) {
        setUsername(user.username);
      }
    }
  });

  return (
    <>
      <tr>
        <th scope="row">
          <a href={file.url} target="_blank" download={file.name}>
            {file.name}
          </a>
        </th>

        <td className="d-flex justify-content-end">
          {currentPage == "myFiles" && (
            <div className="btn-group">
              <button
                className="btn btn-primary"
                onClick={() => setshowShareSection(!showShareSection)}
              >
                Share
              </button>

              <button
                className="btn btn-danger"
                onClick={() => onDeleteClick(file)}
              >
                &times;
              </button>
            </div>
          )}

          {currentPage == "sharedWithMe" && (
            <div className="btn-group">
              {username && (
                <div className="btn btn-muted">Shared by {username}</div>
              )}

              <button
                className="btn btn-light"
                onClick={() => stopSharingWithMe(file._id)}
              >
                &times;
              </button>
            </div>
          )}
        </td>
      </tr>

      {showShareSection && <FileShareSection file={file} />}
    </>
  );
};
