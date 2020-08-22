import React, { Component } from 'react';
import { Row, Col, Input, Collapse, Badge, Button } from 'reactstrap';


import Variables from '../../../../variables/global.js';

class InformacionBasica extends Component {

  state = {
    nombre: "",
    tipo: "",
    categoria: "",
    sub_categoria: '',
    organizador_cuenta: '',
    sub_categorias: [],
    etiquetas: [],

    tag: '',
    toggle_info_basica: true,
  }

  seleccion_categoria = (e) => {
    e.preventDefault();
    let cat = [];
    if (e.target.value !== "Categoria:") {
      let a = new Variables().categorias_evento().filter(c => c.name == e.target.value);
      cat = a[0].sub_cat;
    }
    this.setState({ categoria: e.target.value, sub_categorias: cat });
  }

  añadir_tag = e => {
    let arr = this.state.etiquetas.slice()
    if (arr.length === 5) return;
    arr.push(this.state.tag);
    this.setState({ etiquetas: arr, tag: '' }, () => {
      document.getElementById('txt_tags').value = '';
    })

  }

  eliminar_tag = e => {
    e.preventDefault();
    const arr = this.state.etiquetas.filter(etiqueta => etiqueta != e.target.id);
    this.setState({ etiquetas: arr })

  }

  validar = () => {
    //Datos iniciales
    const cate = document.getElementById("cbox_categoria").value;
    const sub_cate = document.getElementById("cbox_sub_categoria").value;

    if (this.state.nombre === '' ||
      this.state.tipo === '' ||
      this.state.tipo === 'Tipo:' ||
      cate === 'Categoria:' ||
      sub_cate === 'Sub Categoria:'
    ) {
      alert("Debe llenar toda la información básica");
      return false;
    }
    if (this.state.etiquetas.length === 0) {
      if (window.confirm("¿ Seguro que no agregaras tags a el evento ?")) {
        return true;
      }
      return false;
    }


    return true;

  }

  get_datos = () => {

    if (!this.validar()) return undefined;

    return {
      nombre: this.state.nombre,
      tipo: this.state.tipo,
      categoria: this.state.categoria,
      sub_categoria: this.state.sub_categoria,
      tags: this.state.etiquetas,
      cuenta: this.state.organizador_cuenta,
      etiquetas: this.state.etiquetas,
    }
  }

  reiniciar = () => {
    this.setState({
      nombre: "",
      tipo: "",
      categoria: "",
      sub_categoria: '',
      organizador_cuenta: '',
      sub_categorias: [],
      etiquetas: [],

      tag: '',
      toggle_info_basica: true,
    }, () => {
      document.getElementById("nombre").value = ""
      document.getElementById("tipo").value = "Tipo:";
      document.getElementById("cbox_categoria").value = "Categoria:";
      document.getElementById("cbox_sub_categoria").value = "Sub Categoria:";
      document.getElementById("txt_tags").value = "";
    })
  }


  render() {
    return (
      <Col md="9" xs="12" className="mx-auto">
        <p className="h3 mb-4">
          <b> <i className="fa fa-align-left"></i> Información Básica</b>
          <i
            className={`fa fa-${this.state.toggle_info_basica === false ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => this.setState({ toggle_info_basica: !this.state.toggle_info_basica })}
          ></i>
        </p>
        <Collapse isOpen={this.state.toggle_info_basica} >
          <Row>
            <Col md="9" xs="12" className="mx-auto">
              <span className="h5">Nombre del evento</span>
              <Input id="nombre" className="mt-2" type="text" placeholder="...."
                onChange={e => this.setState({ nombre: e.target.value })}
              /><br />

              <span className="h5">Tipo</span><br />
              <Input id="tipo" className="mt-2" type="select"
                onChange={e => this.setState({ tipo: e.target.value })}>
                <option >Tipo:</option>
                {new Variables().tipos_evento().map((evento, indx) => {
                  return (
                    <option key={indx}>{evento}</option>
                  )
                })}
              </Input>
              <br />

              <span className="h5">Categoria</span><br />
              <Input id="cbox_categoria" className="mt-2" type="select" placeholder="...." onChange={this.seleccion_categoria}
              >
                <option>Categoria:</option>
                {new Variables().categorias_evento().map((categoria, i) => {
                  return (
                    <option key={i} id={categoria.name}>{categoria.name}</option>
                  );
                })}
              </Input><br />

              <span className="h5">Sub categoria</span><br />
              <Input id="cbox_sub_categoria" className="mt-2" type="select" placeholder="...."
                onChange={e => this.setState({ sub_categoria: e.target.value })}
              >
                <option>Sub Categoria:</option>
                {this.state.sub_categorias.map((sub, i) => {
                  return (
                    <option key={i} id={sub}>{sub}</option>
                  );
                })}
              </Input><br />

              <Row>
                <Col md="12" className="text-center">
                  <span className="h5">Etiquetas (5 máximo)</span><br />
                </Col>
                <Col md="9" xs="12">
                  <Input id="txt_tags" className="mt-2 mb-2" type="text" placeholder="palabras clave para tu evento"
                    onChange={e => this.setState({ tag: e.target.value })}
                  />
                </Col>
                <Col md="3" xs="6" className="mx-auto">
                  <Button color="success" block className="mt-2 mb-2" onClick={this.añadir_tag} > Añadir </Button>
                </Col>
                <Col md="12">
                  <Row>
                    {this.state.etiquetas.map((etiqueta, indx) => {
                      return (
                        <Col key={indx} className="mx-auto m-2">
                          <Badge color="light" className="d-block"> {etiqueta}
                            {" "}<i style={{ cursor: "pointer" }}
                              className="fa fa-times p-1 ml-2"
                              id={etiqueta}
                              onClick={this.eliminar_tag}
                            ></i>
                          </Badge>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
              <br />
              <span className="h5">Nombre del Organizador</span><br />
              <Input className="mt-2" type="text" placeholder={require('store').get('cuenta_en_uso').nombre} disabled={true}
                onChange={e => this.setState({ organizador_cuenta: e.target.value })}
              /><br />

            </Col>
          </Row>
        </Collapse>
      </Col>
    );
  }
}

export default InformacionBasica;