import React from 'react';
import { Link } from 'react-router-dom';
import { User, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid px-4">
        <button className="btn btn-link text-dark me-3 d-lg-none" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link to="/home" className="navbar-brand">
          <span className="h4 mb-0 text-primary fw-bold">CLINISYS</span>
          <span className="small text-muted ms-2">| GESTIÓN MÉDICA</span>
        </Link>
        <div className="dropdown">
          <button className="btn btn-link text-dark dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <User size={24} className="text-primary" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
            <li><Link to="/profile" className="dropdown-item">Perfil</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item" onClick={onLogout}>Cerrar sesión</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;