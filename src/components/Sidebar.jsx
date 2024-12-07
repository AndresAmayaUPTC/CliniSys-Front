import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, FileText, Package, DollarSign, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
      <nav className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3 d-lg-none">
          <h5 className="mb-0">Menú</h5>
          <button className="btn btn-link text-dark" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <div className="sidebar-content">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link active" onClick={toggleSidebar}>
                <Search size={18} className="me-2" />
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/appointments" className="nav-link" onClick={toggleSidebar}>
                <Calendar size={18} className="me-2" />
                Citas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={toggleSidebar}>
                <FileText size={18} className="me-2" />
                Historias
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory" className="nav-link" onClick={toggleSidebar}>
                <Package size={18} className="me-2" />
                Inventario
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/billing" className="nav-link" onClick={toggleSidebar}>
                <DollarSign size={18} className="me-2" />
                Facturación
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/financialReports" className="nav-link" onClick={toggleSidebar}>
                <FileText size={18} className="me-2" />
                Informes
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;