import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap';

//CardStandar
import Load from '../../components/Load.js';


//Routes Views

class Inicio extends Component {

  loading = () => <Load />

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Card className="text-white bg-secondary">
              <CardHeader>
                <h3 className="title">Inicio</h3>
                <p className="category">Comienze a trabajar!</p>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Inicio;
