import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';


import ModelEncuesta from '../../../models/Encuestas';

import Header from '../../../containers/EncuestaLayout/Header';
import Footer from '../../../containers/EncuestaLayout/Footer';
import Load from '../../../components/Load';

import Inicio from './Hooks/Inicio';
import Despedida from './Hooks/Despedida';
import Preguntas from './Hooks/Preguntas/Preguntas';

class Encuesta extends Component {

  state = {
    inicio: true,
    preguntas: false,
    despedida: false,

    encuesta: {}
  }

  componentDidMount = () => {

    const encuesta_url = this.props.match.params.id;

    new ModelEncuesta().get_encuestaby_url(encuesta_url)
      .then(e => {
        const encuesta = e;
        if (e === "error" || e === undefined) { this.props.history.push('/404'); return; }
        if (encuesta.estatus === "borrador" || encuesta.estatus === "inactivo") { this.props.history.push('/404'); return; }
        this.setState({ encuesta: encuesta });
      })
  }


  render() {
    return (

      this.state.encuesta.id ?
        <Row style={{ height: "100vh" }} className="m-0 p-0 d-flex">
          <Col md="12" className="m-0 p-0 align-self-start">
            <Header />
          </Col>

          <Col style={{minHeight:"90%"}} md="12" className="m-0 p-0">
            {this.state.inicio ?
              <Inicio
                id={this.state.encuesta.id}
                nombre={this.state.encuesta.nombre}
                presentacion={this.state.encuesta.presentacion}
                instrucciones={this.state.encuesta.instrucciones}
                imagen={this.state.encuesta.imagen}
                anonima={this.state.encuesta.anonima}
                continuar={()=> this.setState({inicio:false, preguntas:true})}
              /> : <></>}

            {this.state.preguntas ?
              <Preguntas
                encuesta={this.state.encuesta.id}
                nombre={this.state.encuesta.nombre}
                instrucciones={this.state.encuesta.instrucciones}
                preguntas={JSON.parse(this.state.encuesta.preguntas_json)}
                anonima={this.state.encuesta.anonima}
                paginacion={this.state.encuesta.paginacion}
                puntuacion={this.state.encuesta.ponderacion}
                creado={() => this.setState({ preguntas: false, despedida: true })}
                ir={()=> this.props.history.push(`/encuesta/${this.state.encuesta.url}`) }
              />

              : <></>
            }
            {this.state.despedida ?
              <Despedida
                imagen={this.state.encuesta.imagen}
                ir={() => this.props.history.push(`/encuesta/${this.state.encuesta.url}`)}
                encuesta={this.state.encuesta.id}
                mensage={this.state.encuesta.despedida}
            /> : <></>}

          </Col>

          <Col md="12" className="m-0 p-0 align-self-end">
            <Footer />
          </Col>
        </Row>
        : <Load />
    );

  }

}

export default Encuesta;