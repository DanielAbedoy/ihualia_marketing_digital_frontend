import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import user_images from '../../../components/UserImages.js';
import { confirmAlert } from 'react-confirm-alert';
import '../../../assets/css/alert-confirm.css';

import Modelo from '../../../models/Marketing.js';
class Register extends Component {

  //Constructor de la clase Register
  constructor(props) {
    super(props);
    this.validar = this.validar.bind(this);
    this.store = require('store');
    this.model = new Modelo();

    //State de la clase que almacena los valores del formulario
    this.state = {
      usuario: "",
      correo: "",
      passw1: "",
      passw2: "",
      nombre: "",
      razon: "",
      direccion: "",
      telefono: "",
      dominio: "",
      giro: "",
      imagen: "",
    }
  }


  //Funcion para validar los campos del formulario
  validar = (event) => {
    event.preventDefault();

    //Validacion de todos los campos
    if (this.state.usuario === '') {
      alert("Necesita ingresar un nombre de Usuario único.");
    } else if (this.state.correo === '') {
      alert("Necesita ingresar una direccion email única.");
    } else if (this.state.nombre === '') {
      alert("Necesita ingresar su nombre.");
    } else if (this.state.razon === '') {
      alert("Necesita ingresar su RFC.");
    } else if (this.state.direccion === '') {
      alert("Necesita ingresar su direccion.");
    } else if (this.state.telefono === '') {
      alert("Necesita ingresar un número telefónico.");
    } else if (this.state.dominio === '') {
      alert("Necesita ingresar su dominio.");
    } else if (this.state.giro === '') {
      alert("Necesita ingresar el giro.");
    } else if (this.state.imagen === '') {
      alert("Necesita seleccionar una imagen.");
    } else

      //Validadcion de las contraseñas
      if (this.state.passw1 === '' && this.state.passw2 === '') {
        alert("Necesita ingresar alguna contraseña.");
      } else if (this.state.passw2 === '' && this.state.passw1 !== '') {
        alert("Necesita repetir la contraseña.");
      } else if (this.state.passw1 === '') {
        alert("Necesita ingresar alguna contraseña.");

        //Verificando que sean las mismas contraseñas
      } else if (this.state.passw1 !== this.state.passw2) {
        alert("Las contraseñas no son las mismas.");
      }
      //Todos los campos estan completos y se crea el usuario
      else {
        this.crear();
      }


  }

  //Funcion para crear los usuarios con la peticion POST con axion
  crear = async () => {

    //Objeto de los datos que se enviara con el Post
    const datos_cliente = {
      nombre: this.state.nombre,
      razon_social: this.state.razon,
      direccion: this.state.direccion,
      telefono: this.state.telefono,
      dominio: this.state.dominio,
      giro: this.state.giro,
    };

    const datos_usuario = {
      correo: this.state.correo,
      usuario: this.state.usuario,
      password: this.state.passw1,
      nombre: this.state.nombre,
      tipo: "Administrador",
      estatus: "Activo",
      imagen: this.state.imagen,
    };

    //Creando el cliente y en seguida el usuario
    //Agregar el cliente y usuario
    const resp = await new Modelo().add_new_cliente(datos_cliente, datos_usuario);

    if (resp.statusText === "Created") {
      confirmAlert({
        title: "Exito", message: "Te has registrado correctamente",
        buttons: [{ label: "Continuar", onClick: () => { this.props.history.push("/login") } }]
      })
    }
    else {
      confirmAlert({
        title: "Error", message: "Algo ha salido mal",
        buttons: [{
          label: "Continuar", onClick: () => {
            this.state({
              usuario: "",
              correo: "",
              passw1: "",
              passw2: "",
              nombre: "",
              razon: "",
              direccion: "",
              telefono: "",
              dominio: "",
              giro: "",
              imagen: "",
            })
          }
        }]
      })
    }

  }


  //Render de los componentes de la vista
  render() {
    return (
      <div className="app mt-4 align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.validar}>
                    <h1>Registro</h1>
                    <p className="text-muted">Crea tu cuenta</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nombre de usuario" autoComplete="username"
                        value={this.state.usuario}
                        onChange={(e) => { this.setState({ usuario: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Correo electrónico" autoComplete="email"
                      value={this.state.correo}
                        onChange={(e) => { this.setState({ correo: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Contraseña" autoComplete="new-password"
                        value={this.state.passw1}
                        onChange={(e) => { this.setState({ passw1: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repite tu contraseña" autoComplete="new-password"
                      value={this.state.passw2}
                        onChange={(e) => { this.setState({ passw2: e.target.value }); }}
                      />
                    </InputGroup>
                    <hr />

                    <p className="text-muted">Información que se necesita saber</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-id-card-o"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Nombre personal" autoComplete="nombre"
                        value={this.state.nombre}
                        onChange={(e) => { this.setState({ nombre: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-building-o"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Razon Social" autoComplete="razonSocial"
                        value={this.state.razon}
                        onChange={(e) => { this.setState({ razon: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-map-marker"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Dirección" autoComplete="direccion"
                      value={this.state.direccion}
                        onChange={(e) => { this.setState({ direccion: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-mobile"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Telefono" autoComplete="telefono"
                        value={this.state.telefono}
                        onChange={(e) => { this.setState({ telefono: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-globe"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Dominio" autoComplete="dominio"
                        onChange={(e) => { this.setState({ dominio: e.target.value }); }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-institution"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Giro" autoComplete="giro"
                      value={this.state.giro}
                        onChange={(e) => { this.setState({ giro: e.target.value }); }}
                      />
                    </InputGroup>

                    <hr />
                    <p className="text-muted">Imagen de usuario</p>
                    <Row>
                      {user_images.map((imagen, indx) => {
                        return (
                          <Col key={indx} lg="3" md="3" sm="4" xs="4" >
                            <img id={imagen.nombre} alt={imagen.nombre} title={imagen.nombre} src={imagen.direccion}
                              className="m-1"
                              style={{ 'cursor': "pointer", 'borderStyle': "solid", 'borderColor': "black" }}
                              onClick={(e) => {
                                if (this.state.imagen !== "") {
                                  const elem = document.getElementById(this.state.imagen);
                                  elem.style.borderColor = "black";
                                }
                                const elem = document.getElementById(e.target.id);
                                elem.style.borderColor = "green";
                                this.setState({ imagen: imagen.nombre })
                              }}
                            />
                          </Col>
                        );
                      })}
                    </Row>

                    <hr />
                    <Button type="submit" color="success" block>Crear</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><i className="fa fa-facebook-official"></i> <span> facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><i className="fa fa-twitter"></i><span> twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
