import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/db/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";
import { FilesCollection } from "/imports/db/FilesCollection";
import { FileElement } from "./FileElement";
import { FileUploadForm } from "./FileUploadForm";

const deleteFile = ({ _id }) => Meteor.call("files.remove", _id);

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call("tasks.setIsChecked", _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

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

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

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

            <TaskForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            {isLoadingFiles && <div className="loading">loading...</div>}

            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>

            <FileUploadForm />

            <ul className="files">
              {files.map((file) => (
                <FileElement
                  key={file._id}
                  file={file}
                  onDeleteClick={deleteFile}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
