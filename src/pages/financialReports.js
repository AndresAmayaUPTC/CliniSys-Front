import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert, Modal, Tabs, Tab } from 'react-bootstrap';
import { Search, Calendar, ShoppingCart, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const FinancialReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showError, setShowError] = useState(false);
  const [key, setKey] = useState('purchases');
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const purchasesData = [
    { id: 1, supplier: 'Proveedor A', date: '2024-04-01', serviceType: 'Materia Prima', total: 1500 },
    { id: 2, supplier: 'Proveedor B', date: '2024-04-03', serviceType: 'Equipo', total: 2500 },
    { id: 3, supplier: 'Proveedor C', date: '2024-04-10', serviceType: 'Servicios', total: 800 },
  ];

  const salesData = [
    { id: 1, patient: 'Juan Pérez', date: '2024-04-02', serviceType: 'Consulta', total: 300 },
    { id: 2, patient: 'Ana López', date: '2024-04-05', serviceType: 'Examen', total: 500 },
    { id: 3, patient: 'Carlos Ruiz', date: '2024-04-12', serviceType: 'Radiografía', total: 800 },
    { id: 6, patient: 'Laura Rodriguez', date: '2023-01-02', serviceType: 'Consulta', total: 650},
  ];

  const [filteredPurchases, setFilteredPurchases] = useState(purchasesData);
  const [filteredSales, setFilteredSales] = useState(salesData);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setShowError(true);
      setFilteredPurchases([]);
      setFilteredSales([]);
      return;
    }

    setShowError(false);

    const filteredP = purchasesData.filter(purchase => {
      return purchase.date >= startDate && purchase.date <= endDate;
    });

    const filteredS = salesData.filter(sale => {
      return sale.date >= startDate && sale.date <= endDate;
    });

    setFilteredPurchases(filteredP);
    setFilteredSales(filteredS);

    handleShowModal();
  };

  const calculateTotal = (data) => {
    return data.reduce((acc, curr) => acc + curr.total, 0);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="content">
        <Container fluid className="py-5">
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="shadow-lg">
                <Card.Body className="p-4">
                  <h2 className="mb-4 text-left text-primary">Informes Financieros</h2>

                  <Form onSubmit={handleSearch}>
                    <Row className="align-items-end">
                      <Col md={4} className="mb-3">
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Calendar size={18} />
                          </span>
                          <Form.Control
                            type="date"
                            name="startDate"
                            value={startDate}
                            onChange={handleDateChange}
                          />
                        </div>
                      </Col>

                      <Col md={4} className="mb-3">
                        <Form.Label>Fecha de Fin</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Calendar size={18} />
                          </span>
                          <Form.Control
                            type="date"
                            name="endDate"
                            value={endDate}
                            onChange={handleDateChange}
                          />
                        </div>
                      </Col>

                      <Col md={4} className="mb-3 text-center">
                        <Button variant="primary" type="submit" className="w-100">
                          <Search size={18} className="me-2" />
                          Buscar
                        </Button>
                      </Col>
                    </Row>
                  </Form>

                  {showError && (
                    <Alert variant="danger">
                      Por favor, seleccione tanto la fecha de inicio como la fecha de fin.
                    </Alert>
                  )}

                  <Tabs
                    id="financial-reports-tabs"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="purchases" title={<><ShoppingCart size={18} className="me-2" />Compras</>}>
                      <h5>Resumen de Compras: ${calculateTotal(filteredPurchases)}</h5>

                      <Table striped bordered hover responsive className="mt-3">
                        <thead className="table-primary">
                          <tr>
                            <th>#</th>
                            <th>Proveedor</th>
                            <th>Fecha</th>
                            <th>Tipo de Servicio</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPurchases.length > 0 ? (
                            filteredPurchases.map(purchase => (
                              <tr key={purchase.id}>
                                <td>{purchase.id}</td>
                                <td>{purchase.supplier}</td>
                                <td>{purchase.date}</td>
                                <td>{purchase.serviceType}</td>
                                <td>${purchase.total}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No se encontraron compras.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Tab>

                    <Tab eventKey="sales" title={<><DollarSign size={18} className="me-2" />Ventas</>}>
                      <h5>Resumen de Ventas: ${calculateTotal(filteredSales)}</h5>

                      <Table striped bordered hover responsive className="mt-3">
                        <thead className="table-primary">
                          <tr>
                            <th>#</th>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Tipo de Servicio</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSales.length > 0 ? (
                            filteredSales.map(sale => (
                              <tr key={sale.id}>
                                <td>{sale.id}</td>
                                <td>{sale.patient}</td>
                                <td>{sale.date}</td>
                                <td>{sale.serviceType}</td>
                                <td>${sale.total}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No se encontraron ventas.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Tab>
                  </Tabs>

                  <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title>Resultados del Rango de Fechas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h5>Compras</h5>
                      <Table striped bordered hover responsive>
                        <thead className="table-primary">
                          <tr>
                            <th>#</th>
                            <th>Proveedor</th>
                            <th>Fecha</th>
                            <th>Tipo de Servicio</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPurchases.length > 0 ? (
                            filteredPurchases.map(purchase => (
                              <tr key={purchase.id}>
                                <td>{purchase.id}</td>
                                <td>{purchase.supplier}</td>
                                <td>{purchase.date}</td>
                                <td>{purchase.serviceType}</td>
                                <td>${purchase.total}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No se encontraron compras en este rango de fechas.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      <h5 className="mt-4">Ventas</h5>
                      <Table striped bordered hover responsive>
                        <thead className="table-primary">
                          <tr>
                            <th>#</th>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Tipo de Servicio</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSales.length > 0 ? (
                            filteredSales.map(sale => (
                              <tr key={sale.id}>
                                <td>{sale.id}</td>
                                <td>{sale.patient}</td>
                                <td>{sale.date}</td>
                                <td>{sale.serviceType}</td>
                                <td>${sale.total}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center">
                                No se encontraron ventas en este rango de fechas.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default FinancialReports;