import React from "react";

export const FileElement = ({ file }) => {
  return (
    <li>
      <a href="{file.url}">{file.name}</a>
    </li>
  );
};
