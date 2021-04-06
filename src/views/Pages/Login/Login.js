import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import '../../../assets/css/alert-confirm.css';

import Auth from '../../../auth';

class Login extends Component {


  state = {
    correo: "",
    password: "",
  }

  //Funcion que comprobara si existe el usuario en la DataBase
  validar = () => {
    if (this.state.correo === "" || this.state.password === "") return false;
    return true;
  }

  login = async (e) => {
    e.preventDefault();
    if (!this.validar()) return;

    const resp = await new Auth().login(this.state.correo, this.state.password);
    if (resp.error === true) {
      confirmAlert({ title: "Error", message: resp.message, buttons: [{ label: "Continuar", onClick: () => { } }] })
      return;
    }
    this.props.history.push("/inicio");
  }

  //Render del componente
  render() {
    return (
      <div className="app bg-white">
        <Row className="mx-0 p-0 " style={{height:"100vh"}}>
          <Col md="8" xs={12} className="my-auto mx-auto" >
            <CardGroup className="rounded" style={{boxShadow:"0px 1px 23px 2px rgba(66,153,212,1)"}}>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={this.login}>
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
                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button type="submit" color="primary" className="px-4">Entrar</Button>
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
                    <img src={require('../../../assets/img/brand/icono-no-fondo.png')} className="mx-auto" width="30%" alt="ihualia" />
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
      </div>
    );
  }
}

export default Login;