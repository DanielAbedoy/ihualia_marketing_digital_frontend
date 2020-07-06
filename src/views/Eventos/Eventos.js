import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Eventos extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="cui-calendar"></i>
                <strong>Eventos</strong>
              </CardHeader>
              <CardBody>
                <h3>Eventos</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Eventos;
