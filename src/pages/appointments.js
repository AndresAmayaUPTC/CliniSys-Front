import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Form, Button, Modal, Card, Alert } from 'react-bootstrap';
import { Search, Calendar, ChevronLeft, ChevronRight, Edit2, Trash2, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const API_BASE_URL = 'https://hospital-hospital.up.railway.app';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    paciente: { id: 0 },
    fecha: '',
    motivo: '',
    estado: 'pendiente'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  useEffect(() => {
    filterAndSortAppointments();
  }, [searchTerm, dateFilter, sortOrder, appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cita`);
      if (response.data.status === 'OK') {
        setAppointments(response.data.data);
      } else {
        setErrorMessage('Error al cargar las citas');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/paciente`);
      if (response.data.status === 'OK') {
        setPatients(response.data.data);
      } else {
        setErrorMessage('Error al cargar los pacientes');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const filterAndSortAppointments = () => {
    let filtered = appointments;
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.motivo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (dateFilter) {
      filtered = filtered.filter(app => app.fecha.startsWith(dateFilter));
    }
    
    filtered.sort((a, b) => {
      const dateComparison = a.fecha.localeCompare(b.fecha);
      return sortOrder === 'asc' ? dateComparison : -dateComparison;
    });

    setFilteredAppointments(filtered);
  };

  const handleScheduleAppointment = () => {
    setShowAddModal(true);
  };

  const handleAddAppointment = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cita`, newAppointment);
      if (response.data.status === 'OK') {
        const updatedAppointment = {
          ...response.data.data,
          paciente: patients.find(p => p.id === response.data.data.paciente.id)
        };
        setAppointments([...appointments, updatedAppointment]);
        setShowAddModal(false);
        setNewAppointment({
          paciente: { id: 0 },
          fecha: '',
          motivo: '',
          estado: 'pendiente'
        });
        setSuccessMessage('Cita agregada correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Error al agregar la cita');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setShowEditModal(true);
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/cita/${id}`);
      if (response.data.status === 'OK') {
        setAppointments(appointments.filter(app => app.id !== id));
        setSuccessMessage('Cita eliminada correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Error al eliminar la cita');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handleSaveEdit = async () => {
    if (editingAppointment) {
      try {
        const response = await axios.put(`${API_BASE_URL}/cita`, editingAppointment);
        if (response.data.status === 'OK') {
          const updatedAppointment = {
            ...response.data.data,
            paciente: patients.find(p => p.id === response.data.data.paciente.id)
          };
          setAppointments(appointments.map(app => 
            app.id === updatedAppointment.id ? updatedAppointment : app
          ));
          setShowEditModal(false);
          setSuccessMessage('Cita actualizada correctamente');
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setErrorMessage('Error al actualizar la cita');
        }
      } catch (error) {
        setErrorMessage('Error al conectar con el servidor');
      }
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="content">
        <Container fluid className="py-4">
          <Card className="shadow">
            <Card.Body>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
                      placeholder="Buscar motivo"
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
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Paciente</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>
                      <td>{new Date(appointment.fecha).toLocaleString()}</td>
                      <td>{appointment.motivo}</td>
                      <td>{appointment.estado}</td>
                      <td>{`${appointment.paciente.nombre} ${appointment.paciente.apellido}`}</td>
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
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={editingAppointment?.fecha.slice(0, 16) || ''}
                    onChange={(e) => setEditingAppointment(editingAppointment ? {...editingAppointment, fecha: e.target.value} : null)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingAppointment?.motivo || ''}
                    onChange={(e) => setEditingAppointment(editingAppointment ? {...editingAppointment, motivo: e.target.value} : null)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={editingAppointment?.estado || ''}
                    onChange={(e) => setEditingAppointment(editingAppointment ? {...editingAppointment, estado: e.target.value} : null)}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Paciente</Form.Label>
                  <Form.Select
                    value={editingAppointment?.paciente.id || ''}
                    onChange={(e) => setEditingAppointment(editingAppointment ? {...editingAppointment, paciente: { id: parseInt(e.target.value) }} : null)}
                  >
                    <option value="">Seleccione un paciente</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {`${patient.id} - ${patient.nombre} ${patient.apellido}`}
                      </option>
                    ))}
                  </Form.Select>
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
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Paciente</Form.Label>
                  <Form.Select
                    value={newAppointment.paciente.id}
                    onChange={(e) => setNewAppointment({...newAppointment, paciente: { id: parseInt(e.target.value) }})}
                  >
                    <option value="">Seleccione un paciente</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {`${patient.id} - ${patient.nombre} ${patient.apellido}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={newAppointment.fecha}
                    onChange={(e) => setNewAppointment({...newAppointment, fecha: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Motivo</Form.Label>
                  <Form.Control
                    type="text"
                    value={newAppointment.motivo}
                    onChange={(e) => setNewAppointment({...newAppointment, motivo: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={newAppointment.estado}
                    onChange={(e) => setNewAppointment({...newAppointment, estado: e.target.value})}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                  </Form.Select>
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
      </main>
    </div>
  );
};

export default AppointmentsPage;