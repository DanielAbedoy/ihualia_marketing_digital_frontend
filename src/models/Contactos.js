import axios from 'axios';
import URLs from './urls';

class Contactos {

    constructor() {
        this.urls = new URLs();
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



    getValorDelCampoDelContacto = async (contactoId) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/campo-contacto/?contacto=${contactoId}`)
                .then((res) => {
                    return res.data.results
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


    getContactosDelLosGrupos = async (gruposIds) => {
        const peticion = () => {
            return gruposIds.map((id) => {
                return axios.get(`${this.urls.getUrlPrincipal()}/api/grupo-contacto/?grupo=${id}`)
                    .then(res => res.data.results)
                    .catch(err => "error")
            });

        }
        return await peticion();
    }

    nuevoCampoValor = (id_contacto, campo, valor) => {
        return axios.post(`${this.urls.getUrlPrincipal()}/api/post/campo-contacto/`,
            { contacto: id_contacto, valor: valor, campo: campo })
            .then((r) => r.statusText)
            .catch(err => "error")
    }






    add_campo_grupo = (campo, id_grupo) => {
        return axios.post(`${this.urls.getUrlPrincipal()}/api/post/campo-extra-grupo/`, { grupo: id_grupo, campo_extra: campo })
            .then(r => r.statusText)
            .catch(e => "error")
    }

    set_valor_campo_contacto = (campo, id_contacto, valor) => {
        return axios.post(`${this.urls.getUrlPrincipal()}/api/post/campo-contacto/`, { contacto: id_contacto, campo: campo, valor: valor })
            .then(r => r.statusText)
            .catch(e => "error")
    }

    


    //Nuevos---------------------------------
    getGrupos = (cuenta) => {
        //Peticion get para obtener los datos
        return axios.get(`${this.urls.getUrlPrincipal()}/api/grupo/?cuenta=${cuenta}`)
            .then(res => res.data.results)
            .catch(err => err.response.request);
    }

    getContactosDelGrupo = (grupoId) => {
        return axios.get(`${this.urls.getUrlPrincipal()}/api/contacto/grupo/?grupo=${grupoId}`)
            .then(res => res.data)
            .catch(error => { return { error: error.response.request } })
    }

    add_new_values = (contacto, campos) => {
        return axios.post(`${this.urls.getUrlPrincipal()}/api/campo-contacto/newvalues/`, { contacto: contacto, campos: campos })
            .then(res => res.data)
            .catch(error => { return { error: error.response.request } })
    }

    actualizar_datosContacto = (id_contacto, data) => {
        return axios.put(`${this.urls.getUrlPrincipal()}/api/contacto/${id_contacto}/`, data)
            .then((r) => r.data)
            .catch((error) => {
                if (error.request) {
                    console.log(error.request);
                }
            })
    }

    eliminarContacto = (id_contacto) => {
        return axios.delete(`${this.urls.getUrlPrincipal()}/api/contacto/${id_contacto}/`)
            .then((r) => r)
            .catch(console.log)

    }

    cambiar_nombre_grupo = (id_grupo, nuevo_nombre) => {
        return axios.put(`${this.urls.getUrlPrincipal()}/api/grupo/${id_grupo}/`, { nombre: nuevo_nombre })
            .then(r => r.statusText)
            .catch(err => "error");
    }

    add_campo_extra = (campo, grupo) => {
        return axios.post(`${this.urls.getUrlPrincipal()}/api/campo-extra/addcampo/`, { campo: campo, grupo: grupo })
            .then(r => r.statusText)
            .catch(e => "error")
    }

    crearNuevoContacto = (datos_prin, campos_extra) => {
        return axios.post(`${this.urls.getUrlPrincipal()}/api/contacto/`, datos_prin)
            .then(async resp => {
                if (campos_extra.length > 0) {
                    await this.add_new_values(resp.data.id, campos_extra);
                    return "OK"
                }else return "OK"
                
            })
            .catch(err => err)
    }

    crearGrupo = async (nombreGrupo, idCuenta) => {
        return axios.post(`${this.urls.getUrlPrincipal()}/api/grupo/`, {
            nombre: nombreGrupo,
            cuenta: idCuenta
        })
        .then((res) => res.statusText)
        .catch(err=> err.request)
    }

    remove_grupo = (id_grupo) => {
        return axios.delete(`${this.urls.getUrlPrincipal()}/api/grupo/${id_grupo}/`)
            .then(r => r.statusText)
            .catch(e => "error")
    }

    getContactosGrupos = (grupos) => {
        let str_param = "";
        grupos.forEach(g => str_param += g+"-");
        return axios.get(`${this.urls.getUrlPrincipal()}/api/grupo/contactos/?grupo=${str_param}`)
        .then(r => r.data)
        .catch(e => "error")
    }
    
    getContactosGruposCuenta = (cuenta) => {
        return axios.get(`${this.urls.getUrlPrincipal()}/api/grupo/contactos/?cuenta=${cuenta}`)
        .then(r => r.data)
        .catch(e => "error")
    }
}

export default Contactos;