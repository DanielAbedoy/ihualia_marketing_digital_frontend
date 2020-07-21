import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import user_images from '../../../../components/UserImages.js';

class Formulario extends Component {

  state = {
    nombre: '',
    usuario: '',
    correo: '',
    passw1: '',
    passw2: '',
    imagen:''
  }

  get_datos = () => this.state;

  render() {
    return (
      <Form onSubmit={this.validar}>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="fa fa-id-card-o"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Nombre personal" autoComplete="nombre"
            onChange={(e) => { this.setState({ nombre: e.target.value }); }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Nombre de usuario" autoComplete="username"
            onChange={(e) => { this.setState({ usuario: e.target.value }); }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>@</InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Correo electrónico" autoComplete="email"
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
            onChange={(e) => { this.setState({ passw1: e.target.value }); }}
          />
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" placeholder="Repite la contraseña" autoComplete="new-password"
            onChange={(e) => { this.setState({ passw2: e.target.value }); }}
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
      </Form>
    );
  }
}

export default Formulario;

