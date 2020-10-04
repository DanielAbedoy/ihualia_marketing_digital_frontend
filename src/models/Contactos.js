import axios from 'axios';
import URLs from './urls';

class Contactos {

    constructor() {
        this.urls = new URLs();
    }


    getGrupos = async (cuenta) => {

        const peticion = () => {
            //Peticion get para obtener los datos
            return axios.get(`${this.urls.getUrlPrincipal()}/api/grupo/?cuenta=${cuenta}`)
                .then((res) => {
                    return res.data.results;
                })
                .catch(console.log)
        }

        
        return await peticion();
    }

    getCamposGrupo = async (grupoId) => {

        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/campo-extra-grupo/?grupo=${grupoId}`)
                .then((res) => {
                    return res.data.results;
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        return await peticion();
    }

    getContactosDelGrupo = async (grupoId) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/grupo-contacto/?grupo=${grupoId}`)
                .then((res) => {
                    return res.data.results;
                }).catch(console.log)
        }
        return await peticion();
    }

    getValorDelCampoDelContacto = async (contactoId) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/campo-contacto/?contacto=${contactoId}`)
                .then((res) => {
                    return res.data.results
                })
        }

        return await peticion();
    }


    crearGrupo = async (nombreGrupo, idCuenta) => {
        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/post/grupo/`, {
                nombre: nombreGrupo,
                cuenta: idCuenta
            })
                .then((res) => {
                    return res;
                })
        }
        return await peticion();
    }


    crearCampo_a_grupo = async (nombre_campo, id_grupo) => {
        let minusculas = nombre_campo.toLowerCase();

        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/campo-extra/`, { nombre: minusculas })
                .then((r) => {
                    return this.relacionCampoGrupo(nombre_campo, id_grupo)
                        .then((res) => {
                            return this.rellenarValoresCampo(nombre_campo, id_grupo)
                                .then((r) => {
                                    return r;
                                })
                        })
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.data.nombre[0] === "Ya existe campo extra con este nombre.") { //Ya existe solo relaciona
                            return this.relacionCampoGrupo(nombre_campo, id_grupo)
                                .then((res) => {
                                    return this.rellenarValoresCampo(nombre_campo, id_grupo)
                                        .then((r) => {
                                            return r;
                                        })
                                })

                        } else return "Error";
                    }
                })
        }

        return await peticion();
    }

    relacionCampoGrupo = async (campo, id_grupo) => {
        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/post/campo-extra-grupo/`,
                { grupo: id_grupo, campo_extra: campo })
                .then((res) => {
                    return "Se agrego correctamente."
                })
                .catch((err) => {
                    return axios.delete(`${this.urls.getUrlPrincipal()}/api/campo-extra/`, { nombre: campo })
                        .then((r) => {
                            return "Error al completar"
                        })
                        .catch((err) => {
                            return "Error"
                        })
                })
        }
        return await peticion();
    }

    rellenarValoresCampo = async (campo, id_grupo) => {
        const peticion = () => {
            return this.getContactosDelGrupo(id_grupo)
                .then((contactos) => {
                    contactos.map((contacto) => {
                        let id_contacto = contacto.contacto.id
                        return axios.post(`${this.urls.getUrlPrincipal()}/api/post/campo-contacto/`,
                            { contacto: id_contacto, campo: campo, valor: "-" })
                            .then((r) => {
                                return 1;
                            })
                    })

                })
        }

        return await peticion();
    }

    crearContacto = async (usuarios, valores_extra, id_grupo) => {
        const peticion = () => {
            //Crear los contactos
            return usuarios.map((user, indx) => {
                return axios.post(`${this.urls.getUrlPrincipal()}/api/contacto/`, user)
                    .then((r) => {
                        let id_user = r.data.id;
                        //Relacionar los contactos con el grupo
                        return this.relacionarContactoGrupo(id_user, id_grupo)
                            .then((r) => {
                                let id = r.data.contacto;
                                //Generar el valor de los campos extras
                                return this.agregarValoresACamposExtra(id, valores_extra[indx])
                                    .then((r) => {
                                        return r
                                    })
                                    .catch(console.log)
                            })
                            .catch((err) => { return 0 })
                    })
                    .catch((err) => { return 0 })
            });
        }

        return await peticion();
    }


    relacionarContactoGrupo = async (id_conatacto, id_grupo) => {
        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/post/grupo-contacto/`, {
                contacto: id_conatacto,
                grupo: id_grupo
            })
                .then((r) => {
                    return r
                })
                .catch(console.log)
        }

        return await peticion();
    }

    agregarValoresACamposExtra = async (id_contacto, valores) => {
        const peticion = () => {

            valores.map((datas, indx) => {
                const user = { contacto: id_contacto };
                const unidos = Object.assign(user, datas);

                return axios.post(`${this.urls.getUrlPrincipal()}/api/post/campo-contacto/`, unidos)
                    .then((r) => {
                        return "Exito"
                    })
                    .catch(console.log)

            });
        }

        return await peticion();
    }

    actualizar_datosContacto = async (id_contacto, data) => {
        const peticion = () => {
            return axios.put(`${this.urls.getUrlPrincipal()}/api/contacto/${id_contacto}/`, data)
                .then((r) => {
                    return r;
                })
                .catch((error) => {
                    if (error.request) {
                        console.log(error.request);
                    }
                })
        }

        return await peticion();
    }


    actualizar_campoExtra = async (id_contacto, campo, nuevo_valor) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/campo-contacto/?contacto=${id_contacto}&campo=${campo.toLowerCase()}`)
                .then((r) => {
                    let relacion_id = r.data.results[0].id;
                    return axios.put(`${this.urls.getUrlPrincipal()}/api/campo-contacto/${relacion_id}/`, {
                        valor: nuevo_valor,
                        campo: campo
                    })
                        .then((r) => {
                            return "Actualizado";
                        })
                        .catch(console.log)

                })
                .catch((e) => { return e })

        }

        return await peticion();
    }

    eliminarContacto = async (id_contacto) => {
        const peticion = () => {
            return axios.delete(`${this.urls.getUrlPrincipal()}/api/contacto/${id_contacto}/`)
                .then((r) => {
                    return r;
                })
                .catch(console.log)
        }

        return await peticion();
    }

    getContactosDelLosGrupos = async (gruposIds) => {
        const peticion = () => {
            return gruposIds.map((id) => {
                return axios.get(`${this.urls.getUrlPrincipal()}/api/grupo-contacto/?grupo=${id}`)
                .then(res => res.data.results)
                .catch(err=> "error")
            });
            
        }
        return await peticion();
    }


}

export default Contactos;