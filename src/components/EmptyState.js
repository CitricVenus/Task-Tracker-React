import { Link } from "react-router-dom";
import StorageInfo from "./StorageInfo";

function EmptyState({ searchTerm }) {
  return (
    <div className="empty-state">
      {searchTerm ? (
        <>
          <i className="bi bi-search empty-state-icon"></i>
          <h4>No matching tasks found</h4>
          <p className="text-muted">
            Try a different search term or clear your search
          </p>
        </>
      ) : (
        <>
          <i className="bi bi-journal-check empty-state-icon"></i>
          <h4>No tasks yet</h4>
          <p className="text-muted">Get started by adding your first task</p>
          <Link to="/add" className="btn btn-primary mt-2">
            <i className="bi bi-plus-lg me-1"></i>
            Add Your First Task
          </Link>
          <StorageInfo />
        </>
      )}
    </div>
  );
}

export default EmptyState;
