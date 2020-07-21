import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Adminstrador extends Component{

  render() {
    return (
      <Redirect from="/usuarios" to="usuarios/listado" /> 
    );
  }
}

export default Adminstrador;