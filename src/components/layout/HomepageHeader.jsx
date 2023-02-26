import { NavLink } from "react-router-dom";

export function HomepageHeader() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top" id="main-nav">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          My Blog
        </NavLink>
      </div>
    </nav>
  );
}
