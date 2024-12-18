import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { User, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setShowError(true);
      return;
    }
    
    setShowError(false);
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('https://hospital-hospital.up.railway.app/usuario/auth', {
        nombreUsuario: username,
        contrasena: password
      });

      if (response.data.status === 'OK' && response.data.data === true) {
        console.log('Inicio de sesión exitoso');
        // Save session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        // Redirect to home page
        navigate('/home');
      } else {
        setErrorMessage('Credenciales inválidas. Por favor, intente de nuevo.');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage('Error al conectar con el servidor. Por favor, intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="font-weight-bold text-primary">CLINISYS</h2>
                <p className="text-muted">Sistema de Gestión Médico</p>
              </div>
              
              {(showError || errorMessage) && (
                <Alert variant="danger">
                  {showError ? 'Por favor, ingrese su nombre de usuario y contraseña.' : errorMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <User size={18} />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                      placeholder="Ingrese su contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Recordarme" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <a href="#" className="text-muted d-block mb-2">¿Olvidó su contraseña?</a>
                <p className="mb-0">¿No tiene una cuenta? <a href="/register" className="text-primary">Regístrese aquí</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;