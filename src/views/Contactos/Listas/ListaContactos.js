import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'

import NavBar from '../NavBar.js';
import ComboBox from '../componets/ComboBox.js';
import Tabla from '../componets/Tabla.js';

class ListaContactos extends Component {

    cuenta = 1;
    grupoId = 0;

    state = {
        campos: [],
        grupos:[]
    }

    //Funcion para saber el grupo que esta seleccionado
    setGrupoId = (id) => {
        this.grupoId = id;
        this.tabla.getDatosTablaHeader(id);
    }

    //Funcion que obtiene los valores del renglon seleccionado de la tabla
    setSeleccionado = (array) => {
        let user = {
            campos: this.state.campos,
            grupo: this.grupoId,
            datos: [array]
        }
        this.props.history.push({
            pathname: '/contactos/administrar',
            state: { usuario: user }
        })
    }

    //Render de la Clase
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card className="">
                            <CardHeader>
                                <NavBar
                                    title="Listas"
                                />
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg="6" md="6" sm="12" xs="12" className="mx-auto">
                                        <ComboBox
                                            action={this.setGrupoId}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col lg="11" md="11" sm="12" xs="12" className="bg-white mx-auto">
                                        <Tabla
                                            ref={element => { this.tabla = element }}
                                            option={'GET'}
                                            action={this.setSeleccionado}
                                            sendCampos={(campos_prin,campos_ex)=>{this.setState({campos:campos_prin})}}
                                        />
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

export default ListaContactos;