import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';

import ImagenUser from '../../components/UserImages.js';
import Modal_Imagen from './components/Modal_Imagen.js';
import Modal_Nombre from './components/Modal_Nombre.js';
import Modal_Usuario from './components/Modal_Usuario.js';
import Modal_Correo from './components/Modal_Correo.js';
import Modal_Password from './components/Modal_Password.js';
import Modelo from '../../models/Marketing.js';

class Perfil extends Component{

  state = {
    usuario: {
      correo: '',
      usuario: '',
      password: '',
      nombre: '',
      tipo: '',
      imagen: '',
      id_cliente:''
    },

    nombre_imagen: ''
  }

  componentDidMount = () => {
    let user = require('store').get('usuario_guardado');
    const nom_img = user.imagen;
    const img = ImagenUser.filter(w => w.nombre === user.imagen)
    user.imagen = img[0].direccion;
    this.setState({ usuario: user, nombre_imagen:nom_img })
  }

  abrir_modal_imagen = e => this.modal_imagen.toggle();
  abrir_modal_nombre = e => this.modal_nombre.toggle();
  abrir_modal_usuario = e => this.modal_usuario.toggle();
  abrir_modal_correo = e => this.modal_correo.toggle();
  abrir_modal_password = e => this.modal_password.toggle();

  actualizar_datos = (usuario_actualizado) => {
    new Modelo().actualizar_usuario(this.state.usuario.correo, usuario_actualizado)
      .then(r => {
        if (r.statusText === "OK") {
          alert("Actualizado con éxito")
          require('store').set('usuario_guardado',r.data);
        };        
        window.location.reload(true);
      })
  }
  

  render(){
    return(
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                
                <p className="h3 p-2"><i className="fa fa-user-o"></i> Mi Perfil</p>
                
              </CardHeader>
              <CardBody>

                <Row>
                  <Col md="12" className="text-center mx-auto" >
                    <hr />
            
                    <span className="h4"><b>{this.state.usuario.tipo}</b></span><br/><br/>

                    <img alt={this.state.usuario.nombre +"-imagen"} src={this.state.usuario.imagen} /><br/>
                    <Badge onClick={this.abrir_modal_imagen} style={{ cursor: "pointer" }} className="mb-4"  color="info">Cambiar </Badge><br/>
                    <Modal_Imagen
                      ref={element => { this.modal_imagen = element }}
                      imagen_actual={this.state.nombre_imagen}
                      usuario={this.state.usuario}
                      event={this.actualizar_datos}
                    />
                    
                    
                    <span className="h4"><b>Nombre: </b> {this.state.usuario.nombre} </span>
                    <Badge onClick={this.abrir_modal_nombre} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br /><br />
                    <Modal_Nombre
                      ref={element => { this.modal_nombre = element }}
                      usuario={this.state.usuario}
                      imagen={this.state.nombre_imagen}
                      event={this.actualizar_datos}
                    />

                    <span className="h4"><b>Usuario: </b> {this.state.usuario.usuario} </span>
                    <Badge onClick={this.abrir_modal_usuario} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br/><br/>
                    <Modal_Usuario
                      ref={element => { this.modal_usuario = element }}
                      usuario={this.state.usuario}
                      imagen={this.state.nombre_imagen}
                      event={this.actualizar_datos}
                    />

                    
                    <span className="h4"><b>Correo: </b> {this.state.usuario.correo} </span>
                    <Badge onClick={this.abrir_modal_correo} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br/><br/>
                    <Modal_Correo
                      ref={element => { this.modal_correo = element }}
                      usuario={this.state.usuario}
                      imagen={this.state.nombre_imagen}
                    />
                    

                    <span className="h4"><b>Contraseña: </b> ******** </span>
                    <Badge onClick={this.abrir_modal_password} style={{ cursor: "pointer" }} color="info"> <i className="fa fa-pencil"></i></Badge><br/><br/>
                    <Modal_Password
                      ref={element => { this.modal_password = element }}
                      usuario={this.state.usuario}
                      imagen={this.state.nombre_imagen}
                      event={this.actualizar_datos}
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
export default Perfil;
