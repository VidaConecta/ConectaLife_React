import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">

        {/* Logo */}
        <Link to="/" className="navbar__brand">
          <span className="navbar__pulse">♥</span>
          ConectaLife
        </Link>

        {/* Links */}
        <ul className="navbar__links">
          <li>
            <Link to="/" className="navbar__link">
              Home
            </Link>
          </li>

          <li>
            <Link to="/sobre" className="navbar__link">
              Sobre
            </Link>
          </li>

          <li>
            <Link to="/apolice" className="navbar__link">
              Apólice
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;