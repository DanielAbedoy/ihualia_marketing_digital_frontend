import axios from 'axios';
import URLs from './urls';

class Marketing {


    constructor() {
        this.urls = new URLs();
    }

    //Almacenar el Cliente(Empresa) | nombre(persona), razon_socila, direccion, telefono, dominio, giro
    nuevo_cliente = async (datos_cliente, datos_usuario) => {
        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/cliente/`, datos_cliente)
                .then((r) => {
                    datos_usuario.id_cliente = r.data.id_cliente;
                    //Almacenar el Usuario como administrador|  correo, usuario, password, nombre, tipo=Administrador, estatus=Activo, imagen, id_cliente
                    return this.nuevo_usuario(datos_usuario);
                })
                .catch(console.log)
        }

        return await peticion();
    }

    nuevo_usuario = async (datos_usuario) => {
        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/usuario/`, datos_usuario)
                .then((r) => { return r })
                .catch(console.log)
        }

        return await peticion();
    }



    //Retorna la promesa del usuario
    getUsuario = async (user) => {
        const peticionGetUsuario = () => {
            //return axios.get(`http://localhost:8000/api/usuario/?correo=${user}`)
            return axios.get(`${this.urls.getUrlPrincipal()}/api/usuario/?correo=${user}`)
                .then(data => {
                    return data.data[0];
                })
                .catch((error) => {
                    if (error.request) {
                        return error.request.statusText;
                    } else {
                        return "otro"
                    }
                })
        }

        return await peticionGetUsuario();
    }

    get_cuentas_usuario = async (correo_usuario) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/usuario-cuenta/?id_usuario=${correo_usuario}`)
                .then((r) => {
                    return r;
                })
                .catch(console.log)
        }

        return await peticion();
    }

    get_cuenta = async (id_cuenta) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/cuenta/${id_cuenta}/`)
                .then((r) => {
                    return r;
                })
                .catch(console.log)
        }

        return await peticion();
    }


    get_cuentas_cliente = async (id_cliente) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/cuenta/?id_cliente=${id_cliente}`)
                .then((r) => {
                    return r;
                })
                .catch(console.log)
        }

        return await peticion();
    }

    get_usuarios_cliente = async (id_cliente) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/usuario/?id_cliente=${id_cliente}`)
                .then(r => r.data)
                .catch(console.log)
        }

        return await peticion();
    }

    nuevo_usuario_cuenta = async (datos) => {
        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/usuario-cuenta/`,datos)
                .then(r => r)
                .catch(console.log)
        }
        return await peticion();
    }

    actualizar_usuario = async (correo_usuario, datos) => {
        const peticion = () => {
            return axios.put(`${this.urls.getUrlPrincipal()}/api/usuario/${correo_usuario}/`,datos)
                .then( r => r)
                .catch( e => e)
        }
        return await peticion();
    }

    eliminar_usuario = async (correo_usuario) => {
        const peticion = () => {
            return axios.delete(`${this.urls.getUrlPrincipal()}/api/usuario/${correo_usuario}/`)
                .then( r => r)
                .catch()
        }
        return await peticion();
    }

    get_usuarios_cuentas = async (id_cuenta) => {
        const peticion = () => {
            return axios.get(`${this.urls.getUrlPrincipal()}/api/usuario-cuenta/?id_cuenta=${id_cuenta}`)
                .then( r => r)
                .catch(console.log)
        }
        return await peticion();
    }

    nueva_cuenta = async (datos) => {
        const peticion = () => {
            return axios.post(`${this.urls.getUrlPrincipal()}/api/cuenta/`,datos)
                .then(r => r)
                .catch(console.log)
        }
        return await peticion();
    }

    actualizar_cuenta = async (id_cuenta, datos) => {
        const peticion = () => {
            return axios.put(`${this.urls.getUrlPrincipal()}/api/cuenta/${id_cuenta}/`,datos)
                .then(r => r)
                .catch(e => e)
        }
        return await peticion();
    }

    eliminar_cuenta = async (id_cuenta) => {
        const peticion = () => {
            return axios.delete(`${this.urls.getUrlPrincipal()}/api/cuenta/${id_cuenta}/`)
                .then(r => r)
                .catch(e => e)   
        }
        return await peticion();
    }

    desvincular_usuario_cuenta = async (id_cuenta, correo_usuario) => {
        const peticion=()=>{
            return axios.get(`${this.urls.getUrlPrincipal()}/api/usuario-cuenta/?id_usuario=${correo_usuario}&id_cuenta=${id_cuenta}`)
                .then(r => r.data[0].id)
                .then(id => axios.delete(`${this.urls.getUrlPrincipal()}/api/usuario-cuenta/${id}/`))
                .then(r => r)
                .catch(e => e)
        }

        return await peticion();
    }

}

export default Marketing;