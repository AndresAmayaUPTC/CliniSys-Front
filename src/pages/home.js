import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Package, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="content">
        <div className="container-fluid px-4">
          <motion.div 
            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="h2 text-primary">Bienvenido al Sistema de Gestión Médico</h1>
          </motion.div>

          <motion.div 
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="col-md-6 col-lg-4" variants={itemVariants}>
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
            </motion.div>
            <motion.div className="col-md-6 col-lg-4" variants={itemVariants}>
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
            </motion.div>
            <motion.div className="col-md-6 col-lg-4" variants={itemVariants}>
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
            </motion.div>
            <motion.div className="col-md-6 col-lg-4" variants={itemVariants}>
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
            </motion.div>
            <motion.div className="col-md-6 col-lg-4" variants={itemVariants}>
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
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}