import axios from 'axios';
import URLs from './urls';

class Marketing {


    constructor() {
        this.urls = new URLs();
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
    
    

}

export default Marketing;