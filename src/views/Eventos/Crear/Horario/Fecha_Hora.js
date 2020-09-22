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

  get_datos = (borrador) => {

    if (!borrador) {
      if (!this.validar()) {
        alert("Debe llenar las fechas y horas del evento");
        return undefined;
      }
    }
    const fecha_hora_inicio = `${this.is_empty(this.state.fecha_ini,'f')} ${this.is_empty(this.state.hora_ini,'h')}`;
    const fecha_hora_fin = `${this.is_empty(this.state.fecha_fin,'f')} ${this.is_empty(this.state.hora_fin,'h')}`;

    return {
      fecha_hora_inicio: fecha_hora_inicio,
      fecha_hora_fin: fecha_hora_fin,
      zona_horaria:this.is_empty(this.state.zona_horaria)
    }

  }

  is_empty = (word,tipo) => {
    if (word === '' && tipo === 'f') return "1111-01-01";
    if (word === '' && tipo === 'h') return "00:00";
    else if (word === '') return '-';
    
    else return word;
  }

  set_datos_borrador = datos => {

    if (datos.fecha_inicial === '1111-01-01') datos.fecha_inicial= "";
    if (datos.fecha_final === '1111-01-01') datos.fecha_final ="";
    if (datos.hora_inicial === '00:00:00')  datos.hora_inicial='';
    if (datos.hora_final === '00:00:00') datos.hora_final = "";
    if (datos.zona_horaria === '-') datos.zona_horaria ="";

    this.setState({
      fecha_ini:datos.fecha_inicial,
      fecha_fin:datos.fecha_final,
      hora_ini:datos.hora_inicial,
      hora_fin: datos.hora_final,
      zona_horaria:datos.zona_horaria
    }, () => {
        
      if (datos.fecha_inicial !== '1111-01-01') document.getElementById("fecha_ini").value = datos.fecha_inicial;
      if (datos.fecha_final !== '1111-01-01') document.getElementById("fecha_fin").value =  datos.fecha_final;
      if (datos.hora_inicial !== '00:00:00') document.getElementById("hora_ini").value =  datos.hora_inicial;
      if (datos.hora_final !== '00:00:00') document.getElementById("hora_fin").value =  datos.hora_final;
      if (datos.zona_horaria !== '-') document.getElementById("cbox_zona").value =datos.zona_horaria;
        
    })
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