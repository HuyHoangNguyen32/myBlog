import { NavLink } from "react-router-dom";

function AdminHeader() {
  return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container">
        <span className="navbar-brand">
          Admin Dashboard
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-item nav-link" to="create">
                Create Post
              </NavLink>
              <NavLink className="nav-item nav-link" to="edit">
                Edit Post
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
  );
}

export default AdminHeader;
