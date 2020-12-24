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

  const [currentPage, setCurrentPage] = useState("myFiles");

  const ownerFilter = user ? { ownerId: user._id } : {};
  const sharedWithMeFilter = user
    ? { ["sharedWith#" + user.username]: true }
    : {};

  const { files, isLoadingFiles } = useTracker(() => {
    const noDataAvailable = { files: [] };

    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe("files");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoadingFiles: true };
    }

    const filter = currentPage == "myFiles" ? ownerFilter : sharedWithMeFilter;

    const files = FilesCollection.find(filter, {
      sort: { createdAt: -1 },
    }).fetch();

    return { files };
  });

  const logout = () => Meteor.logout();

  const stopSharingWithMe = (fileId) =>
    Meteor.call("stopSharingFileWithUser", fileId, user.username);

  return (
    <div className="app container">
      <header>
        <div className="app-bar">
          <div className="app-header d-flex">
            <h1 className="mr-auto">📝️ T Drive</h1>

            {user && (
              <div className="user">
                <h3>{user.username} </h3> &nbsp; &nbsp; &nbsp;
                <button className="btn btn-sm user-logout" onClick={logout}>
                  <i className="fas fa-power-off"></i>
                  <span className="ml-2">logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="main py-3">
        {user ? (
          <Fragment>
            <div className="filter">
              

              <div
                className="btn-toolbar mb-3"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group mr-2"
                  role="group"
                  aria-label="First group"
                >
                  <button
                    type="button"
                    className={
                      currentPage == "myFiles" ? "btn btn-secondary" : "btn "
                    }
                    onClick={() => setCurrentPage("myFiles")}
                  >
                    My Files
                  </button>
                  <button
                    type="button"
                    className={
                      currentPage == "sharedWithMe"
                        ? "btn btn-secondary"
                        : "btn "
                    }
                    onClick={() => setCurrentPage("sharedWithMe")}
                  >
                    Shared With Me
                  </button>
                </div>
                <div className="input-group">
                  <FileUploadForm />
                </div>
              </div>
            </div>

            <FilesList
              isLoadingFiles={isLoadingFiles}
              files={files}
              functions={{ deleteFile, stopSharingWithMe }}
              currentPage={currentPage}
            />
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
