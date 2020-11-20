import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import Mapa from '../../../../Eventos/Crear/Hooks/Ubicacion/Mapa';

class SideInfo extends Component {

  state = {
    tipo:"",
    lugar: {},
    sitio: {},
    
  }

  componentDidMount = () => {
    
    if (this.props.evento.tipo_ubicacion === "lugar") {
      this.setState({ tipo: "lugar", lugar: this.props.evento.lugar[0] })
      
    } else if (this.props.evento.tipo_ubicacion === "online") { 
      this.setState({tipo:"sitio", lugar:this.props.evento.sitio[0]})
    }
  }

  numero_a_mes = (num_mes) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[num_mes - 1];
  }

  formato_fecha = (f) => {
    let fecha = f.split("T"); 
    let fecha_string = fecha[0];

    let dia = fecha_string.split("-")[2];
    let mes = this.numero_a_mes(fecha_string.split("-")[1] * 1);
    let anio = fecha_string.split("-")[0];

    return `${dia} de ${mes} del ${anio}`;
  }

  formato_hora = (h) => {
    let hora = h.split("T"); 
    let  hora_string = hora[1];
    let f2 = hora_string.split("-")
    let f3 = f2[0].split(":");
    return `${f3[0]}:${f3[1]} `;
  }

  render() {
    return (

      <Row>
        <Col md="12" className="pl-5 pt-2 pr-5">
          <hr />
          <p className="h5">Ubicacion</p>
          <hr />

          {this.state.tipo === 'lugar' ?
            <>
              <p className="h6"><b>Lugar:</b> {this.state.lugar.direccion2 === '-' ? "" : this.props.direccion2} </p>
              <p className="h6"><b>Direccion:</b> {this.state.lugar.direccion1}</p>
              <p className="h6"><b>Código Postal:</b> {this.state.lugar.codigo_postal}</p>
              <p className="h6"><b>Ciudad:</b> {this.state.lugar.ciudad}</p>
              <p className="h6"><b>Estado:</b> {this.state.lugar.estado}</p>
              <p className="h6"><b>Pais:</b> {this.state.lugar.pais}</p><br />
              <Row>
                <Col md="12" >
                  <Mapa
                    lat={this.state.lugar.latitud*1}
                    lng={this.state.lugar.longitud*1}
                  />
                </Col>
              </Row>
            </>
            :
            <>
              <p className="h6"><b>Lugar:</b> Evento Online</p><br />
              <p className="h6"><b>Enlace:</b>  <a href={this.state.sitio.link}>{this.state.sitio.link}</a></p>
            </>
          }
          <br/>
          <hr />
          <p className="h5">Horario</p>
          <hr />
        
          <p className="h6"><b>Fecha de Inicio:</b> </p>
          <p>{this.formato_fecha(this.props.evento.fecha_hora_inicio)}</p>
          <p className="h6"><b>Hora de Inicio:</b></p>
          <p> {this.formato_hora(this.props.evento.fecha_hora_inicio)} hrs.</p>
          <p className="h6"><b>Fecha de Finalizacion:</b> </p>
          <p>{this.formato_fecha(this.props.evento.fecha_hora_fin)}</p>
          <p className="h6"><b>Hora de Finalizacion:</b></p>
          <p> {this.formato_hora(this.props.evento.fecha_hora_fin)} hrs.</p>


        </Col>
      </Row>

    );
  }

}

export default SideInfo;