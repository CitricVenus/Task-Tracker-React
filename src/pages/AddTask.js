import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import StorageInfo from "../components/StorageInfo";

function AddTask() {
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
              <i className="bi bi-plus-circle me-2"></i>
              Add New Task
            </h5>
          </div>
          <div className="card-body">
            <TaskForm />
          </div>
          <div className="card-footer bg-white">
            <StorageInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
