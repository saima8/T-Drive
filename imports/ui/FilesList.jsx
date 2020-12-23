import React from "react";
import { FileElement } from "./FileElement";

export const FilesList = ({
  isLoadingFiles,
  files,
  currentPage,
  functions,
}) => {
  return (
    <>
      {isLoadingFiles && <div className="loading">loading...</div>}

      <table className="table table-hover">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody className="files">
          {files.map((file) => (
            <FileElement
              key={file._id}
              file={file}
              onDeleteClick={functions.deleteFile}
              stopSharingWithMe={functions.stopSharingWithMe}
              currentPage={currentPage}
            />
          ))}
        </tbody>
      </table>

      {files.length == 0 && (
        <div className="center-aligned large-height">No File Here</div>
      )}
    </>
  );
};
