import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class SideBar extends Component{

  render() {
    return (
      <div className="side-bar">
        <Row>
          <Col md="12" className="text-center">
          <span className="h1">
                Este es el titulo del evento
              </span>
          </Col>
        </Row>
      </div>
    );
  }

}

export default SideBar;