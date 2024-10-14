import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button, Modal, Card, Alert } from 'react-bootstrap';
import { Search, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, Plus } from 'lucide-react';


const initialAppointments = [
  { id: 2335, date: '2024-03-15', time: '13:45', patient: 'Juan Carlos Victoria' },
  { id: 2332, date: '2024-03-27', time: '16:30', patient: 'Carlos Oliveros' },
  { id: 2331, date: '2024-04-03', time: '14:45', patient: 'Juan Carlos Victoria' },
  { id: 2330, date: '2024-04-05', time: '13:00', patient: 'David Perez Guzman' },
  { id: 2329, date: '2024-04-15', time: '17:45', patient: 'David Perez Guzman' },
  { id: 2327, date: '2024-04-26', time: '20:15', patient: 'Jorge Rojas' },
  { id: 2318, date: '2024-05-13', time: '18:00', patient: 'Juan Perez' },
  { id: 1952, date: '2024-05-16', time: '15:00', patient: 'Francisco Gonzalez' },
];

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    patient: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    filterAndSortAppointments();
  }, [searchTerm, dateFilter, sortOrder, appointments]);

  const filterAndSortAppointments = () => {
    let filtered = appointments;
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.patient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (dateFilter) {
      filtered = filtered.filter(app => app.date === dateFilter);
    }
    
    // Sorting
    filtered.sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return sortOrder === 'asc' ? dateComparison : -dateComparison;
      return sortOrder === 'asc' ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time);
    });

    setFilteredAppointments(filtered);
  };

  const handleScheduleAppointment = () => {
    setShowAddModal(true);
  };

  const isAppointmentValid = (date, time) => {
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointments.every(app => {
      const existingDateTime = new Date(`${app.date}T${app.time}`);
      const timeDiff = Math.abs(appointmentDateTime - existingDateTime) / 60000; 
      return timeDiff >= 20;
    });
  };

  const handleAddAppointment = () => {
    if (!isAppointmentValid(newAppointment.date, newAppointment.time)) {
      setErrorMessage('La cita debe tener al menos 20 minutos de diferencia con otras citas.');
      return;
    }

    const id = Math.max(...appointments.map(a => a.id)) + 1;
    setAppointments([...appointments, { ...newAppointment, id }]);
    setShowAddModal(false);
    setNewAppointment({
      date: '',
      time: '',
      patient: '',
    });
    setErrorMessage('');
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setShowEditModal(true);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  const handleSaveEdit = () => {
    if (!isAppointmentValid(editingAppointment.date, editingAppointment.time)) {
      setErrorMessage('La cita debe tener al menos 20 minutos de diferencia con otras citas.');
      return;
    }

    setAppointments(appointments.map(app => 
      app.id === editingAppointment.id ? editingAppointment : app
    ));
    setShowEditModal(false);
    setErrorMessage('');
  };

  return (
    <Container fluid className="py-4">
      <Card className="shadow">
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col>
              <h2 className="mb-0 text-primary">Citas médicas</h2>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleScheduleAppointment}>
                <Plus size={18} className="me-2" />
                Agendar cita
              </Button>
            </Col>
          </Row>
          <Row className="mb-4 g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Control
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border-0 shadow-sm"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-0 shadow-sm"
              >
                <option value="asc">Orden ascendente</option>
                <option value="desc">Orden descendente</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <div className="input-group">
                <span className="input-group-text border-0 bg-white">
                  <Search size={18} />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Buscar paciente"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 shadow-sm"
                />
              </div>
            </Col>
          </Row>
          <Table responsive hover className="align-middle">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Paciente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.patient}</td>
                  <td>
                    <Button variant="link" className="text-primary p-0 me-2" onClick={() => handleEditAppointment(appointment)}>
                      <Edit2 size={18} />
                    </Button>
                    <Button variant="link" className="text-danger p-0" onClick={() => handleDeleteAppointment(appointment.id)}>
                      <Trash2 size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className="justify-content-between mt-3">
            <Col xs="auto">
              <p className="text-muted mb-0">Mostrando 1 a {filteredAppointments.length} de {appointments.length} registros</p>
            </Col>
            <Col xs="auto">
              <Button variant="outline-secondary" size="sm" className="me-2">
                <ChevronLeft size={18} />
              </Button>
              <Button variant="primary" size="sm" className="me-2">1</Button>
              <Button variant="outline-secondary" size="sm">
                <ChevronRight size={18} />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal para editar cita */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={editingAppointment?.date || ''}
                onChange={(e) => setEditingAppointment({...editingAppointment, date: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={editingAppointment?.time || ''}
                onChange={(e) => setEditingAppointment({...editingAppointment, time: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Paciente</Form.Label>
              <Form.Control
                type="text"
                value={editingAppointment?.patient || ''}
                onChange={(e) => setEditingAppointment({...editingAppointment, patient: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para agregar cita */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agendar Nueva Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Paciente</Form.Label>
              <Form.Control
                type="text"
                value={newAppointment.patient}
                onChange={(e) => setNewAppointment({...newAppointment, patient: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddAppointment}>
            Agendar Cita
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppointmentsPage;