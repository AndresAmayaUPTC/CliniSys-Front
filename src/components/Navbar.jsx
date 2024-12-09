import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="dropdown" ref={dropdownRef}>
          <button 
            className="btn btn-link text-dark dropdown-toggle" 
            type="button" 
            id="profileDropdown" 
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <User size={24} className="text-primary" />
          </button>
          <ul 
            className={`dropdown-menu dropdown-menu-end${isDropdownOpen ? ' show' : ''}`} 
            aria-labelledby="profileDropdown"
          >
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