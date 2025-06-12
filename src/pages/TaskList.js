"use client";

import { useState, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";
import TaskFilter from "../components/TaskFilter";
import EmptyState from "../components/EmptyState";

function TaskList() {
  const { tasks, notification, getTaskCounts, clearAllTasks, isLoaded } =
    useTaskContext();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [counts, setCounts] = useState({ all: 0, completed: 0, pending: 0 });

  // Update counts when tasks change
  useEffect(() => {
    setCounts(getTaskCounts());
  }, [tasks, getTaskCounts]);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all' filter
  });

  // Filter tasks based on search term
  const displayedTasks = filteredTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isLoaded) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-12">
        {notification && (
          <div
            className={`alert alert-${notification.type} alert-dismissible fade show`}
            role="alert"
          >
            {notification.message}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="bi bi-list-check me-2"></i>
                Task Dashboard
              </h5>
              {tasks.length > 0 && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={clearAllTasks}
                >
                  <i className="bi bi-trash me-1"></i>
                  Clear All
                </button>
              )}
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <TaskFilter
                  filter={filter}
                  setFilter={setFilter}
                  counts={counts}
                />
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setSearchTerm("")}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {displayedTasks.length === 0 ? (
              <EmptyState searchTerm={searchTerm} />
            ) : (
              displayedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))
            )}
          </div>
          {tasks.length > 0 && (
            <div className="card-footer bg-white text-muted">
              <small>
                <i className="bi bi-info-circle me-1"></i>
                Your tasks are automatically saved in your browser's local
                storage
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
