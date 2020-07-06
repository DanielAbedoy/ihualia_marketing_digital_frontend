import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody, CardHeader } from 'reactstrap'

import CSVReader from 'react-csv-reader';
import { CSVLink } from 'react-csv';


import Contactos from '../../../models/Contactos.js';
import NavBar from '../NavBar.js';
import Variables from '../../../variables/models.js';


import ComboBox from '../componets/ComboBox.js';
import Tabla from '../componets/Tabla.js';

class Exportar extends Component {


    constructor(props) {
        super(props);

        this.state = {
            campos: [],
            campos_extra: [],
            vals_principales: [],
            vals_extras: [],
            componente: '',
            exportData: []
        }

        this.grupoId = 0;
        this.cuenta = 1;
        this.modelo = new Contactos();
        this.variables = new Variables();
    }

    //Funcion para cargar el archivo y acomodarlos datos en la tabla
    cargarArchivo = (data, fileInfo) => {

        //Validadcion de los campos
        let headers = data[0].slice();
        if (headers.length !== this.state.campos.length) {
            alert("No coincide el número de campos");
            return;
        }
        let flags = [], positions = [];
        for (let i = 0; i < headers.length; i++) {
            for (let j = 0; j < this.state.campos.length; j++) {
                if (headers[i].toLowerCase() === this.state.campos[j].toLowerCase()) {
                    flags[i] = true;
                    positions[i] = j;
                    break;
                } else {
                    flags[i] = false;
                }
            }
        }
        for (let i = 0; i < flags.length; i++) {
            if (!flags[i]) {
                alert("No son los mismos campos");
                return;
            }
        }


        //Acomodar datos para la tabal
        let info = [];
        for (let i = 1; i < data.length - 1; i++) {
            let ar = [];
            for (let j = 0; j < headers.length; j++) {
                ar.push("-");
            }
            info.push(ar);
        }

        let arr = [];
        for (let i = 1; i < data.length - 1; i++) {
            let row = data[i];
            let inf = info[i - 1];
            positions.forEach((p, indx) => {
                let n = p;
                inf[n] = row[indx];
            });
            arr.push(inf);
        }
        this.tabla.setDatosTabla(arr);

    }

    //Funcion para traer el id del grupo que se selcciono
    setGrupoId = (id) => {
        this.grupoId = id;

        if (id === "no") this.setState({ campos: [] });

        if (this.state.componente === "importar") {
            this.tabla.getDatosTablaHeader(id, true, true);
        } else if (this.state.componente === "exportar") {
            this.tabla.getDatosTablaHeader(id);
        }

        this.tabla.setDatosTabla([]);
    }

    //Algoritmo para agregar todos los contactos importados
    agregar = (e) => {
        e.preventDefault();

        //Validacion
        let datos = this.tabla.getDatosBody();
        if (datos.length === 0) {
            alert("Debe agregar campos")
            return;
        }

        //Agregando los contactos
        //Acomodar datos
        let prins = this.variables.camposContactos()
        prins.shift();

        let vals_prin = [], vals_extra = []
        datos.forEach((user) => {
            let v = [], n = [];
            for (let i = 0; i < user.length; i++) {
                if (i < prins.length) v.push(user[i]);
                else n.push(user[i]);
            }
            vals_prin.push(v);
            vals_extra.push(n);
        });

        //Unirlos por json
        let json_prins = [];
        vals_prin.forEach((user) => {
            let aux = {};
            for (let i = 0; i < user.length; i++) {
                let p = aux;
                let myObj = {};
                myObj[prins[i]] = user[i];
                let unidos = Object.assign(p, myObj)
                aux = unidos;
            }
            json_prins.push(aux);
        });

        let arr = []
        vals_extra.forEach((v, i) => {
            let obj = [];
            v.forEach((c, j) => {
                obj.push({
                    valor: c,
                    campo: this.state.campos_extra[j]
                });
            })
            arr.push(obj);
        })

        //Ejecucion
        this.modelo.crearContacto(json_prins, arr, this.grupoId)
            .then((r) => {
                if (r.length === datos.length) {
                    alert("Agregados con exito");
                    this.tabla.setDatosTabla([]);
                } else {
                    alert("Al parecer no todos los contacto fueron agregados");
                }

            })
            .catch(console.log)

    }

