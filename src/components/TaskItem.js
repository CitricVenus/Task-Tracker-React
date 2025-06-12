"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

function TaskItem({ task }) {
  const { toggleTaskStatus, deleteTask } = useTaskContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    deleteTask(task.id);
    setShowConfirm(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`card mb-3 task-card ${task.completed ? "completed" : ""}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="form-check form-check-lg">
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskStatus(task.id)}
              id={`task-${task.id}`}
            />
            <label
              className="form-check-label fw-bold task-title fs-5"
              htmlFor={`task-${task.id}`}
            >
              {task.title}
            </label>
          </div>
          <div>
            {!showConfirm ? (
              <>
                <Link
                  to={`/edit/${task.id}`}
                  className="btn btn-sm btn-outline-primary me-2"
                >
                  <i className="bi bi-pencil"></i> Edit
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setShowConfirm(true)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </>
            ) : (
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="card-text task-description mb-3">{task.description}</p>
        <div className="text-muted small d-flex align-items-center">
          <i className="bi bi-clock me-1"></i>
          <span>Created: {formatDate(task.createdAt)}</span>
          <span
            className={`ms-auto badge ${
              task.completed ? "bg-success" : "bg-primary"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
