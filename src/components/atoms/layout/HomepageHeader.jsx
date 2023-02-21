import { NavLink } from "react-router-dom";

function HomepageHeader() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top" id="main-nav">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          My Blog
        </NavLink>
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/posts">
                Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="admin/create">
                Create Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="admin/edit">
                Edit Post
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HomepageHeader;
