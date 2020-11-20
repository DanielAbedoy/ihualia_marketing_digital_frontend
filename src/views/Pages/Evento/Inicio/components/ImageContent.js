import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

class ImageContent extends Component {

  render() {
    return (
      <Row  className="" >
        <Col md="12" className="">
          <img
            className=""
            style={{width:"100%", borderRadius:" 5px 5px 5px 5px ", filter:"blur(0px)", boxShadow:" 0px 7px 28px 1px rgba(0,0,0,0.75)"}}
            src={ this.props.src}
            alt="Imgagen-fodo"
          />
        </Col>
      </Row>

    );
  }

}

export default ImageContent;

