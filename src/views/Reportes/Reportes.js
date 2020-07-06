import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Reportes extends Component{
  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-bar-chart"></i>
                <strong>Reportes</strong>
              </CardHeader>
              <CardBody>
                <h3>Reportes</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Reportes;
