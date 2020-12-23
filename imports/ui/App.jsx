import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { FilesCollection } from "/imports/db/FilesCollection";
import { FilesList } from "./FilesList";
import { FileUploadForm } from "./FileUploadForm";

const deleteFile = ({ _id }) => Meteor.call("files.remove", _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const ownerFilter = user ? { ownerId: user._id } : {};

  const { files, isLoadingFiles } = useTracker(() => {
    const noDataAvailable = { files: [] };

    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe("files");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoadingFiles: true };
    }

    const files = FilesCollection.find(ownerFilter, {
      sort: { createdAt: -1 },
    }).fetch();

    return { files };
  });

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ T Drive</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user">
              <h3>{user.username} </h3> &nbsp; &nbsp; &nbsp;
              <button className="user-logout" onClick={logout}>
                logout
              </button>
            </div>

            <div className="filter">
              {/* <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button> */}

              <FileUploadForm />
            </div>

            <FilesList isLoadingFiles={isLoadingFiles} files={files} functions={{deleteFile}}/>

          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
