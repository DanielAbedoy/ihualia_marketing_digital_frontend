import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import MisCuentas from './MisCuentas/MisCuentas.js';
class Cuentas extends Component {
 

  render() {
    return (
      <><MisCuentas
        history={this.props.history}
      /></>
    );
  }

}
export default Cuentas;
