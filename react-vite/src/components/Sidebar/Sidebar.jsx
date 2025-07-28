import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
              />
            </div>
          </li>

          <li>
            <NavLink className="create-btn" to="notebook/select">+ Note</NavLink>
          </li>
          <li>
            <NavLink className="create-btn" to="notebooks/new">+ Notebook</NavLink>
          </li>
          <li>
            <NavLink className="create-btn" to="">+ Task</NavLink>
          </li>
          <li>
            <NavLink className="create-btn" to="">+ Tag</NavLink>
          </li>

          {/* Regular navigation */}
          <li>
            <NavLink className="nav-btn" to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink className="nav-btn" to="notes/all">Notes</NavLink>
          </li>
          <li>
            <NavLink className="nav-btn" to="tasks">Tasks</NavLink>
          </li>
          <li>
            <NavLink className="nav-btn" to="notebooks">Notebooks</NavLink>
          </li>
          <li>
            <NavLink className="nav-btn" to="tags">Tags</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
