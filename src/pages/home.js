import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, FileText, Package, DollarSign, User, LogOut, Menu, X } from 'lucide-react';
import './home.css';

export default function Home({ onLogout = () => {} }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [sidebarOpen]);

  return (
    <div className="min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid px-4">
          <button className="btn btn-link text-dark me-3 d-lg-none" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Link to="/" className="navbar-brand">
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

      {/* Sidebar */}
      <div className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
      <nav className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3 d-lg-none">
          <h5 className="mb-0">Menú</h5>
          <button className="btn btn-link text-dark" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <div className="sidebar-content">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link active" onClick={() => setSidebarOpen(false)}>
                <Search size={18} className="me-2" />
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/appointments" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <Calendar size={18} className="me-2" />
                Citas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <FileText size={18} className="me-2" />
                Historias
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <Package size={18} className="me-2" />
                Inventario
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/billing" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <DollarSign size={18} className="me-2" />
                Facturación
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/financialReports" className="nav-link" onClick={() => setSidebarOpen(false)}>
                <FileText size={18} className="me-2" />
                Informes
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="content">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2 text-primary">Bienvenido al Sistema de Gestión Médico</h1>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <img src="/images/appointments.jpg" className="card-img-top" alt="Gestión de Citas" />
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <Calendar size={24} className="me-2" />
                    Gestión de Citas
                  </h5>
                  <p className="card-text">Administre eficientemente las citas de sus pacientes.</p>
                  <Link to="/appointments" className="btn btn-outline-primary">Ver citas</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <img src="/images/medical-records.jpg" className="card-img-top" alt="Historias Clínicas" />
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <FileText size={24} className="me-2" />
                    Historias Clínicas
                  </h5>
                  <p className="card-text">Acceda y gestione los registros médicos de sus pacientes.</p>
                  <Link to="/" className="btn btn-outline-primary">Ver historias</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <img src="/images/inventory.jpg" className="card-img-top" alt="Inventario" />
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <Package size={24} className="me-2" />
                    Inventario
                  </h5>
                  <p className="card-text">Controle su inventario de suministros médicos.</p>
                  <Link to="/inventory" className="btn btn-outline-primary">Ver inventario</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <img src="/images/billing.jpg" className="card-img-top" alt="Facturación" />
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <DollarSign size={24} className="me-2" />
                    Facturación
                  </h5>
                  <p className="card-text">Gestione la facturación de servicios médicos.</p>
                  <Link to="/billing" className="btn btn-outline-primary">Ver facturación</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <img src="/images/financial-reports.jpg" className="card-img-top" alt="Informes Financieros" />
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <FileText size={24} className="me-2" />
                    Informes Financieros
                  </h5>
                  <p className="card-text">Genere y analice informes financieros detallados.</p>
                  <Link to="/financialReports" className="btn btn-outline-primary">Ver informes</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}