import React, { useEffect, useState } from "react";
import axios from "axios";
// import'../styles/usuarios.css'
import { Modal, Button, Form } from 'react-bootstrap';
import styles from '../styles/Usuariodash.css'
import nav from '../components/Dashnav'
import Dashnav from "../components/Dashnav";
// Importación de Imagen
// import bienes from '../img/bienes.png'
// import pedidos from '../img/pedidos.png'
// import { async } from "rxjs";
// import desconcido from '../img/red.png'

function Usuarios() {

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    fecthUsers()
  }, []);
  const [showActualizarModal, setShowActualizarModal] = useState(false);
  const [showAgregarModal, setShowAgregarModal] = useState(false);
  const [usuarioS, setusuarioS] = useState(null);
  const [usuarioActualizar, setUsuarioActualizar] = useState({
    nombre:'',
    apellido:'',
    username: "",
    password: ""
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre:'',
    apellido:'',
    username: "",
    password: ""
  });

  const fecthUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users')
      setUsers(response.data)
      console.log('Datos de la api')
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const HandeDelte = async (id) => {
    const response = await axios.delete(`http://localhost:3001/users/${id}`);
    if (response.status === 200) {
      alert("Se borro correctamente el usuario")
    } else {
      alert("Sucedio un error")
    }
    fecthUsers()
  }

  const handleActualizarModalOpen = (usuario) => {
    setUsuarioActualizar(usuario);
    setShowActualizarModal(true);
  };

  const handleActualizarModalClose = () => {
    setShowActualizarModal(false);
    setUsuarioActualizar({
      username: "",
      password: "",
      createdAt: ""
    });
  };

  const handleActualizarClick = async () => {
    try {
      const response = await axios.patch(`http://localhost:3001/users/${usuarioActualizar.id}`, {
      nombre: usuarioActualizar.nombre,
      apellido: usuarioActualizar.apellido,
      username: usuarioActualizar.username,
      password: usuarioActualizar.password
      });

      console.log('Response:', response);

      if (response.status === 200) {
        const updatedUsersResponse = await axios.get("http://localhost:3001/users/");
        setUsers(updatedUsersResponse.data);
        handleActualizarModalClose();
      } else {
        console.log('Error al actualizar el usuario', response.data);
      }
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };


  const handleAgregarModalOpen = () => {
    setShowAgregarModal(true);
  };

  const handleAgregarModalClose = () => {
    setShowAgregarModal(false);
    setNuevoUsuario({

      nombre:"",
      apellido:"", 
      username: "",
      password: ""
    });
  };
  //  Esta raro a la segunda lo agrega primero lo actualiza y despues elo agrega ya lo vi ta cagado ya funiona 

  const handleAgregarClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users/", nuevoUsuario); // los 3001 es la conexion a nest

      if (response.status === 201) {
        const updatedUsersResponse = await axios.get("http://localhost:3001/users/");
        setUsers(updatedUsersResponse.data);
        handleAgregarModalClose();
      } else {
        console.log('Error al agregar el usuario', response.data);
      }
    } catch (error) {
      console.error('Error al agregar el usuario', error);
    }
  };

  return (
    
    <>
    <Dashnav />



   {/* Titutlos */}
   <div className="general">
    <h1 class="usuarios">Usuarios</h1>


    {/* Boton de Regresar al menú */}
    <Button className="Agregar" onClick={handleAgregarModalOpen}>
          Agregar Usuario
          </Button>
    <button class="Regresar" onClick={() => window.history.back()}>Regresar</button>

    {/* Cuerpo de toda la tabla */}
      <div class="cuerpo">

        <div class="">
          <div class="">

            <div class="">
              <div class="container">
                <div class="">
                  <table class="tabla">
                    <thead class="cabezera">
                      <tr>
                      {/* NO LOS ESTABA MAPEANDO WEEY JAJAJAJJA,  eso no es mapear*/}
                        <th scope="" class="">
                          Nombre
                        </th>
                        <th scope="" class="">
                          Apellidos
                        </th>
                        <th scope="" class="">
                          Nombre de usuario
                        </th>
                        <th scope="" class="">
                          Contraseña
                        </th>
                        <th scope="" class="">
                          Funciones
                        </th> 
                      </tr>
                    </thead>
                    {/**ya a mimir, eres la mamada weey jajajajajaja, la neta ya quedo, me debes una con el dash xd, me mame, tu mamamda xd */}
                    {/* Adios xd a mimimr */}



                  {/* Funciones donde se agregan los usuarios */}

                    <tbody className="Cuerpo2">
                      {Users.map((users) => (
                        <tr class="">
                          <td class="px-6 py-4">
                            {users.nombre}
                          </td>
                          <td class="px-6 py-4">
                            {users.apellido}
                          </td>
                          <td class="px-6 py-4">
                            {users.username}
                          </td>
                          <td class="px-6 py-4">
                            {users.password}
                          </td>
                          <td class="botones">
                          <a class="link" onClick={() => handleActualizarModalOpen(users)}>Editar</a>
                            <a className="link" onClick={() => HandeDelte(users.id)}>Eliminar</a>
                          </td>
                        </tr>
                      ))}

                    </tbody>

                  </table>
                        {/* Modal de eliminar */}


                        {/* Titulo del modal de actualizar */}
                  <Modal show={showActualizarModal} onHide={handleActualizarModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Actualizar Usuario</Modal.Title>
                    </Modal.Header>
                    {/* modal de actualizar*/}
                    <Modal.Body>
                      <form>
                        <div className="mb-3">
                          <label htmlFor="nombre" className="form-label">
                            Nombre de usuario:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={usuarioActualizar.nombre}
                            onChange={(e) => setUsuarioActualizar({ ...usuarioActualizar, nombre: e.target.value })}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="apellido" className="form-label">
                            Apellido del usuario:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={usuarioActualizar.apellido}
                            onChange={(e) => setUsuarioActualizar({ ...usuarioActualizar, apellido: e.target.value })}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Sobrenombre del usuario:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={usuarioActualizar.username}
                            onChange={(e) => setUsuarioActualizar({ ...usuarioActualizar, username: e.target.value })}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Contraseña:
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={usuarioActualizar.password}
                            onChange={(e) => setUsuarioActualizar({ ...usuarioActualizar, password: e.target.value })}
                          />
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleActualizarModalClose}>
                        Cancelar
                      </Button>
                      <Button variant="primary" onClick={handleActualizarClick}>
                        Actualizar
                      </Button>
                    </Modal.Footer>
                  </Modal>

                          {/* Modal de agregar usuario */}
                  <Modal show={showAgregarModal} onHide={handleAgregarModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Agregar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                      <Form.Group className="mb-3" controlId="formNombre">
                          <Form.Label>Nombre de usuario</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de usuario"
                            value={nuevoUsuario.nombre}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formApellido">
                          <Form.Label>Apellido del usuario</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido del usuario"
                            value={nuevoUsuario.apellido}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                          <Form.Label>Sobrenombre del usuario</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Ingrese el sobrenombre del usuario"
                            value={nuevoUsuario.username}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                          <Form.Label>Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Ingrese la contraseña"
                            value={nuevoUsuario.password}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleAgregarModalClose}>
                        Cancelar
                      </Button>
                      <Button variant="primary" onClick={handleAgregarClick}>
                        Agregar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>

              </div>
            </div>


          </div>
        </div>


      </div>

      </div>
    </>
  );
}

export default Usuarios;
