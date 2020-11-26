import React, { Component } from 'react';

import { Switch, Redirect, Route } from 'react-router-dom'
import Load from '../../../components/Load';

const Inicio = React.lazy(()=> import('./Inicio/Inicio'))
const Registro = React.lazy(()=> import('./Registro/Registro'))


const loading = () => <Load />

class Evento extends Component {
  
  render() {
    return (
      <React.Suspense fallback={loading()}>
        <Switch>
          <Route path="/evento/:id" exact name="Evento" render={props => <Inicio {...props} />} ></Route>
          <Route path="/evento/registro/:id" name="Registro" render={props => <Registro {...props} />} ></Route>
          <Redirect to="/404"/>
      </Switch>
      </React.Suspense>
    );
  }
}

export default Evento;