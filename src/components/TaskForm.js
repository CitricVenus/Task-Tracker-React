"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

function TaskForm({ task = null }) {
  const navigate = useNavigate();
  const { addTask, updateTask } = useTaskContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (task) {
        // Update existing task
        updateTask({
          ...task,
          ...formData,
        });
      } else {
        // Add new task
        addTask({
          ...formData,
          completed: false,
        });
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        <div className="form-text">A clear and concise title for your task</div>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description <span className="text-danger">*</span>
        </label>
        <textarea
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Enter task description"
        ></textarea>
        {errors.description && (
          <div className="invalid-feedback">{errors.description}</div>
        )}
        <div className="form-text">
          Provide details about what needs to be done
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/")}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {task ? "Updating..." : "Adding..."}
            </>
          ) : task ? (
            <>
              <i className="bi bi-check-lg me-1"></i> Update Task
            </>
          ) : (
            <>
              <i className="bi bi-plus-lg me-1"></i> Add Task
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
