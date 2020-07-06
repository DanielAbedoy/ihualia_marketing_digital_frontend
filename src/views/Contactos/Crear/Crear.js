import React, { Component } from 'react';
import { Button, Row, Col, Card, CardBody, CardHeader, CardTitle, CardText } from 'reactstrap'

import ModeloContactos from '../../../models/Contactos.js';
import Variables from '../../../variables/models.js';

import NavBar from '../NavBar.js';
import ComboBox from '../componets/ComboBox.js';
import Tabla from '../componets/Tabla.js';
import GrupoNuevo from './FormNuevoGrupo.js';
import Formulario from './FormContactosNuevos.js';

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
        }

        this.idCuenta = 1
        this.cuenta = 1;
        this.modelo = new ModeloContactos();
        this.variables = new Variables();

        this.setUsuarioTabla.bind(this);
        this.agregarContactos.bind(this)

    }

    getGrupos = () => {
        //Peticion al modelo para obtener los grupos 
        let grupos = this.modelo.getGrupos(this.cuenta)
            grupos.then((grupo) => {
                this.setState({grupos:grupo});
            })
    }
   
    //Funcion para crear un nuevo grupoName
    crearGrupo = (nombre_grupo) => {
        //Validacion
        if (nombre_grupo === '') {
            alert("Debe ingresar un nombre");
            return;
        }
        //Confirmacion
        if (window.confirm( `Seguro desea crear el grupo: ${nombre_grupo}`)) {
            //Peticion post para crear elgrupo
            this.modelo.crearGrupo(nombre_grupo, this.idCuenta)
                .then((res) => {
                    alert("Creado con éxito");
                    this.getGrupos();
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }

    //Funcion para saber el grupo que esta seleccionado
    setGrupoId = (id) => {
        this.setState({ grupoSeleccionado: id, usuarioNuevo: [],optionTable:'DELETE' }, () => {
            if( id !== "no" )this.tabla.getDatosTablaHeader(id,'DELETE', true, true);
        })
    }

    //Funcion para pasar los valores a la tabla
    setUsuarioTabla = (user) => {
        this.setState({
            usuarioNuevo: [...this.state.usuarioNuevo, [...user]]
        }, () => {
            this.tabla.setDatosTabla(this.state.usuarioNuevo);
        })
    }

    //Funcion para agregar un nuevo campo al grupo
    nuevoCampoGrupo = (nombre_campo) => {
        //Validacion
        if (nombre_campo === '') {
            alert("Debe agregar un nombre para elcampo");
            return;
        }
        //Confirmacion
        if (window.confirm(`Seguro quiere crear el campo: ${nombre_campo}`)) {
            this.modelo.crearCampo_a_grupo(nombre_campo, this.state.grupoSeleccionado)
                .then((resp) => {
                    this.tabla.getDatosTablaHeader(this.state.grupoSeleccionado,'DELETE', true, true);
                })
                .catch(err=>alert(err))
        }        
    }


    //Funcion para agregar los contactos que se agregaron en la tabla general
    agregarContactos = (e) => {
        e.preventDefault();

        //Validacion
        if (this.state.usuarioNuevo.length === 0) {
            alert("Debe haber almenos un contacto a registrar");
            return;
        }

        //Acomodar datos
        let prins = this.variables.camposContactos();
        prins.shift();

        let vals_prin = [], vals_extra = []
        this.state.usuarioNuevo.forEach((user) => {
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
        const campos_extra = this.state.campos_extra;
        vals_extra.forEach((v, i) => {
            let obj = [];
            v.forEach((c, j) => {
                obj.push({
                    valor: c,
                    campo: campos_extra[j]
                });    
            })
            arr.push(obj);
        })

        this.setState({ vals_principales: json_prins, vals_extras: arr }, () => {
            //Ejecutar

            this.modelo.crearContacto(this.state.vals_principales,this.state.vals_extras, this.state.grupoSeleccionado)
                .then((r) => {
                    if (r.length ===this.state.usuarioNuevo.length ) {
                        alert("Agregados con exito");
                        this.setState({ usuarioNuevo: []}, () => {
                            this.tabla.setDatosTabla(this.state.usuarioNuevo);
                        })
                    } else {
                        alert("Al parecer no todos los contacto fueron agregados");
                    }
                    
                })
                .catch(console.log)
        })


    }

    //Funcion para quitar un contacto de la tablageneral
    quitarContacto = (array) => { 
        let usuarios = this.state.usuarioNuevo;
        usuarios.forEach((user, indx) => {
            let flag = true;
            for (let i = 0; i < user.length; i++) {
                if (array[i] !== user[i]) flag=false;
            }
            if (flag === true) {
                usuarios.splice(indx,1)
            }
        })
        this.setState({
            usuarioNuevo: usuarios
        }, () => {
            this.tabla.setDatosTabla(this.state.usuarioNuevo);
        })

    }

    //RENDER DE LA CLASE
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <NavBar
                                    title="Grupos - Contactos"
                                />
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col lg="8" md="8" sm="6" xs="12">
                                        <p className="h4">Crear</p>
                                    </Col>
                                    <Col lg="2" md="2" sm="3" xs="12" className="p-0">
                                        <Button className="bg-transparent text-dark border border-white"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({ componente: "grupo" },()=>this.getGrupos())
                                            }}>
                                            <i className="fa fa-users"></i>  Crear Grupo
                                            </Button>
                                    </Col>
                                    <Col lg="2" md="2" sm="3" xs="12" className="p-0">
                                    <Button  className="bg-transparent text-dark border border-white"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                this.setState({ componente: "contacto" })
                                            }}>
                                             <i className="fa fa-user"></i>  Crear Contactos
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

    //Selecciona cual componente debe mostrar segun la seleccion
    retornarComponente = () => {
        if (this.state.componente === 'grupo') return (this.componentCrearGrupo());
        else if (this.state.componente === 'contacto') return (this.componentCrearContacto());
    }

    //Retorna el componente para crear un grupo nuevo
    componentCrearGrupo = () => {

        return (
            <Card >
                <CardHeader>
                    <Row>
                        <Col lg="9" md="9" sm="12" xs="12" className="">
                            <p className="mx-auto h3">Crear grupo</p>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col lg="5" md="5" sm="12" xs="12" className="mx-auto">
                            <GrupoNuevo
                                valorInput={this.getValorNuevoGrupo}
                                action={this.crearGrupo}
                            />
                        </Col>
                    </Row>
                    {this.componenteGruposExistentes()}
                </CardBody>
            </Card>
        );
    }

    //Retorna el componente para crear un contacto nuevo
    componentCrearContacto = () => {

        return (
            <Card >
                <CardHeader>
                    <Row>
                        <Col lg="9" md="9" sm="12" xs="12" className="">
                            <p className="mx-auto h3">Agregar contactos</p>
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

                    {this.componenteGrupoSeleccionado()}

                </CardBody>
            </Card>
        );
    }

    //Seleccona el componente para saber los grupos existentes que tiene la cuenta
    componenteGruposExistentes = () => {
        return (
            <>

                <br /><hr />
                <Row>
                    <Col xs="12" className="mb-3">
                        <Row>
                            <Col lg="9" md="9" sm="12" xs="12" className="">
                                <p className="mx-auto h4">Grupos existentes</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {this.state.grupos.map((grupo, indx) => {
                        return (
                            <Col key={indx} className="mx-auto  text-center" lg="4" md="4" sm="6" xs="11">
                                <Card body inverse color="secondary text-dark">
                                    <CardTitle >Clave: {grupo.id}</CardTitle>
                                    <CardText>Nombre del Grupo: {grupo.nombre}</CardText>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </>
        );
    }

    //Retorna el componente por si se ha seleccionado un grupo
    componenteGrupoSeleccionado = () => {
        if (this.state.grupoSeleccionado !== "no") {
            return (
                <>
                    <Row>
                        <Col lg="12" md="12" sm="12" xs="12" className="mx-auto">
                            <Formulario
                                inputs={this.state.campos}
                                action={this.setUsuarioTabla}
                                action_campo={this.nuevoCampoGrupo}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="10" md="10" sm="12" xs="12" className="bg-white mx-auto">
                            <Tabla
                                ref={element =>{this.tabla = element}}
                                option={'DELETE'}
                                sendCampos={(campos_prin,campos_ex)=>{this.setState({campos:campos_prin,campos_extra:campos_ex})}}
                                action={this.quitarContacto}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg="6" md="6" sm="12" xs="12" className="mx-auto">
                            <Button onClick={this.agregarContactos} color="success" block>Agregar todos los contactos</Button>
                        </Col>
                    </Row>
                </>
            );
        } else {
            return (
                <Row>
                    <Col lg="9" md="9" sm="12" xs="12" className="text-center mx-auto">
                        <p className="h4">Seleccione un grupo</p>
                    </Col>
                </Row>
            );
        }
    }

}


export default Crear;