    //Render de la clase
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card className="">
                            <CardHeader>
                                <NavBar
                                    title="Exportar"
                                />
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg="8" md="8" sm="6" xs="12" >
                                        <p className="h3">Acción</p>
                                    </Col>
                                    <Col lg="2" md="2" sm="3" xs="12" className="p-0">
                                        <Button className="bg-transparent text-dark border border-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({ componente: "importar", campos: [] });
                                            }}>
                                            <i className="fa fa-upload"></i>  Importar Contactos
                                            </Button>
                                    </Col>
                                    <Col lg="2" md="2" sm="3" xs="12" className="p-0">
                                        <Button className="bg-transparent text-dark border border-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({ componente: "exportar", campos: [] });
                                            }}>
                                            <i className="fa fa-download"></i>  Exportar Contactos
                                            </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        {this.retornarComponente()}
                    </Col>
                </Row>
            </div>

        );
    }

    //Retorna el componente segun la seleccion
    retornarComponente = () => {
        if (this.state.componente === 'importar') return (this.importar());
        else if (this.state.componente === 'exportar') return (this.exportar());
    }

    //Retorna el componente para subir el archivo de importacion cuando se ha seleccionado
    csvComponent = () => {
        if (this.state.campos.length > 0) {
            return (
                <>
                    <Col lg="6" md="6" sm="12" xs="12" className="mx-auto border border-dark rounded">
                        <p className="mx-auto h5">Selecciona el archivo .csv</p>
                        <div className="input-group">
                            <div className="custom-file">
                                <CSVReader onFileLoaded={this.cargarArchivo} />
                            </div>
                        </div>
                    </Col>
                </>
            );
        }
    }

    //Componente Importacion
    importar = () => {
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col lg="9" md="9" sm="12" xs="12" className="">
                            <p className="mx-auto h3">Importar Contactos</p>
                        </Col>
                    </Row>

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
                        {this.csvComponent()}
                    </Row>
                    <hr />
                    <Row>
                        <Col lg="10" md="10" sm="12" xs="12" className="bg-white mx-auto">
                            <Tabla
                                ref={element => { this.tabla = element }}
                                option={''}
                                action={() => { }}
                                sendCampos={(campos_prin, campos_ex) => { this.setState({ campos: campos_prin, campos_extra: campos_ex }) }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={this.agregar} color="success" block>Agregar todo</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }

    //Componente importacion
    exportar = () => {
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col lg="9" md="9" sm="12" xs="12" className="">
                            <p className="mx-auto h3">Exportar Contactos</p>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col lg="6" md="6" sm="12" xs="12" className="mx-auto">
                            <ComboBox
                                action={this.setGrupoId}
                            />
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col lg="10" md="10" sm="12" xs="12" className="bg-white mx-auto">
                            <Tabla
                                ref={element => { this.tabla = element }}
                                option={''}
                                action={() => { }}
                                sendCampos={(campos_prin, campos_ex, ) => {
                                    this.setState({ campos: campos_prin, campos_extra: campos_ex })
                                }}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        {this.seleccionado()}
                    </Row>
                </CardBody>
            </Card>
        );
    }

    //Retorna el boton para dercargar el archivo cuando se ha seleccionado el archivo
    seleccionado = () => {
        if (this.state.campos.length !== 0) {
            return (
                <Col md="3" sm="3" lg="3" className="mx-auto">
                    <CSVLink
                        data={this.state.exportData}
                        filename={`Contactos_Grupo_Clave_${this.grupoId}.csv`}
                        className="btn btn-primary"
                        onClick={() => {
                            this.setState({ exportData: [...[this.state.campos], ...this.tabla.getDatosBody()] })
                        }}
                    >
                        Descargar
                    </CSVLink>
                </Col>
            );
        }
    }

}

export default Exportar;





