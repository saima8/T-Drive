import React from "react";
import { FileElement } from "./FileElement";

export const FilesList = ({ isLoadingFiles, files, functions }) => {
  return (
    <>
      {isLoadingFiles && <div className="loading">loading...</div>}

      <ul className="files">
        {files.map((file) => (
          <FileElement key={file._id} file={file} onDeleteClick={functions.deleteFile} />
        ))}
      </ul>

      {files.length == 0 && (
        <div className="center-aligned large-height">No File Here</div>
      )}
    </>
  );
};
