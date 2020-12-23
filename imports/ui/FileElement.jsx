import React from "react";

export const FileElement = ({ file, onDeleteClick }) => {
  return (
    <li>
      <span>
        <a href={file.url} target="_blank" download={file.name}>
          {file.name}
        </a>
      </span>

      <button onClick={() => onDeleteClick(file)}>&times;</button>
    </li>
  );
};
