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
        <PickerInline
          apikey="AxupnRiI4RUegnGZhVEAwz"
          onSuccess={fileUploadSuccess}
        />
      )}

      <button onClick={() => setShowOverlay(!showOverlay)}>
        {showOverlay ? "Close Upload Form" : "Upload File"}
      </button>
    </div>
  );
};
