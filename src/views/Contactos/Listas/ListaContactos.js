import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap'

import NavBar from '../NavBar.js';
import ComboBox from '../componets/ComboBox.js';

import Table from './Hooks/Table';
import ModelContactos from '../../../models/Contactos';

class ListaContactos extends Component {


    grupoId = 0;

    state = {
        campos: [],
        grupos: [],
        cuenta: 0,

        campos_t: ["ID", "Nombre", "Correo"],
        campos_extra: [],
        contactos: []
    }

    componentDidMount = () => {
        this.setState({ cuenta: require('store').get('cuenta_en_uso').id })

    }

    //Funcion para saber el grupo que esta seleccionado
    setGrupoId = (id) => {
        this.grupoId = id;
        this.setState({ campos_t: ["ID", "Nombre", "Correo"], contactos: [] }, () => {
            Promise.all([new ModelContactos().getCamposGrupo(id), new ModelContactos().getContactosDelGrupo(id)])
                .then(promises => { return { campos: promises[0], contactos: promises[1] } })
                .then(arreglo => {
                    arreglo.campos.forEach(campo => { this.setState({ campos_t: this.state.campos_t.concat(campo.campo_extra), campos_extra: this.state.campos_extra.concat(campo.campo_extra) }) })
                    arreglo.contactos.forEach(contacto => {
                        new ModelContactos().getValorDelCampoDelContacto(contacto.contacto.id)
                            .then(valores => {
                                valores.forEach(valor => {
                                    contacto.contacto[`${valor.campo}`] = valor.valor
                                })
                                this.setState({ contactos: this.state.contactos.concat(contacto.contacto) });
                            })
                    });
                })

        })

    }


    actulizarContacto = (datos) => {
        let flag = false;
        let new_json = {};
        this.state.campos_t.forEach(campo => {

            if (datos.datos_nuevos[`${campo.toLowerCase()}`]) {
                new_json[`${campo.toLowerCase()}`] = datos.datos_nuevos[`${campo.toLowerCase()}`];
                flag = true;
            } else new_json[`${campo.toLowerCase()}`] = datos.datos_antes[`${campo.toLowerCase()}`];

        })
        if (flag) { //Cambiar datos
            const data_principal = { id: new_json.id, nombre: new_json.nombre, correo: new_json.correo };
            //Actualizar el principal
            new ModelContactos().actualizar_datosContacto(data_principal.id, data_principal)
                .then(r => {
                    if (r.statusText === 'OK') {
                        return this.state.campos_extra.map((campo) => {
                            return new ModelContactos().actualizar_campoExtra(data_principal.id, campo.toLowerCase(), new_json[`${campo.toLowerCase()}`])
                        })
                    }
                })
                .then(promises => Promise.all(promises))
                .then(results => {
                    let f = true
                    results.forEach(res => { if (res !== "Actualizado") f = false; })
                    if (!f) {
                        alert("Algun campo no se actulizo de manera correcta")
                        this.setGrupoId(this.grupoId);
                    } else {
                        alert("Actualizacion correcta")
                        this.setGrupoId(this.grupoId);
                    }
                })
                .catch(err => {
                    alert("Algo ocurrio mal")
                })


            //Actualizar los campos


        } else alert("No hay ningun cambio");

    }

    eliminarContacto = (contacto) => {
        if (window.confirm("Seguro que desea eliminar el contacto ?")) {
            new ModelContactos().eliminarContacto(contacto.id)
                .then(response => {
                    if (response.statusText === "No Content") {
                        alert("Eliminado correctamente")
                        this.setGrupoId(this.grupoId);
                    } else {
                        alert("No se pudo eliminar")
                        this.setGrupoId(this.grupoId);
                    }
                })
        }
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
                                    <Col md="12">
                                        <p className="h4 mb-0">Contactos</p>
                                        <p className="h6 text-muted">Contactos  en listados por grupo</p>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col lg="6" md="6" sm="12" xs="12" className="mx-auto">
                                        <ComboBox
                                            action={this.setGrupoId}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Table
                                    campos={this.state.campos_t}
                                    contactos={this.state.contactos}
                                    event_Update={this.actulizarContacto}
                                    event_Delete={this.eliminarContacto}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default ListaContactos;