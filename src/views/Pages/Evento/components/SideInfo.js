import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import Mapa from '../../../Eventos/Crear/Ubicacion/Mapa';

class SideInfo extends Component {

  numero_a_mes = (num_mes) => {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[num_mes - 1];
  }

  formato_fecha = (fecha_string) => {
    let dia = fecha_string.split("-")[2];
    let mes = this.numero_a_mes(fecha_string.split("-")[1] * 1);
    let anio = fecha_string.split("-")[0];

    return `${dia} de ${mes} del ${anio}`;
  }

  render() {
    return (

      <Row>
        <Col md="12" className="pl-5 pt-2 pr-5">
          <hr />
          <p className="h5">Ubicacion</p>
          <hr />

          {this.props.tipo_ubicacion === 'lugar' ?
            <>
              <p className="h6"><b>Lugar:</b> {this.props.direccion2 === '-' ? "" : this.props.direccion2} </p>
              <p className="h6"><b>Direccion:</b> {this.props.direccion1}</p>
              <p className="h6"><b>Código Postal:</b> {this.props.codigo_postal}</p>
              <p className="h6"><b>Ciudad:</b> {this.props.ciudad}</p>
              <p className="h6"><b>Estado:</b> {this.props.estado}</p>
              <p className="h6"><b>Pais:</b> {this.props.pais}</p><br />
              <Row>
                <Col md="12" >
                  <Mapa
                    lat={this.props.latitud}
                    lng={this.props.longitud}
                  />
                </Col>
              </Row>
            </>
            :
            <>
              <p className="h6"><b>Lugar:</b> Evento Online</p><br />
              <p className="h6"><b>Enlace:</b>  <a href={this.props.link}>{this.props.link}</a></p>
            </>
          }
          <br/>
          <hr />
          <p className="h5">Horario</p>
          <hr />
        
          <p className="h6"><b>Fecha de Inicio:</b> </p>
          <p>{this.formato_fecha(this.props.fecha_inicio)}</p>
          <p className="h6"><b>Hora de Inicio:</b></p>
          <p> {this.props.hora_inicio} hrs.</p>
          <p className="h6"><b>Fecha de Finalizacion:</b> </p>
          <p>{this.formato_fecha(this.props.fecha_fin)}</p>
          <p className="h6"><b>Hora de Finalizacion:</b></p>
          <p> {this.props.hora_fin} hrs.</p>


        </Col>
      </Row>

    );
  }

}

export default SideInfo;