import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, FileText, Package, DollarSign } from 'lucide-react';
import './home.css';

export default function Home({ onLogout = () => {} }) {
  return (
    <div className="d-flex h-100">
      {/* Sidebar */}
      <nav className="sidebar" style={{width: '250px'}}>
        <div className="position-sticky pt-3">
          <h2 className="mb-4 fs-4 text-primary">CLINISYS</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                <Search size={18} className="me-2" />
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/appointments" className="nav-link">
                <Calendar size={18} className="me-2" />
                Citas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <FileText size={18} className="me-2" />
                Historias
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory" className="nav-link">
                <Package size={18} className="me-2" />
                Inventario
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/billing" className="nav-link">
                <DollarSign size={18} className="me-2" />
                Facturación
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/financialReports" className="nav-link">
                <FileText size={18} className="me-2" />
                Informes
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 overflow-auto main-content">
        <div className="content-overlay">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 text-primary">Bienvenido al Sistema de Gestión Médico</h1>
            <button className="btn btn-outline-danger" onClick={onLogout}>Cerrar sesión</button>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title text-primary">Sistema de Gestión Médico</h5>
              <h6 className="card-subtitle mb-2 text-muted">Optimice y simplifique la administración de su consultorio con nuestra solución integral.</h6>
              <p className="card-text">
                Nuestro Sistema de Gestión Médico está diseñado para optimizar y simplificar la
                administración de su consultorio. Con una interfaz intuitiva y módulos
                especializados, le ofrecemos una solución integral para todas sus
                necesidades administrativas y clínicas.
              </p>
            </div>
          </div>

          <div className="search-container mb-4">
            <input
              type="search"
              className="form-control"
              placeholder="Buscar..."
              aria-label="Buscar"
            />
            <Search className="search-icon" size={20} />
          </div>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <Calendar size={24} className="me-2" />
                    Gestión de Citas
                  </h5>
                  <p className="card-text">Administre eficientemente las citas de sus pacientes.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <FileText size={24} className="me-2" />
                    Historias Clínicas
                  </h5>
                  <p className="card-text">Acceda y gestione los registros médicos de sus pacientes.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <Package size={24} className="me-2" />
                    Inventario
                  </h5>
                  <p className="card-text">Controle su inventario de suministros médicos.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    <DollarSign size={24} className="me-2" />
                    Informes Financieros
                  </h5>
                  <p className="card-text">Genere y analice informes financieros detallados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}