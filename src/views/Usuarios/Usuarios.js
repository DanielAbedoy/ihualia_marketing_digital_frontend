import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import Modelo from '../../models/Marketing.js';
import Nuevo from './Hooks/Nuevo';
import Tabla from './Hooks/Tabla';

import { SessionContext } from '../../sessionContext';


class Usuarios extends Component {
  static contextType = SessionContext;
  state = {
    crear: false,
    usuarios:[]
  }

  componentDidMount = () => {
    const validar = async () => {
      const info = await this.context.user();
      if (info.tipo.toLowerCase() !== "administrador") this.props.history.push("/inicio")
      else this.getUsuarios();
    }
    validar();
    
  }

  getUsuarios = () => {
    new Modelo().get_usuarios_cliente(this.context.cliente)
      .then(users => this.setState({ usuarios: users }))
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader style={{ backgroundColor: "#333333" }}>
                <p className="text-white h3 p-2"><i className="fa fa-users"></i> Usuarios |</p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <p className="h4 mb-0">Usuarios de la empresa</p>
                    <p className="h6 text-muted">Todos los usuarios pertenecientes a la empresa</p>
                  </Col>
                </Row>
                <hr />

                {!this.state.crear ?
                  <>
                    <Row>
                      <Col md="9" xs="12" className="mx-auto my-2 d-flex p-0">
                        <div onClick={() => this.setState({ crear: true })} className="ml-auto btn-h bg-h-primary px-3 py-1 text-white">
                          <i className="fa fa-plus"></i> <b>Nuevo</b>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="9" xs="12" className="mx-auto my-2">
                        <Tabla usuarios={this.state.usuarios} history={this.props.history} />
                      </Col>
                    </Row>
                  </>
                  :
                  <Row>
                    <Col md="9" xs="12" className="mx-auto my-2">
                      <Nuevo cliente={this.context.cliente} close={() => { this.setState({ crear: false }); this.getUsuarios()}} />
                    </Col>
                  </Row>
                }

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Usuarios;
