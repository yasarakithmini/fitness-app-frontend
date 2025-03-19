import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../components/AuthContext';
import { FaUserCircle } from "react-icons/fa";
import logo from '../images/fixfit_logo.png';
import './Navbar.css';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const handleLogout = () => {
    setIsDrawerOpen(false);
    logout();
    Navigate('/login');
  };

  const handleSettings = () => {
    setIsDrawerOpen(false);
    Navigate('/profile');
  };

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

            {isLoggedIn ? (
                <>
                  <button
                      className="user-icon-btn"
                      onClick={toggleDrawer}
                  >
                    <FaUserCircle size={28} />
                  </button>
                </>
            ) : (
                <button
                    className="navbar-button-1"
                    onClick={() => Navigate("/login")}
                >
                  Login
                </button>
            )}
          </ul>
        </nav>

        {/* Right-Side Drawer */}
        {isDrawerOpen && (
            <div className="profile-drawer" onClick={toggleDrawer}>
              <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleSettings} className="drawer-button">Settings</button>
                <button onClick={handleLogout} className="drawer-button">Logout</button>
              </div>
            </div>
        )}
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
