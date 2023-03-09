import { NavLink } from "react-router-dom";

export function AdminHeader() {
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
                Tạo bài viết
              </NavLink>
              <NavLink className="nav-item nav-link" to="edit">
                Chỉnh sửa bài viết
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
  );
}
