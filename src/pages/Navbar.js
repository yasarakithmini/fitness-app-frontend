import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../images/fixfit_logo.png';
import './Navbar.css';



export default function Navbar() {
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
      <div className="navbar-wrapper">
        <nav className="nav-1">
          <Link to="/" className="site-title">
            <img src={logo} alt="FixFit Logo" className="logo-image" />
          </Link>
          <button className="navbar-toggle" onClick={toggleMenu}>
            <span className="navbar-toggle-icon">&#9776;</span>
          </button>
          <ul
              className={`navbar-menu ${isOpen ? "navbar-menu-open" : ""}`}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/services">Services</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <button
                className="navbar-button-1"
                onClick={() => Navigate("/login")}
            >
              Login
            </button>
          </ul>
        </nav>
      </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
  );
}
