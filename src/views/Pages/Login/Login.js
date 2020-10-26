import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import Marketing from '../../../models/Marketing.js';

class Login extends Component {

  store = require('store');


  guardarSesion = (user) => {
    this.store.set('usuario_guardado', user);
    this.props.history.push("/inicio");
  }

  //Funcion que comprobara si existe el usuario en la DataBase
  login = () => {

    //Objeto usuario del modelo Marketing
    const modelo = new Marketing();
    const datos = modelo.getUsuario(this.state.correo);

    datos.then((usuario) => {
      if (usuario === undefined) {
        alert("No existe el usuario");
        return;
      } else if (datos === "otro") {
        alert("Algo ocurrio mal");
        return;
      }

      //Validacion de la contraseña
      if (this.state.pass !== usuario.password) {
        alert("La contraseña en incorrecta");
      } else {
        //Guardando el usuario en el Store
        this.guardarSesion(usuario);
      }
    })
  }

  //Render del componente
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8" xs={12} >
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Ingresa tu cuenta</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Correo electrónico" autoComplete="username"
                          onChange={(e) => { this.setState({ correo: e.target.value }) }}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                          onChange={(e) => { this.setState({ pass: e.target.value }) }}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button onClick={this.login} color="primary" className="px-4">Entrar</Button>
                        </Col>
                        <Col xs="12" md={12} className="text-right">
                          <Button color="link" className="px-0">¿Olvidaste tu contraseña?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

                <Card className="text-white bg-primary py-5">
                  <CardBody className="text-center">
                    <div>
                      <h2>¡Registrate!</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Registrate Ahora!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
