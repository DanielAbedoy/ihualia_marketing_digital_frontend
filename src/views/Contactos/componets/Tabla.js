import React, { Component } from 'react';
import Variables from '../../../variables/models.js';
import Modelo from '../../../models/Contactos.js';

class Tabla extends Component {

    //Constructor de la clase
    constructor(props) {
        super(props);

        this.onPress.bind(this);
        this.variables = new Variables();
        this.modelo = new Modelo();

        this.state = {
            header: [],
            datosBody: [],
            sty: {},
        }
    }

    //Funcion para devolver los datos el renglon que fue seleccionado
    onPress = (e) => {
        e.preventDefault();
        let tds = [...document.getElementById(e.target.id).getElementsByTagName('td')];
        const array = [];
        let n = 0;
        if (this.state.option !== '') n = 1;
        
        for (let i = 0; i < tds.length - n; i++){
            array.push(tds[i].textContent);
        }
        this.props.action(array);
    }

    setDatosTabla(datos) {
        this.setState({datosBody:datos});
    }

    getDatosBody() {
        return this.state.datosBody;
    }

    get_datos_export = () => {
        return [...this.state.header, ...this.state.datosBody];
    };

    //Funcion para dar los headers de la tabla
    getDatosTablaHeader = (id_grupo, shift = false, only_header = false ) => {
        //Validacion
        if (id_grupo === "no") {
            this.setState({
                header: [], datosBody: [],sty:{}, option:''
            })
            return;
        };
        //Campos que deben de ir en el Header
        const aux = this.variables.camposContactos();
        let extras = [];
        if (shift) aux.shift();
        this.modelo.getCamposGrupo(id_grupo)
            .then((campos) => {
                campos.forEach((campo) => {
                    aux.push(campo.campo_extra);
                    extras.push(campo.campo_extra);
                })

                let arreglo = [];
                aux.forEach((c) => {
                    arreglo.push(c.toUpperCase());
                })

                this.setState({ header: arreglo, campos_extra: extras }, () => {
                    if (this.props.sendCampos !== undefined) {
                        this.props.sendCampos(arreglo,extras);
                    }
                })
            })
            .catch((error) => {
                //this.setState({ grupoName: "El grupo esta vacio", theaders: aux, tbody: [] })
            })
        
        this.setState({ header: aux }, () => {
            if(!only_header)this.getDatosTablaBody(id_grupo);
        })
        
    }

     //Funcion para acomodar los datos de los usuarios para la tabla
    getDatosTablaBody = (id_grupo) => {
        //Contactos de La tabal
        const informacion = []
        this.modelo.getContactosDelGrupo(id_grupo)
            .then((result) => {
                if (result.length === 0) {
                    this.setState({ datosBody:[]});
                    return;
                }
                result.forEach((r) => {
                    let info = r.contacto;
                    let arr = [];
                    for (const i in info) {
                        arr.push([i, info[i]]);
                    }
                    informacion.push(arr);
                });

                let head = this.state.header;
                let body = [];
                informacion.forEach((usuario) => {
                    let row = [];
                    usuario.forEach((key,i) => {
                        if (head[i].toLowerCase() === key[0]) {
                            row[i] = key[1]
                        }
                    });
                    body.push(row);
                });

                
                body.forEach((user) => {
                    this.modelo.getValorDelCampoDelContacto(user[0])
                        .then((campos) => {
                            campos.forEach((data) => {
                                for (let j = 0; j < head.length; j++) {
                                    if (head[j].toLowerCase() === data.campo) {
                                        user[j] = data.valor;
                                        break;
                                    }
                                }
                            });
                            this.setState({ datosBody: body, sty: { maxHeight: 400 } }, () => {
                                if (this.props.send_export_data !== undefined) {
                                    this.props.send_export_data([this.state.header, ...this.state.datosBody]);
                                }
                            });
                        })
                });
            })
            .catch(console.log)

    }

    render() {
        return (
            <div className={"table-responsive table-bordered table-hover " + this.props.size} style={this.state.sty}>
                <table className="table text-center">
                    <thead>
                        <tr className="thead-dark">
                            {this.state.header.map((h,indx) => {
                                return (
                                    <th key={indx}> {h} </th>
                                );
                            })}
                            {this.headOption()}
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.datosBody.map((val, indx) => {
                            
                            return (
                                <tr id={"tr-" + indx} key={indx}>
                                    {
                                        val.map((item, i) => {
                                            return (
                                                <td key={i}>{item}</td>
                                            );
                                        })
                                    }
                                    {this.bodyOption(indx)}
                                </tr>
                            );
                        })  
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    headOption = () => {
        if (this.props.option !== '' && this.state.datosBody.length > 0) {
            return (
                <th > Más </th>
           );
       }
    }

    bodyOption = (indx) => {
        let info = this.props.option;
        if (info === 'GET') {
            return (
                <td><i id={"tr-" + indx} onClick={this.onPress} className="fa fa-cog border rounded bg-primary p-1" style={{cursor:"pointer"}}></i></td>   
           );
        } else if (info==='DELETE') {
            return (
                <td><i id={"tr-" + indx} onClick={this.onPress} className="fa fa-eraser border rounded bg-danger p-1" style={{cursor:"pointer"}}></i></td>      
           );
        }
    }

}

export default Tabla;