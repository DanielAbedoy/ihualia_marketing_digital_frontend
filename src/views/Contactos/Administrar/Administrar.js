import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'

import NavBar from '../NavBar.js';
import Tabla from '../componets/Tabla.js';
import Combo from '../componets/ComboBox.js';
import Formulario from './FormAdmin.js';

import Modelo from '../../../models/Contactos';
import Variables from '../../../variables/models.js';

class Administrar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarioAdministrado: [],
            grupoId: 0,
            campos: [],
            campos_extra: [],
            valores: [],
        }

        this.cuenta = 0;
        this.modelo = new Modelo();
        this.variables = new Variables();
        this.usuarioSeleccionado = [];
    }

    //DidMount para saver si se paso un usuario por parametros
    componentDidMount() {

        if ((require('store').get('cuenta_en_uso') === undefined)) {
            alert("Debes tener una cuenta en uso");
            this.props.history.push('/contactos');
        } else {
            this.cuenta = require('store').get('cuenta_en_uso').id
        }

        try {

            const user = this.props.location.state.usuario;
            this.setState({
                grupoId: user.grupo,
                campos: user.campos,
                valores: user.datos[0]
            }, () => {
                this.usuarioSeleccionado = user.datos[0].slice();
                this.tabla.getDatosTablaHeader(this.state.grupoId, false, true);
                this.tabla.setDatosTabla([this.state.valores]);
                this.formulario.setValores(this.state.campos, this.state.valores);
            })

        } catch (e) {


        }

    }

    //Funcion para saber el grupo que esta seleccionado
    setGrupoId = (id) => {
        this.setState({ grupoId: id });
        this.tabla.getDatosTablaHeader(id);
        this.formulario.setValores(this.state.campos, []);
    }

    //Funcion que obtiene los valores del renglon seleccionado de la tabla
    setSeleccionado = (array) => {
        this.usuarioSeleccionado = array.slice();
        this.setState({ valores: array }, () => {
            this.formulario.setValores(this.state.theaders, this.state.valores);
        })
    }

    //Algoritmo para actualizar los datos
    actualizar = (new_data) => {
        if (this.state.valores.length === 0) {
            alert("Debe seleccionar algun contacto")
            return;
        }

        const antes = this.usuarioSeleccionado;

        let flag = false;
        antes.forEach((val, indx) => {
            if (val !== new_data[indx]) flag = true;
        });

        if (!flag) {
            alert("Debe cambiar almenos un campo");
            return;
        }

        if (window.confirm("Seguro que desea realizar los cambios")) {
            // Cambios en los campos primarios
            let primarios = this.variables.camposContactos();
            let cambio = false;
            for (let i = 1; i < primarios.length; i++) {
                if (antes[i] !== new_data[i]) cambio = true;
            }
            //Cmbiando los datos Principales
            if (cambio) {
                let data = {};
                for (let i = 1; i < primarios.length; i++) {
                    let temp = {};
                    temp[primarios[i].toLocaleLowerCase()] = new_data[i];
                    data = Object.assign(data, temp);
                }
                //Peticion para cambiar datos
                this.modelo.actualizar_datosContacto(antes[0], data)
                    .then((r) => {
                        this.tabla.getDatosTablaHeader(this.state.grupoId);
                        this.formulario.setValores(this.state.campos, []);
                    })
            }
            //Cambiando los campos extras
            let flag1 = false;
            let j = primarios.length;
            let campos = this.state.campos;
            for (let i = j; i < new_data.length; i++) {
                if (antes[i] !== new_data[i]) flag1 = true;
            }
            if (flag1) {

                for (let i = j; i < new_data.length; i++) {
                    if (antes[i] !== new_data[i]) {
                        this.modelo.actualizar_campoExtra(antes[0], campos[i], new_data[i])
                            .then((r) => {
                                this.tabla.getDatosTablaHeader(this.state.grupoId);
                                this.formulario.setValores(this.state.campos, []);
                            })
                            .catch(console.log)
                    }
                }
            }
            this.usuarioSeleccionado = new_data.slice();
        }

    }

    //Algoritmo para eliminar al usuario
    eliminar = (datos) => {
        if (datos.length === 0) {
            alert("Debe haber un usuario seleccionado");
            return;
        }
        if (window.confirm("Seguro que deseas eliminar el contacto ?")) {
            this.modelo.eliminarContacto(datos[0])
                .then((r) => {
                    this.tabla.getDatosTablaHeader(this.state.grupoId);
                    this.formulario.setValores(this.state.campos, []);
                })
                .catch((r) => { alert("Algo salio mal") })
        }
    }

    render() {
        return (
            <div className="animated fadeIn" >
                <Row>
                    <Col xs="12">
                        <Card className="">
                            <CardHeader>
                                <NavBar
                                    title="Administrar"
                                />
                            </CardHeader>
                            {/* <CardBody>
                                <Row>
                                    <Col lg="9" md="9" sm="12" xs="12" className="">
                                        <p className="mx-auto h4">Administrar</p>
                                    </Col>
                                </Row>
                                </CardBody> */}
                        </Card>

                        <Row>
                            <Col md="12" xs="12" sm="12" lg="6">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col md="12" className="text-center">
                                                <p className="h5">Tablas</p>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col className="mx-auto" md="6">
                                                <Combo
                                                    action={this.setGrupoId}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <Tabla
                                                    ref={element => { this.tabla = element }}
                                                    option={'GET'}
                                                    action={this.setSeleccionado}
                                                    sendCampos={(campos_prin, campos_ex) => { this.setState({ campos: campos_prin, campos_extra: campos_ex }) }}
                                                    size={"small"}
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="12" xs="12" sm="12" lg="6">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col md="12" className="text-center">
                                                <p className="h5">Formulario</p>
                                            </Col>
                                        </Row>
                                    </CardHeader>
                                    <CardBody>

                                        <Row>
                                            <Formulario ref={element => { this.formulario = element }}
                                                campos={this.state.campos}
                                                action_actualizar={this.actualizar}
                                                action_eliminar={this.eliminar}
                                            />
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Administrar;