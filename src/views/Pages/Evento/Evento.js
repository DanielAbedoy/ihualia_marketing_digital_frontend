import React, { Component } from 'react';
import { Row, Col, Button, Badge } from 'reactstrap';

import Header from '../../../containers/EventoLayout/Header';
import Footer from '../../../containers/EventoLayout/Footer';

import Load from '../../../components/Load';
import ImageContent from './components/ImageContent'
import SidePrincipal from './components/SidePrincipal'
import SideInfo from './components/SideInfo'
import InfoContent from './components/InfoContent'
import FixedPlugin from './components/FixedPlugin'
import ModalBoletos from './components/Asistencia/ModalBoletos';
import EventoModel from '../../../models/Eventos';
import MarketingModel from '../../../models/Marketing';

class Evento extends Component {

  state = {

    found: false,

    id_evento:'',

    nombre: '',
    tipo: '',
    categoria: '',
    sub_categoria: '',
    tipo_ubicacion: '',
    zona_horaria: '',
    directorio_imagen: '',
    nombre_imagen: '',
    resumen: '',

    //Fechas
    fecha_inicio: '',
    hora_inicio: '',
    fecha_fin: '',
    hora_fin:'',


    //Por si es lugar
    direccion1: '',
    direccion2 : '',
    ciudad : '',
    estado : '',
    codigo_postal: '',
    pais : '',
    latitud : 0,
    longitud: 0,

    //Por si es online
    link: '',

    //Mas
    etiquetas:[],
    parrafos: [],
    imagenes: [],
    videos: [],
    boletos:[],

    organizador: '',
    id_cliente: '',
    id_cuenta: '',

    url_share:''


  }


  componentDidMount = () => {

    const parsed = require('query-string').parse(this.props.location.search);
    if (!parsed.event) {
      this.props.history.push('/404')
      return;
    }

    this.get_info_event(parsed.event);
    this.setState({url_share:`http://app.ihualia.com.mx/evento/?event=${parsed.event}` })
  }


  get_info_event = (id_evento) => {

    new EventoModel().get_info_basica(id_evento)
      .then(r => {
        if (r === "error") {
          this.props.history.push('/404');
          return;
        };
        return r.data;
      })
      .then(r => {
        const id_evento = r.id;
        let date_ini = r.fecha_hora_inicio.split("T");
        let fecha_ini = r.fecha_hora_inicio.split("T")[0];
        let hora_ini = date_ini[1].split("-")[0];

        let date_fin = r.fecha_hora_fin.split("T");
        let fecha_fin = r.fecha_hora_fin.split("T")[0];
        let hora_fin = date_fin[1].split("-")[0];

        this.setState({
          id_evento: id_evento,
          nombre_imagen: r.nombre_imagen, nombre: r.nombre, resumen: r.resumen, tipo_ubicacion: r.tipo_ubicacion,
          fecha_inicio: fecha_ini, fecha_fin: fecha_fin, hora_inicio: hora_ini, hora_fin: hora_fin,
          found:true
        })

        this.get_nombre_organizador(r.id_cuenta);
        this.get_etiquetas(id_evento);
        if (r.tipo_ubicacion === 'lugar') this.get_lugar(id_evento);
        else this.get_link(id_evento);

        this.get_parrafos(id_evento);
        
        


        this.get_boletos(id_evento);

      }).catch(e => e)

  }

  get_nombre_organizador = (id_cuenta) => {
    new MarketingModel().get_cuenta(id_cuenta)
      .then(r => r.data)
      .then(datos =>this.setState({id_cliente: datos.id_cliente, organizador:datos.nombre,id_cuenta:datos.id}))
      
  }

  get_etiquetas = (id_evento) => {
    new EventoModel().get_tags_evento(id_evento)
      .then(etiquetas => this.setState({etiquetas:etiquetas}))
  }

  get_lugar = (id_evento) => {
    new EventoModel().get_lugar_evento(id_evento)
      .then(l => this.setState({ direccion1: l[0].direccion1, direccion2: l[0].direccion2, codigo_postal: l[0].codigo_postal, ciudad: l[0].ciudad,  estado: l[0].estado, pais: l[0].pais, latitud: l[0].latitud, longitud: l[0].longitud}))
  }

  get_link = (id_evento) => {
    new EventoModel().get_online_evento(id_evento)
      .then(lugar => this.setState({ link: lugar[0].link }))
  }

