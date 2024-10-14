import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { Search, User, Calendar, FileText } from 'lucide-react';

const Billing = () => {
  const [patient, setPatient] = useState('');
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [showError, setShowError] = useState(false);

  const [sales, setSales] = useState([
    { id: 1, patient: 'Juan Pérez', date: '2024-10-01', service: 'Consulta', total: 300 },
    { id: 2, patient: 'Ana López', date: '2024-10-05', service: 'Examen', total: 500 },
    { id: 3, patient: 'Carlos Ruiz', date: '2024-10-10', service: 'Radiografía', total: 800 },
  ]);

  const [filteredSales, setFilteredSales] = useState(sales);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'patient') setPatient(value);
    if (name === 'id') setId(value);
    if (name === 'date') setDate(value);
    if (name === 'serviceType') setServiceType(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!patient && !id && !date && !serviceType) {
      setShowError(true);
      setFilteredSales([]);
    } else {
      setShowError(false);
      const filtered = sales.filter(sale => {
        const matchesPatient = patient ? sale.patient.toLowerCase().includes(patient.toLowerCase()) : true;
        const matchesId = id ? sale.id.toString() === id : true;
        const matchesDate = date ? sale.date === date : true;
        const matchesServiceType = serviceType ? sale.service.toLowerCase().includes(serviceType.toLowerCase()) : true;
        return matchesPatient && matchesId && matchesDate && matchesServiceType;
      });
      setFilteredSales(filtered);
    }
  };

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg">
            <Card.Body className="p-4">
              <h2 className="mb-4 text-left text-primary">Facturación</h2>

              {showError && (
                <Alert variant="danger">
                  Por favor, ingrese al menos un criterio de búsqueda.
                </Alert>
              )}

              <Form onSubmit={handleSearch}>
                <Row className="align-items-end">
                  <Col md={3} className="mb-3">
                    <Form.Label>Buscar por Paciente</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={18} />
                      </span>
                      <Form.Control
                        type="text"
                        name="patient"
                        placeholder="Ingrese el nombre del paciente"
                        value={patient}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </Col>

                  <Col md={3} className="mb-3">
                    <Form.Label>Buscar por ID</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FileText size={18} />
                      </span>
                      <Form.Control
                        type="text"
                        name="id"
                        placeholder="Ingrese el ID"
                        value={id}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </Col>

                  <Col md={3} className="mb-3">
                    <Form.Label>Buscar por Fecha</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Calendar size={18} />
                      </span>
                      <Form.Control
                        type="date"
                        name="date"
                        value={date}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </Col>

                  <Col md={3} className="mb-3">
                    <Form.Label>Tipo de Servicio</Form.Label>
                    <Form.Control
                      type="text"
                      name="serviceType"
                      placeholder="Ingrese el tipo de servicio"
                      value={serviceType}
                      onChange={handleSearchChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="text-center">
                    <Button variant="primary" type="submit" className="w-50">
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form>

              <Table striped bordered hover responsive className="mt-4">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Servicio</th>
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
                        <td>{sale.service}</td>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Billing;