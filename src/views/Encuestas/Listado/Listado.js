import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import ModelEncuesta from '../../../models/Encuestas';

import Tabla from './Hooks/Tabla';
import { SessionContext } from '../../../sessionContext';

class Listado extends Component{

  static contextType = SessionContext;

  state = {
    encuestas: []
  }

  componentDidMount = () => {
    this.findEncuestas();
  }

  findEncuestas = () => {
    const c = this.context.cuenta.id;
    new ModelEncuesta().get_encuestas_info(c)
      .then(encuestas => {
        this.setState({ encuestas: encuestas });
      })
  }

  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="text-white p-4" style={{ backgroundColor: "rgb(255,170,51)" }}>
                <p className="h3"><i className="fa fa-envelope-o"></i> Encuentas |</p>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <p className="h3 m-0"><b>Observa las esncuestas</b></p>
                    <p className="text-muted">Encuestas activas, inactivas y los borradores</p>
                  </Col>
                </Row>
                <hr />

                <Row>
                  <Col xs="12" md="9" className="mx-auto">
                    <Tabla
                      encuestas={this.state.encuestas}
                      history={this.props.history}
                      reload={() => this.findEncuestas()}
                    />
                  </Col>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Listado;