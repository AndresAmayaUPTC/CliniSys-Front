import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white">
        <div className="container-fluid px-4">
          <button className="navbar-toggler border-0" type="button">
            <Menu size={24} />
          </button>
          <Link to="/" className="navbar-brand mx-auto">
            <span className="h4 mb-0 text-primary fw-bold">CLINISYS</span>
            <span className="small text-muted ms-2">| GESTIÓN MÉDICA</span>
          </Link>
         
          <Link to="/login" className="btn btn-primary ms-4 d-none d-lg-block">
            Iniciar Sesión
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-fluid px-0">
        <div className="row g-0 min-vh-100 align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 p-5 p-lg-6 position-relative" style={{ zIndex: 1 }}>
            <div className="mx-auto" style={{ maxWidth: '600px' }}>
              <h1 className="display-1 fw-bold mb-4" style={{ fontSize: 'calc(3rem + 2.5vw)' }}>
                
                <br />
                Clinisys
              </h1>
              <p className="lead mb-4 text-muted" style={{ fontSize: '1.25rem' }}>
                Sistema integral de gestión médica diseñado para optimizar y simplificar 
                la administración de su consultorio, permitiéndole enfocarse en lo que 
                realmente importa: sus pacientes.
              </p>
              <Link 
                to="/register" 
                className="btn btn-primary btn-lg px-5 py-3 rounded-pill d-inline-flex align-items-center gap-2"
              >
                Comenzar ahora
                <ArrowRight size={20} />
              </Link>
              <div className="mt-5 d-flex gap-4">
                <div>
                  <h3 className="h2 text-primary mb-0">Administre</h3>
                  <p className="text-muted">su consultorio</p>
                </div>
                <div>
                  <h3 className="h2 text-primary mb-0">Mejore</h3>
                  <p className="text-muted">su eficiencia</p>
                </div>
                <div>
                  <h3 className="h2 text-primary mb-0">Ahorre</h3>
                  <p className="text-muted">tiempo y dinero</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image & Curve */}
          <div className="col-lg-6 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 w-100 h-100">
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary" 
                   style={{ 
                     opacity: '0.1',
                     clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
                   }}>
              </div>
            </div>
            <div className="position-relative h-100 d-flex align-items-center justify-content-center p-5">
              <img
                src="/images/Medical Office.jpg"
                alt="Consultorio médico moderno"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: '70vh', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Features */}
      <div className="container position-relative" style={{ marginTop: '-100px', zIndex: 2 }}>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h4 className="text-primary mb-3">Gestión Eficiente</h4>
                <p className="text-muted mb-0">Optimice sus procesos administrativos y clínicos con nuestra solución integral.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h4 className="text-primary mb-3">Acceso 24/7</h4>
                <p className="text-muted mb-0">Acceda a su información desde cualquier lugar y en cualquier momento.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h4 className="text-primary mb-3">Soporte Completo</h4>
                <p className="text-muted mb-0">Asistencia técnica especializada para resolver sus dudas cuando las necesite.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}