import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { Search, Package, Plus, Edit2, Trash2, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const API_BASE_URL = 'https://hospital-hospital.up.railway.app';

const Inventory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ nombre: '', descripcion: '', cantidad: 0, precioUnit: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/inventario`);
      // Acceder al campo "data" que contiene el arreglo de productos
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data); // Usar response.data.data
        setFilteredProducts(response.data.data); // Usar response.data.data
        setShowError(false);
      } else {
        setErrorMessage('Error al cargar los productos. Formato de respuesta inválido.');
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor. Por favor, intente nuevamente.');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct({ nombre: '', descripcion: '', cantidad: 0, precioUnit: 0 });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/inventario/${id}`);
      if (response.status === 200) {
        setSuccessMessage('Producto eliminado correctamente');
        setShowSuccess(true);
        fetchProducts();
      } else {
        setErrorMessage('Error al eliminar el producto');
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
      setShowError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/inventario`, currentProduct);
        setSuccessMessage('Producto actualizado correctamente');
      } else {
        await axios.post(`${API_BASE_URL}/inventario`, currentProduct);
        setSuccessMessage('Producto agregado correctamente');
      }
      setShowModal(false);
      setShowSuccess(true);
      fetchProducts();
    } catch (error) {
      setErrorMessage('Error al guardar el producto');
      setShowError(true);
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
                    <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                      {errorMessage}
                    </Alert>
                  )}

                  {showSuccess && (
                    <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                      {successMessage}
                    </Alert>
                  )}

                  <Form onSubmit={handleSearch}>
                    <Row className="align-items-end">
                      <Col md={8} className="mb-3">
                        <Form.Label>Buscar Producto</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Package size={18} />
                          </span>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre o descripción del producto"
                            value={searchTerm}
                            onChange={handleSearchChange}
                          />
                        </div>
                      </Col>

                      <Col md={2} className="mb-3 text-center">
                        <Button variant="primary" type="submit" className="w-100">
                          <Search size={18} />
                        </Button>
                      </Col>

                      <Col md={2} className="mb-3 text-center">
                        <Button variant="success" onClick={handleAddProduct} className="w-100">
                          <Plus size={18} />
                        </Button>
                      </Col>
                    </Row>
                  </Form>

                  {isLoading ? (
                    <div className="text-center mt-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                    </div>
                  ) : (
                    <Table striped bordered hover responsive className="mt-4">
                      <thead className="table-primary">
                        <tr>
                          <th>#</th>
                          <th>Nombre del Producto</th>
                          <th>Descripción</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map(product => (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.nombre}</td>
                              <td>{product.descripcion}</td>
                              <td>{product.cantidad}</td>
                              <td>${product.precioUnit.toFixed(2)}</td>
                              <td>
                                <Button variant="link" className="p-0 me-2" onClick={() => handleEditProduct(product)}>
                                  <Edit2 size={18} />
                                </Button>
                                <Button variant="link" className="p-0 text-danger" onClick={() => handleDeleteProduct(product.id)}>
                                  <Trash2 size={18} />
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">No se encontraron productos</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Custom Modal for adding/editing products */}
      {showModal && (
        <div className="modal-backdrop show"></div>
      )}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h5>
                <Button variant="link" className="close" onClick={() => setShowModal(false)}>
                  <X size={18} />
                </Button>
              </div>
              <div className="modal-body">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentProduct.nombre}
                      onChange={(e) => setCurrentProduct({...currentProduct, nombre: e.target.value})}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={currentProduct.descripcion}
                      onChange={(e) => setCurrentProduct({...currentProduct, descripcion: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      value={currentProduct.cantidad}
                      onChange={(e) => setCurrentProduct({...currentProduct, cantidad: parseInt(e.target.value)})}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Precio Unitario</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={currentProduct.precioUnit}
                      onChange={(e) => setCurrentProduct({...currentProduct, precioUnit: parseFloat(e.target.value)})}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;