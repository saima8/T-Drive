import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { PickerInline, PickerOverlay } from "filestack-react";

export const FileUploadForm = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const fileUploadSuccess = (response) => {
    console.log(response);

    response.filesUploaded.forEach((uploadedFile) => {
      const file = {
        name: uploadedFile.filename,
        url: uploadedFile.url,
        isDirectory: false,
      };

      Meteor.call("files.insert", file);
    });

    setShowOverlay(false);
  };

  return (
    <div className="file-upload-div">
      {showOverlay && (
        <PickerOverlay
          apikey="AFbl1oNHIRSyM9f5SOswBz"
          onSuccess={fileUploadSuccess}
        />
      )}

      <button
        className="btn"
        onClick={() => {
          setShowOverlay(false);
          setTimeout(() => setShowOverlay(true), 100);
        }}
      >
        <i className="fas fa-upload"></i>
        <span className="ml-3">Upload File</span>
      </button>
    </div>
  );
};
