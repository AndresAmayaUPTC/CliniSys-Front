import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { Search, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Inventory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supplier, setSupplier] = useState('');
  const [date, setDate] = useState('');
  const [showError, setShowError] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto A', supplier: 'Proveedor 1', date: '2024-04-01', quantity: 100 },
    { id: 2, name: 'Producto B', supplier: 'Proveedor 2', date: '2024-04-05', quantity: 50 },
    { id: 3, name: 'Producto C', supplier: 'Proveedor 1', date: '2024-04-10', quantity: 75 },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

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

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'supplier') {
      setSupplier(value);
    } else if (name === 'date') {
      setDate(value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!supplier && !date) {
      setShowError(true);
      setFilteredProducts([]);
    } else {
      setShowError(false);
      const filtered = products.filter(product => {
        const matchesSupplier = supplier ? product.supplier.toLowerCase().includes(supplier.toLowerCase()) : true;
        const matchesDate = date ? product.date === date : true;
        return matchesSupplier || matchesDate;
      });
      setFilteredProducts(filtered);
    }
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
                  <h2 className="mb-4 text-left text-primary">Inventario</h2>

                  {showError && (
                    <Alert variant="danger">
                      Por favor, ingrese al menos un criterio de búsqueda.
                    </Alert>
                  )}

                  <Form onSubmit={handleSearch}>
                    <Row className="align-items-end">
                      <Col md={5} className="mb-3">
                        <Form.Label>Buscar por Proveedor</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Package size={18} />
                          </span>
                          <Form.Control
                            type="text"
                            name="supplier"
                            placeholder="Ingrese el nombre del proveedor"
                            value={supplier}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </Col>

                      <Col md={5} className="mb-3">
                        <Form.Label>Buscar por Fecha</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Search size={18} />
                          </span>
                          <Form.Control
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </Col>

                      <Col md={2} className="mb-3 text-center">
                        <Button variant="primary" type="submit" className="w-100">
                          Buscar
                        </Button>
                      </Col>
                    </Row>
                  </Form>

                  <Table striped bordered hover responsive className="mt-4">
                    <thead className="table-primary">
                      <tr>
                        <th>#</th>
                        <th>Nombre del Producto</th>
                        <th>Proveedor</th>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.supplier}</td>
                            <td>{product.date}</td>
                            <td>{product.quantity}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No se encontraron productos.
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
      </main>
    </div>
  );
};

export default Inventory;