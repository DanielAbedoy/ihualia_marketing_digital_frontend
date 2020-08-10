import React, { Component } from 'react';
import { Row, Col, Input, Collapse,Badge } from 'reactstrap';

import Variables from '../../../../variables/global.js';

class FechaHora extends Component {

  state = {
    toggle_fechas: false,

    fecha_ini:'',
    fecha_fin:'',
    hora_ini:'',
    hora_fin: '',
    zona_horaria:''
  }

  validar = () => {
    
    if (this.state.fecha_ini === '' ||this.state.fecha_fin === '' ||this.state.hora_ini === '' ||this.state.hora_fin === '' || this.state.zona_horaria === '' ) {
      return false;
    }
    return true;

  }

  get_datos = () => {

    if (!this.validar()) {
      alert("Debe llenar las fechas y horas del evento");
      return undefined;
    }
    const fecha_hora_inicio = `${this.state.fecha_ini} ${this.state.hora_ini}`;
    const fecha_hora_fin = `${this.state.fecha_fin} ${this.state.hora_fin}`;

    return {
      fecha_hora_inicio: fecha_hora_inicio,
      fecha_hora_fin: fecha_hora_fin,
      zona_horaria:this.state.zona_horaria
    }

  }

  reiniciar = () => {
    this.setState({
      toggle_fechas: false,

      fecha_ini:'',
      fecha_fin:'',
      hora_ini:'',
      hora_fin: '',
      zona_horaria: ''
    }, () => {
        document.getElementById("fecha_ini").value = "";
        document.getElementById("hora_ini").value = "";
        document.getElementById("fecha_fin").value = "";
        document.getElementById("hora_fin").value = "";
        document.getElementById("cbox_zona").value = "Busca la zona horaria de la ubicacacion del evento";
    })
  }

  render() {
    return (
      <Col md="9" xs="12" className="mx-auto">
        <p className="h3 mb-4"><b> <i className="fa fa-clock-o"></i> Fecha y Hora</b>
        <i
            className={`fa fa-${this.state.toggle_fechas === false ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => this.setState({ toggle_fechas: !this.state.toggle_fechas })}
          ></i>
        </p>
        <Collapse isOpen={this.state.toggle_fechas}>
          <Row>
            <Col md="9" xs="12" className="mx-auto">
              <span className="h5">Fecha de Inicio</span><br />
              <Input
                id="fecha_ini"
                onChange={e => this.setState({ fecha_ini: e.target.value })}
                className="mt-2" type="date"/><br />

              <span className="h5">Hora de Inicio</span><br />
              <Input 
                id="hora_ini"
                onChange={e => this.setState({ hora_ini: e.target.value })}
                className="mt-2" type="time" /><br />

              <span className="h5">Fecha de Finalizacion</span><br />
              <Input 
                id="fecha_fin"
                onChange={e => this.setState({ fecha_fin: e.target.value })}
                className="mt-2" type="date" /><br />

              <span className="h5">Hora de Finalizacion</span><br />
              <Input
                id="hora_fin"
                onChange={e => this.setState({ hora_fin: e.target.value })}
                className="mt-2" type="time" /><br />

              <span className="h5">Zona Horaria</span><br />
              <Input 
                id="cbox_zona"
                onChange={e => this.setState({ zona_horaria: e.target.value })}
                className="mt-2" type="select" >
                <option  >Busca la zona horaria de la ubicacacion del evento</option>
                {new Variables().zonas_horarias().map((z, i) => {
                  return (
                    <option key={i} > {z} </option>
                  );
                })}
              </Input>
              <br />

            </Col>
          </Row>
        </Collapse>
      </Col>
    );
  }
}

export default FechaHora;