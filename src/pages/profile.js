import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from './../components/Navbar';
import Sidebar from './../components/Sidebar';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-vh-100 bg-light">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="content pt-5 mt-5">
        <Container fluid className="py-4">
          <Card className="shadow">
            <Card.Body>
              <h2 className="mb-4">Perfil de Usuario</h2>
              <Row>
                <Col md={6}>
                  <p><strong>Nombre de Usuario:</strong> {username}</p>
                  {/* Add more user information here as needed */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </main>
    </div>
  );
};

export default ProfilePage;