  get_parrafos = (id_evento) => {
    new EventoModel().get_parrafos_evento(id_evento)
      .then(parrafos => {
        this.setState({ parrafos: parrafos }, () => {
          this.get_imagenes(id_evento);
        })
      })
  }
  get_imagenes = (id_evento) => {
    new EventoModel().get_imagenes_evento(id_evento)
      .then(imagenes => {
        this.setState({ imagenes: imagenes }, () => {
          this.get_videos(id_evento);
        })
      })
  }
  get_videos = (id_evento) => {
    new EventoModel().get_videos_evento(id_evento)
      .then(videos => {
        this.setState({ videos: videos }, () => {
          this.contenedor_info.acodar_componentes();
        })
      })
  }

  get_boletos = (id_evento) => {
    new EventoModel().get_boletos_evento(id_evento)
      .then(boletos => {
        
        boletos.forEach(boleto => this.get_cantidades_boletos(boleto));
        
      })
  }

  get_cantidades_boletos = boleto => {
    
    new EventoModel().get_boleto(boleto.id)
      .then(datos => {
        const cantidad_total = parseInt(datos.cantida_total);
        const cantidad_maxima = parseInt(datos.cantidad_maxima);
        new EventoModel().get_cantidad_boletos_vendidos(boleto.id)
          .then(boletos => {
            let cantidad = 0;
            boletos.forEach(b => {
              cantidad += parseInt(b.cantidad, 10);
            });
          
            //Algoritmo para saber la cantidad a mostrar
            const cantidad_gnrl = cantidad_total - cantidad;
            let cantidad_a_mostrar = 0;
            if (cantidad_gnrl < cantidad_maxima) cantidad_a_mostrar = cantidad_gnrl;
            else cantidad_a_mostrar = cantidad_maxima;

            boleto.cantidad_a_mostrar = cantidad_a_mostrar;
            let arr = this.state.boletos.slice();
            arr.push(boleto);
            this.setState({ boletos: arr });
          })

      })

  }

  open_modal = () => {
    this.modal.toggle();
  }  
  
  render() {
    return (
      
      <div className="evento-container">

        {this.state.found ?
          <>
            <Header
            />
            {/* <SideBar /> */}
            <div className="main-event">

              <Row>
                <Col md="12">
                  <Row>

                    <Col md="8" xs="12" className="">
                      <ImageContent
                        src ={process.env.PUBLIC_URL + `/eventos/${this.state.id_cliente}/${this.state.id_cuenta}/${this.state.nombre_imagen}`}
                      />
                    </Col>


                    <Col md="4" xs="12" className="">
                      <SidePrincipal
                        titulo={this.state.nombre}
                        organizador={this.state.organizador}
                        resumen={this.state.resumen}
                      />
                    </Col>

                    <Col md="12" xs="12">
                      <FixedPlugin
                        
                        evento={this.open_modal}
                        url_share={this.state.url_share}
                      />
                    </Col>
                    <span id="out"></span>
                    <Col md="8" xs="12">
                      <InfoContent 
                        ref={element => { this.contenedor_info = element }}
                        etiquetas={this.state.etiquetas}
                        parrafos={this.state.parrafos}
                        imagenes={this.state.imagenes}
                        videos={this.state.videos}
                        id_cliente={this.state.id_cliente}
                        id_cuenta={this.state.id_cuenta}
                      />
                    </Col>

                    <Col md="4" xs="12" className="">
                      <SideInfo 
                        tipo_ubicacion={this.state.tipo_ubicacion}
                        link = {this.state.link}

                        direccion2={this.state.direccion2}
                        direccion1={this.state.direccion1}
                        codigo_postal={this.state.codigo_postal}
                        ciudad={this.state.ciudad}
                        estado={this.state.estado}
                        pais={this.state.pais}
                        latitud={(this.state.latitud * 1)}
                        longitud={(this.state.longitud * 1)}

                        fecha_inicio={this.state.fecha_inicio}
                        fecha_fin={this.state.fecha_fin}
                        hora_inicio={this.state.hora_inicio}
                        hora_fin={this.state.hora_fin}
                      />
                    </Col>

                  </Row>
                </Col>
              </Row>
            </div>
            <Footer />
          </>
          :
          <>
            <Load />
          </>
        }

        <ModalBoletos
          ref={element => { this.modal = element }}
          id_evento={this.state.id_evento}
          boletos={this.state.boletos}
          titulo={this.state.nombre}
          subtitulo={this.state.resumen}
          organizador={this.state.organizador}
        />

      </div>
    );
  }

}

export default Evento;