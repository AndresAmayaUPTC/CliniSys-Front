import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { User, Lock, Mail } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    contrasena: '',
    confirmarContrasena: '',
    correo: '',
  });
  const [showError, setShowError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombreUsuario || !formData.contrasena || !formData.confirmarContrasena || !formData.correo) {
      setShowError(true);
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      setShowPasswordError(true);
    } else {
      setShowError(false);
      setShowPasswordError(false);

      try {
        // Enviar los datos al servidor, omitiendo el campo correo (no lo enviamos al backend)
        const response = await fetch('https://hospital-hospital.up.railway.app/usuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombreUsuario: formData.nombreUsuario,
            contrasena: formData.contrasena,
            // El correo no se enviará al servidor
          }),
        });

        if (response.ok) {
          setSuccessMessage(true);
          setFormData({
            nombreUsuario: '',
            contrasena: '',
            confirmarContrasena: '',
            correo: '',
          });
        } else {
          setSuccessMessage(false);
          alert('Error al registrar el usuario.');
        }
      } catch (error) {
        setSuccessMessage(false);
        console.error('Error:', error);
        alert('Hubo un problema al conectar con el servidor.');
      }
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="font-weight-bold text-primary">CLINISYS</h2>
                <p className="text-muted">Registro de Usuario</p>
              </div>

              {showError && (
                <Alert variant="danger">
                  Por favor, complete todos los campos correctamente.
                </Alert>
              )}

              {showPasswordError && (
                <Alert variant="danger">
                  Las contraseñas no coinciden. Por favor, verifícalas.
                </Alert>
              )}

              {successMessage && (
                <Alert variant="success">
                  Usuario registrado con éxito.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Mail size={18} />
                    </span>
                    <Form.Control
                      type="email"
                      name="correo"
                      placeholder="Ingrese su correo electrónico"
                      value={formData.correo}
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
                      name="nombreUsuario"
                      placeholder="Ingrese su nombre de usuario"
                      value={formData.nombreUsuario}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Lock size={18} />
                    </span>
                    <Form.Control
                      type="password"
                      name="contrasena"
                      placeholder="Ingrese su contraseña"
                      value={formData.contrasena}
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
                      name="confirmarContrasena"
                      placeholder="Confirme su contraseña"
                      value={formData.confirmarContrasena}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Registrarse
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  ¿Ya tiene una cuenta?{' '}
                  <a href="/login" className="text-primary">
                    Inicie sesión aquí
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;