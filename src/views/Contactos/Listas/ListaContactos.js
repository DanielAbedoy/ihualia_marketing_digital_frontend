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

        grupo:'',
        campos_t: ["ID", "Nombre", "Correo"],
        campos_extra: [],
        contactos: []
    }

    componentDidMount = () => {
        this.setState({ cuenta: require('store').get('cuenta_en_uso').id })

    }

    //Funcion para saber el grupo que esta seleccionado
    setGrupoId = (grupo) => {
        console.log(grupo)
        this.grupoId = grupo.id;
        this.setState({ campos_t: ["ID", "Nombre", "Correo"], contactos: [], grupo:grupo }, async () => {
            const campos_extra = this.state.campos_t.concat(grupo.campos_extra)
            const contactos = await new ModelContactos().getContactosDelGrupo(grupo.id)
            this.setState({campos_t:campos_extra, contactos: contactos})
         })
    }


    actulizarContacto = async (datos) => {
        const camposIniciales = ["nombre","correo"]
        //Sber si se actualizo datos principales
        let datosPrincipales = { id: datos.datos_antes.id, nombre: datos.datos_antes.nombre, correo: datos.datos_antes.correo, grupo: this.state.grupo.id };
        let f = false;
        camposIniciales.forEach(c => {
            if (datos.datos_nuevos[`${c}`]) {
                if (datos.datos_nuevos[`${c}`] !== datos.datos_antes[`${c}`]) {
                    f = true;
                    datosPrincipales[`${c}`] = datos.datos_nuevos[`${c}`]
                }
            }
        })

        if (f) {
            //Actualizar los principales
            await new ModelContactos().actualizar_datosContacto(datos.datos_antes.id, datosPrincipales)
        }

        
        let campos = [];
        this.state.grupo.campos_extra.forEach(c => {
            if(datos.datos_nuevos[`${c}`])campos.push({campo:c, valor:datos.datos_nuevos[`${c}`]})
        })

        if (campos.length > 0) {
            //Actualizar campos
            await new ModelContactos().add_new_values(datos.datos_antes.id, campos)

        }

        this.setGrupoId(this.state.grupo)




        //Saber si se actualizaros campos extra
        

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