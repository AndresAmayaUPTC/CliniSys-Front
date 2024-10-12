import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { User, Mail, Lock, CreditCard } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userType: '',
    email: '',
    username: '',
    documentType: '',
    documentNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some(field => field === '')) {
      setShowError(true);
    } else if (formData.password !== formData.confirmPassword) {
      setShowError(true);
      alert('Las contraseñas no coinciden');
    } else {
      setShowError(false);
      console.log('Datos de registro:', formData);
      // Aquí va la lógica para enviar los datos al servidor
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <img src="/api/placeholder/150/50" alt="Clinisys Logo" className="mb-3" />
                <h2 className="font-weight-bold text-primary">CLINISYS</h2>
                <p className="text-muted">Registro de Usuario</p>
              </div>
              
              {showError && (
                <Alert variant="danger">
                  Por favor, complete todos los campos correctamente.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Usuario</Form.Label>
                  <Form.Select name="userType" value={formData.userType} onChange={handleChange}>
                    <option value="">Seleccione un tipo</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Paciente</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Mail size={18} />
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Ingrese su correo electrónico"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <User size={18} />
                    </span>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Ingrese su nombre de usuario"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Tipo de Documento</Form.Label>
                      <Form.Select name="documentType" value={formData.documentType} onChange={handleChange}>
                        <option value="">Seleccione</option>
                        <option value="CC">C.C</option>
                        <option value="TI">T.I</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Número de Documento</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <CreditCard size={18} />
                        </span>
                        <Form.Control
                          type="text"
                          name="documentNumber"
                          placeholder="Número"
                          value={formData.documentNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Lock size={18} />
                    </span>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Ingrese su contraseña"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Lock size={18} />
                    </span>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirme su contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Registrarse
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="mb-0">¿Ya tiene una cuenta? <a href="/login" className="text-primary">Inicie sesión aquí</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;