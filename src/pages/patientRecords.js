import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from './../components/Navbar';
import Sidebar from './../components/Sidebar';

const API_BASE_URL = 'https://hospital-hospital.up.railway.app';

const PatientRecordsPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [patientForm, setPatientForm] = useState({ nombre: '', apellido: '', fechaNac: '', telefono: '', email: '' });
  const [recordForm, setRecordForm] = useState({ descripcion: '', fechaCreacion: '' });
  const [records, setRecords] = useState([]);
  const [expandedRecords, setExpandedRecords] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

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

  const fetchRecords = async (patientId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/historia-clinica/paciente/${patientId}`);
      if (response.data.status === 'OK') {
        setRecords(response.data.data);
      } else {
        setErrorMessage('Error al cargar las historias clínicas');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    fetchRecords(patient.id);
    setShowRecordModal(true);
  };

  const handleAddPatient = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/paciente`, patientForm);
      if (response.data.status === 'OK') {
        setPatients([...patients, response.data.data]);
        setShowPatientModal(false);
        setPatientForm({ nombre: '', apellido: '', fechaNac: '', telefono: '', email: '' });
        setSuccessMessage('Paciente agregado correctamente');
      } else {
        setErrorMessage('Error al agregar el paciente');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handleEditPatient = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/paciente`, { ...patientForm, id: selectedPatient.id });
      if (response.data.status === 'OK') {
        setPatients(patients.map(p => p.id === selectedPatient.id ? response.data.data : p));
        setShowPatientModal(false);
        setPatientForm({ nombre: '', apellido: '', fechaNac: '', telefono: '', email: '' });
        setIsEditing(false);
        setSuccessMessage('Paciente actualizado correctamente');
      } else {
        setErrorMessage('Error al actualizar el paciente');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/paciente/${id}`);
      if (response.data.status === 'OK') {
        setPatients(patients.filter(p => p.id !== id));
        setSuccessMessage('Paciente eliminado correctamente');
      } else {
        setErrorMessage('Error al eliminar el paciente');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handleAddRecord = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/historia-clinica`, {
        ...recordForm,
        paciente: { id: selectedPatient.id }
      });
      if (response.data.status === 'OK') {
        setRecords([...records, response.data.data]);
        setShowAddRecordModal(false);
        setRecordForm({ descripcion: '', fechaCreacion: '' });
        setSuccessMessage('Historia clínica agregada correctamente');
        fetchRecords(selectedPatient.id);
      } else {
        setErrorMessage('Error al agregar la historia clínica');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handleEditRecord = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/historia-clinica`, {
        ...recordForm,
        id: recordForm.id,
        paciente: { id: selectedPatient.id }
      });
      if (response.data.status === 'OK') {
        setRecords(records.map(r => r.id === recordForm.id ? response.data.data : r));
        setShowAddRecordModal(false);
        setRecordForm({ descripcion: '', fechaCreacion: '' });
        setIsEditing(false);
        setSuccessMessage('Historia clínica actualizada correctamente');
      } else {
        setErrorMessage('Error al actualizar la historia clínica');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/historia-clinica/${id}`);
      if (response.data.status === 'OK') {
        setRecords(records.filter(r => r.id !== id));
        setSuccessMessage('Historia clínica eliminada correctamente');
      } else {
        setErrorMessage('Error al eliminar la historia clínica');
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
    }
  };

  const toggleRecordExpansion = (id) => {
    setExpandedRecords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="content pt-5 mt-5">
        <Container fluid className="py-4">
          <Card className="shadow">
            <Card.Body>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <Row className="mb-4 align-items-center">
                <Col>
                  <h2 className="mb-0 text-primary">Historias Clínicas</h2>
                </Col>
                <Col xs="auto">
                  <Button variant="primary" onClick={() => {
                    setIsEditing(false);
                    setPatientForm({ nombre: '', apellido: '', fechaNac: '', telefono: '', email: '' });
                    setShowPatientModal(true);
                  }}>
                    <Plus size={18} className="me-2" />
                    Agregar Paciente
                  </Button>
                </Col>
              </Row>
              <Table responsive hover className="align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.nombre}</td>
                      <td>{patient.apellido}</td>
                      <td>{new Date(patient.fechaNac).toLocaleDateString()}</td>
                      <td>{patient.telefono}</td>
                      <td>{patient.email}</td>
                      <td>
                        <Button variant="link" className="text-primary p-0 me-2" onClick={() => handlePatientClick(patient)}>
                          Ver Historias
                        </Button>
                        <Button variant="link" className="text-primary p-0 me-2" onClick={() => {
                          setIsEditing(true);
                          setPatientForm(patient);
                          setShowPatientModal(true);
                        }}>
                          <Edit2 size={18} />
                        </Button>
                        <Button variant="link" className="text-danger p-0" onClick={() => handleDeletePatient(patient.id)}>
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </main>

      {/* Modal para agregar/editar paciente */}
      <Modal show={showPatientModal} onHide={() => setShowPatientModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Paciente' : 'Agregar Paciente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={patientForm.nombre}
                onChange={(e) => setPatientForm({...patientForm, nombre: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={patientForm.apellido}
                onChange={(e) => setPatientForm({...patientForm, apellido: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={patientForm.fechaNac}
                onChange={(e) => setPatientForm({...patientForm, fechaNac: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                value={patientForm.telefono}
                onChange={(e) => setPatientForm({...patientForm, telefono: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={patientForm.email}
                onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPatientModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={isEditing ? handleEditPatient : handleAddPatient}>
            {isEditing ? 'Guardar Cambios' : 'Agregar Paciente'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para ver historias clínicas */}
      <Modal show={showRecordModal} onHide={() => setShowRecordModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Historias Clínicas de {selectedPatient?.nombre} {selectedPatient?.apellido}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" className="mb-3" onClick={() => {
            setIsEditing(false);
            setRecordForm({ descripcion: '', fechaCreacion: '' });
            setShowAddRecordModal(true);
          }}>
            <Plus size={18} className="me-2" />
            Agregar Historia Clínica
          </Button>
          {records.map((record) => (
            <Card key={record.id} className="mb-3">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Fecha: {new Date(record.fechaCreacion).toLocaleString()}</span>
                  <Button
                    variant="link"
                    onClick={() => toggleRecordExpansion(record.id)}
                    className="text-decoration-none"
                  >
                    {expandedRecords[record.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </Button>
                </div>
              </Card.Header>
              {expandedRecords[record.id] && (
                <Card.Body>
                  <p>{record.descripcion}</p>
                  <div className="mt-3">
                    <Button variant="link" className="text-primary p-0 me-2" onClick={() => {
                      setIsEditing(true);
                      setRecordForm(record);
                      setShowAddRecordModal(true);
                    }}>
                      <Edit2 size={18} />
                    </Button>
                    <Button variant="link" className="text-danger p-0" onClick={() => handleDeleteRecord(record.id)}>
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </Card.Body>
              )}
            </Card>
          ))}
        </Modal.Body>
      </Modal>

      {/* Modal para agregar/editar historia clínica */}
      <Modal show={showAddRecordModal} onHide={() => setShowAddRecordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Historia Clínica' : 'Agregar Historia Clínica'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={recordForm.descripcion}
                onChange={(e) => setRecordForm({...recordForm, descripcion: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Creación</Form.Label>
              <Form.Control
                type="datetime-local"
                value={recordForm.fechaCreacion}
                onChange={(e) => setRecordForm({...recordForm, fechaCreacion: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddRecordModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={isEditing ? handleEditRecord : handleAddRecord}>
            {isEditing ? 'Guardar Cambios' : 'Agregar Historia Clínica'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientRecordsPage;