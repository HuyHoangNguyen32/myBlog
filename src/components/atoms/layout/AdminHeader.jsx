import { NavLink } from "react-router-dom";

function AdminHeader() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
      </nav>
    </>
  );
}

export default AdminHeader;
