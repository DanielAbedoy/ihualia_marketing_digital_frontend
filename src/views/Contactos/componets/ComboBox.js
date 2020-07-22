import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import Modelo from '../../../models/Contactos.js';

class Example extends Component {

  //Contructor de la clas
  constructor(props) {
    super(props);

    this.modelo = new Modelo();

    //State de la clase
    this.state = {
      options: []
    }

    //Cuenta que esta siendo utilizada
    this.cuenta = 0;

  }

  componentDidMount() {
    if ((require('store').get('cuenta_en_uso') !== undefined)) {
      this.cuenta = require('store').get('cuenta_en_uso').id;
    }
    
    this.getGrupos();
  }

  //Funcion para regresar cual elemento fue seleccionado - se regresa por medio del value del OPTION
  seleccionado = (e) => {
    e.preventDefault();
    this.props.action(e.target.value);
  }

  //Funcion que obtendra los grupos existentes en la DB
  getGrupos = () => {
    //Peticion al modelo para obtener los grupos 
    let grupos = this.modelo.getGrupos(this.cuenta);
    let data = [];
    grupos.then((grupo) => {
      grupo.forEach((g) => {
        data.push({ "id": g.id, "value": g.nombre });  
      });
      this.setState({options:data});
    })
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="select"><p className="h5">Grupo:</p></Label>
          <Input type="select" name="select" id="select" className="text-center" onChange={this.seleccionado}>
            <option value={"no"}>Selecciona un grupo</option>
            {this.state.options.map((val, indx) => {
              return (
                <option key={indx} value={val.id} >{val.id} - {val.value}</option>
              );
            })}
          </Input>
        </FormGroup>
      </Form>
    );
  }
}

export default Example;