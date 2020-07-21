import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Cuentas extends Component {

  state = {
    vista_option:'',
  }

  render() {
    return (
      <Redirect from="/cuentas" to="/cuentas/listado" />
    );
  }
}
export default Cuentas;
