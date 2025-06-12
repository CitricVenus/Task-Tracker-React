"use client";

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTaskContext();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === id);

    if (foundTask) {
      setTask(foundTask);
    } else {
      navigate("/");
    }

    setLoading(false);
  }, [id, tasks, navigate]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <Link to="/" className="btn btn-link mb-3 ps-0">
          <i className="bi bi-arrow-left me-1"></i>
          Back to Task List
        </Link>

        <div className="card shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="card-title mb-0">
              <i className="bi bi-pencil-square me-2"></i>
              Edit Task
            </h5>
          </div>
          <div className="card-body">{task && <TaskForm task={task} />}</div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
