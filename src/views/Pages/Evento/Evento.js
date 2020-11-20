import React, { Component } from 'react';

import { Switch, Redirect, Route } from 'react-router-dom'
import Load from '../../../components/Load';

const Inicio = React.lazy(()=> import('./Inicio/Inicio'))
const Registro = React.lazy(()=> import('./Registro/Registro'))


const loading = () => <Load />

class Evento extends Component {

  /* get_boletos = (id_evento) => {
    new EventoModel().get_boletos_evento(id_evento)
      .then(boletos => {
        
        boletos.forEach(boleto => this.get_cantidades_boletos(boleto));
        
      })
  }

  get_cantidades_boletos = boleto => {
    
    new EventoModel().get_boleto(boleto.id)
      .then(datos => {
        const cantidad_total = parseInt(datos.cantida_total);
        const cantidad_maxima = parseInt(datos.cantidad_maxima);
        new EventoModel().get_cantidad_boletos_vendidos(boleto.id)
          .then(boletos => {
            let cantidad = 0;
            boletos.forEach(b => {
              cantidad += parseInt(b.cantidad, 10);
            });
          
            //Algoritmo para saber la cantidad a mostrar
            const cantidad_gnrl = cantidad_total - cantidad;
            let cantidad_a_mostrar = 0;
            if (cantidad_gnrl < cantidad_maxima) cantidad_a_mostrar = cantidad_gnrl;
            else cantidad_a_mostrar = cantidad_maxima;

            boleto.cantidad_a_mostrar = cantidad_a_mostrar;
            let arr = this.state.boletos.slice();
            arr.push(boleto);
            this.setState({ boletos: arr });
          })

      })

  } */
  
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