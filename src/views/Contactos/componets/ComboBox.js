import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import Modelo from '../../../models/Contactos.js';
import { SessionContext } from '../../../sessionContext.js';

class Example extends Component {

  static contextType = SessionContext;

  //Contructor de la clas
  constructor(props) {
    super(props);

    this.modelo = new Modelo();

    //State de la clase
    this.state = {
      grupos: []
    }

    //Cuenta que esta siendo utilizada
    this.cuenta = 0;

  }

  componentDidMount() {
    if (this.context.cuenta !== false) {
      this.cuenta = this.context.cuenta.id;
    }
    
    this.getGrupos();
  }

  //Funcion para regresar cual elemento fue seleccionado - se regresa por medio del value del OPTION
  seleccionado = (e) => {
    e.preventDefault();
    //this.props.action(e.target.value);
    const grupo = this.state.grupos.find(g => g.id == e.target.value);
    if (!grupo) this.props.action({ id: 0 });
    else this.props.action(grupo);
    
  }

  //Funcion que obtendra los grupos existentes en la DB
  getGrupos = () => {
    //Peticion al modelo para obtener los grupos 
    let grupos = this.modelo.getGrupos(this.cuenta);
    grupos.then((grupos) => this.setState({ grupos: grupos }))
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="select"><p className="h5">Grupo:</p></Label>
          <Input type="select" name="select" id="select" className="text-center" onChange={this.seleccionado}>
            <option value={"no"}>Selecciona un grupo</option>
            {this.state.grupos.map((grupo, indx) => {
              return (
                <option key={indx} value={grupo.id} >{grupo.id} - {grupo.nombre}</option>
              );
            })}
          </Input>
        </FormGroup>
      </Form>
    );
  }
}

export default Example;