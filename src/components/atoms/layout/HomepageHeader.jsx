import { NavLink } from "react-router-dom"

function HomepageHeader() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/posts">
              Posts
            </NavLink>
            <NavLink className="nav-item nav-link" to="admin/create">
              Create Post
            </NavLink>
            <NavLink className="nav-item nav-link" to="admin/edit">
              Edit Post
            </NavLink>
          </div>
        </div>
      </nav>
  )
}

export default HomepageHeader

