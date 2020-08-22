import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import logo  from '../../../../assets/img/brand/logo_ihualia.png'
class ImageContent extends Component {

  render() {
    return (

      <Row  >
        <Col md="12" className="p-0">
          <img
            style={{width:"100%", borderRadius:" 10px 0 0 0"}}
            src={ this.props.src}
            alt="Imgagen-fodo"
          />
            
        </Col>
      </Row>

    );
  }

}

export default ImageContent;

