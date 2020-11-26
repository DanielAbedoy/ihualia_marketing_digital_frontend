import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody, CardHeader, Input } from 'reactstrap'

import ModeloContactos from '../../../models/Contactos.js';
import Variables from '../../../variables/models.js';

import GrupoComponent from './Hooks/CardGrupo';


class Crear extends Component {

    //Constructor de la clase
    constructor(props) {
        super(props);

        this.state = {
            grupos: [],
            componente: "",
            grupoSeleccionado: "no",
            campos: [],
            usuarioNuevo: [],
            campos_extra: [],
            vals_principales: [],
            vals_extras: [],

            nombre_grupo_nuevo: '',
        }

        this.idCuenta = 0;
        this.cuenta = 0;
        this.modelo = new ModeloContactos();
        this.variables = new Variables();
    }

    componentDidMount = () => {
            this.cuenta = require('store').get('cuenta_en_uso').id
            this.idCuenta = require('store').get('cuenta_en_uso').id
            this.getGrupos();
    }

    getGrupos = () => {
        //Peticion al modelo para obtener los grupos 
        let grupos = this.modelo.getGrupos(this.cuenta)
        grupos.then((grupo) => {
            this.setState({ grupos: grupo });
        })
    }

    //Funcion para saber el grupo que esta seleccionado
    setGrupoId = (id) => {
        this.setState({ grupoSeleccionado: id, usuarioNuevo: [], optionTable: 'DELETE' }, () => {
            if (id !== "no") this.tabla.getDatosTablaHeader(id, 'DELETE', true, true);
        })
    }


    crearNuevoGrupo = e => {
        e.preventDefault();

        if (this.state.nombre_grupo_nuevo === '') {
            alert("Debe ingresar un nombre parael grupo")
            return;
        }

        new ModeloContactos().crearGrupo(this.state.nombre_grupo_nuevo, require('store').get("cuenta_en_uso").id)
            .then(response => {
                if (response !== "Created") {
                    alert("Error al crear el grupo")
                } else {
                    alert("Creado")
                    this.setState({ nombre_grupo_nuevo: '' });
                    this.getGrupos();
                }
            })
    }

    //RENDER DE LA CLASE
    render() {


        return (
            <div className="animated fadeIn">

                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader className="text-white p-4" style={{backgroundColor:"rgb(44,96,186)"}}>
                                <p className="h3"><i className="fa fa-users"></i> Contactos |</p>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col md="12">
                                        <p className="h4 mb-0">Grupos</p>
                                        <p className="h6 text-muted">Crea y adminstra tus grupos, y agrega contactos nuevos</p>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md="12">
                                        <Row>
                                            <Col md="7" xs="12" className="mx-auto">
                                                <span className="h4 mb-2 text-center"><b>Crear nuevo grupo de contactos</b></span>
                                                <Row className="mt-3">
                                                    <Col md="9" xs="10">
                                                        <Input value={this.state.nombre_grupo_nuevo}
                                                            type="text" placeholder="Escribe el nombre del grupo"
                                                            onChange={e => this.setState({ nombre_grupo_nuevo: e.target.value })}
                                                        />
                                                    </Col>
                                                    <Col md="2" xs="2">
                                                        <Button block color="success"
                                                            onClick={this.crearNuevoGrupo}
                                                        ><i className="fa fa-plus"></i></Button>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xl="9" lg="11" xs="12" className="mx-auto">
                                        <Row>
                                            {this.state.grupos.map((grupo, indx) => (
                                                <GrupoComponent indx={indx} key={indx} grupo={grupo} />
                                            ))}
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}


export default Crear;