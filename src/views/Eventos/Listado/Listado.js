import React, { Component, useEffect } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Input, Button, Badge, Collapse } from 'reactstrap';

import modelo from '../../../models/Eventos';

import NavBar from '../components/NavBar.js';

class Listado extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <NavBar />
              </CardHeader>
              <CardBody>

                Listado
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Listado;