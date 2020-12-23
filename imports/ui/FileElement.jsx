import React, { useState } from "react";
import { FileShareSection } from "./FileShareSection";

export const FileElement = ({
  file,
  onDeleteClick,
  stopSharingWithMe,
  currentPage,
}) => {
  const [showShareSection, setshowShareSection] = useState(false);

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
