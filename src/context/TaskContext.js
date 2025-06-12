"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Define the localStorage key
const STORAGE_KEY = "task-tracker-tasks";
const STORAGE_VERSION = "1.0"; // For future schema migrations

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const loadTasksFromStorage = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setTasks(parsedData.tasks || []);
          showNotification("Tasks loaded from local storage", "info");
        }
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
        showNotification("Failed to load saved tasks", "danger");
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasksFromStorage();
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    // Only save after initial load to prevent overwriting with empty array
    if (isLoaded) {
      try {
        const storageData = {
          version: STORAGE_VERSION,
          lastUpdated: new Date().toISOString(),
          tasks: tasks,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
        showNotification("Failed to save tasks", "danger");
      }
    }
  }, [tasks, isLoaded]);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    showNotification("Task added successfully");
  };

  // Update an existing task
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    showNotification("Task updated successfully");
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showNotification("Task deleted successfully", "danger");
  };

  // Toggle task completion status
  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          showNotification(
            completed ? "Task marked as completed" : "Task marked as pending",
            completed ? "success" : "warning"
          );
          return { ...task, completed };
        }
        return task;
      })
    );
  };

  // Clear all tasks
  const clearAllTasks = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all tasks? This action cannot be undone."
      )
    ) {
      setTasks([]);
      showNotification("All tasks have been cleared", "warning");
    }
  };

  // Get task counts
  const getTaskCounts = () => {
    const all = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = all - completed;

    return { all, completed, pending };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        clearAllTasks,
        notification,
        getTaskCounts,
        isLoaded,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
