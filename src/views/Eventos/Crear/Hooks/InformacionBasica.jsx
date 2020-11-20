import React, { useState } from 'react';
import { Row, Col, Input, Collapse, Badge, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import ModelEventos from '../../../../models/Eventos';
import Variables from '../../../../variables/global';

const InformacionBasica = props => {

  const [evento, setEvento] = useState('');
  const { addToast } = useToasts();
  const [open, setOpen] = useState(true);
  const [sub_categorias, setSubCategorias] = useState([]);
  const [tag, setTag] = useState('');

  const [datos, setDatos] = useState({ nombre: '', tipo: '', categoria: '', subcategoria: '' });
  const [etiquetas, setEtiquetas] = useState([]);

  const seleccion_categoria = (e) => {
    e.preventDefault();
    let cat = [];
    if (e.target.value !== "Categoria:") {
      let a = new Variables().categorias_evento().filter(c => c.name == e.target.value);
      cat = a[0].sub_cat;
    }
    setDatos({ ...datos, categoria: e.target.value, subcategoria: "" });
    setSubCategorias(cat)
  }

  const validar = () => {
    const cate = document.getElementById("cbox_categoria").value;
    const sub_cate = document.getElementById("cbox_sub_categoria").value;
    if (datos.nombre === '' || datos.tipo === '' || datos.tipo === 'Tipo:' || cate === 'Categoria:' || sub_cate === 'Sub Categoria:') return false;

    if (etiquetas.length === 0) {
      if (window.confirm("¿ Seguro que no agregaras tags a el evento ?")) return true;
      return false;
    }
    return true;
  }

  const crear = async () => {

    if (!validar()) return addToast("Debes agregar toda la informacion", { appearance: 'info', autoDismiss: true })

    const cuenta = require('store').get("cuenta_en_uso").id;
    const resp = await new ModelEventos().crear_evento(datos.nombre, datos.tipo, datos.categoria, datos.subcategoria, "borrador", cuenta)

    if (resp.statusText === "Created") {
      
      if (etiquetas.length > 0)  await new ModelEventos().add_etiquetas(resp.data.id, etiquetas)
      addToast("Guardado con exito", { appearance: "success", autoDismiss: true })
      props.setEvento(resp.data)
      setOpen(false);
      setEvento(resp.data);
    } else addToast(`Error: ${resp}`, { appearance: "error", autoDismiss: true })


  }

  const modificar = async () => {
    if (!validar()) return addToast("Debe estar toda la informacion", { appearance: 'info', autoDismiss: true })

    const resp = await new ModelEventos().modificar_evento(evento.id,
      { nombre: datos.nombre, tipo: datos.tipo, catogria: datos.categoria, sub_categoria: datos.subcategoria }
    )
    await new ModelEventos().add_etiquetas(evento.id, etiquetas)

    if (resp.statusText === "OK") {
      addToast("Modificado con exito", { appearance: "success", autoDismiss: true })
      props.setEvento(resp.data)
      setOpen(false);
      setEvento(resp.data);
    } else addToast(`Error: ${resp}`, { appearance: "error", autoDismiss: true })
  }

  return (
    <Col md="9" xs="12" className="mx-auto">
      <p className="h3 mb-4">
        <b> <i className="fa fa-align-left"></i> Información Básica</b>
        {evento !== "" ?
          <i
            className={`fa fa-${!open ? "chevron-down" : "chevron-up"} float-right p-1`}
            style={{ cursor: "pointer" }}
            onClick={e => setOpen(!open)}
          ></i> : <></>
        }
      </p>
      <Collapse isOpen={open} >
        <Row>
          <Col md="9" xs="12" className="mx-auto">
            <span className="h5">Nombre del evento</span>
            <Input id="nombre" className="mt-2" type="text" placeholder="...."
              onChange={e => setDatos({ ...datos, nombre: e.target.value })}
            /><br />

            <span className="h5">Tipo</span><br />
            <Input id="tipo" className="mt-2" type="select"
              onChange={e => setDatos({ ...datos, tipo: e.target.value })}
            >
              <option >Tipo:</option>
              {new Variables().tipos_evento().map((evento, indx) => {
                return (
                  <option key={indx}>{evento}</option>
                )
              })}
            </Input>
            <br />

            <span className="h5">Categoria</span><br />
            <Input id="cbox_categoria" className="mt-2" type="select" placeholder="...."
              onChange={seleccion_categoria}
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
              onChange={e => setDatos({ ...datos, subcategoria: e.target.value })}
            >
              <option>Sub Categoria:</option>
              {sub_categorias.map((sub, i) => {
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
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                />
              </Col>
              <Col md="3" xs="6" className="mx-auto">
                <Button color="success" block className="mt-2 mb-2"
                  onClick={() => { if (etiquetas.length < 5 && tag !== "") setEtiquetas([...etiquetas.slice(), tag]); setTag('') }}
                > Añadir </Button>
              </Col>
              <Col md="12">
                <Row>
                  {etiquetas.map((etiqueta, indx) => {
                    return (
                      <Col key={indx} className="mx-auto m-2">
                        <Badge color="light" className="d-block"> {etiqueta}
                          {" "}<i style={{ cursor: "pointer" }}
                            className="fa fa-times p-1 ml-2"
                            id={etiqueta}
                            onClick={() => { setEtiquetas(etiquetas.filter(et => et != etiqueta)) }}
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
            <Input className="mt-2" type="text" placeholder={require('store').get('cuenta_en_uso') ? require('store').get('cuenta_en_uso').nombre : ""} disabled={true}
            /><br />

          </Col>
          <Col md="12">
            <Row>
              <Col md="4" xs="8" >
                <Button color={evento !== "" ? "info" : "success"} block
                  onClick={evento !== '' ? modificar : crear} >{evento !== "" ? "Modificar" : "Continuar"} </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Collapse>
      <Row><Col md="12" className="border border-light my-3"></Col></Row>
    </Col>
  );
}

export default InformacionBasica;