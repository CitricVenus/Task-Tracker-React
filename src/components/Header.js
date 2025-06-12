import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-check2-circle header-icon"></i>
          <span className="fw-bold">Task Tracker</span>
        </Link>
        <div className="d-flex">
          {location.pathname !== "/add" && (
            <Link to="/add" className="btn btn-light">
              <i className="bi bi-plus-lg me-1"></i>
              Add Task
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
