"use client";

function TaskFilter({ filter, setFilter, counts }) {
  const filters = [
    { value: "all", label: "All", icon: "bi-list-ul" },
    { value: "pending", label: "Pending", icon: "bi-hourglass-split" },
    { value: "completed", label: "Completed", icon: "bi-check-circle" },
  ];

  return (
    <div className="btn-group w-100">
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          className={`btn ${
            filter === f.value ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFilter(f.value)}
        >
          <i className={`bi ${f.icon} me-1`}></i>
          {f.label}
          {counts && (
            <span className="badge bg-light text-dark ms-1">
              {counts[f.value] || 0}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
