import React,{useState} from 'react';
import { Row, Col, Collapse, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import ModelMarketing from '../../../models/Marketing';

const Edit = ({ open, setOpen, datos, setDatos, cancel }) => {

  const { addToast } = useToasts();
  const [va, setValues] = useState({razon_social:"", dominio:"",direccion:"",telefono:"", giro:""});

  const validar = () => {
    const d = datos;
    if (d.razon_social === "" || d.dominio === "" || d.direccion === "" || d.telefono === "" || d.giro === "") {
      addToast("No debe quedar ningun campo vacio", { appearance: "info", autoDismiss: true });
      cancel();
      return false;
    }
    return true;
  }

  const darValues = (campo, value) => {
    setValues({ ...va, [campo]: value })
    setDatos(campo,value)
  }

  const clean = () => {
    setValues({ razon_social: "", dominio: "", direccion: "", telefono: "", giro: "" });
    cancel();
    setOpen();
  }

  const actualizar = async () => {
    if (!validar()) return;
    const d = datos;
    const resp = await new ModelMarketing().actualizar_empresa(d.id, { razon_social: d.razon_social, direccion: d.direccion, telefono: d.telefono, dominio: d.dominio, giro: d.giro });

    if (resp.statusText === "OK") {
      addToast("Actualizado correctamente", { appearance: "success", autoDismiss: true });
      clean();
    } else {
      clean();
      addToast("Algo ocurrio mal", { appearance: "error", autoDismiss: true });
    }

  }

  return (
    <Row>
      <Col md="12">
        <Collapse isOpen={open} >

          <Row className="my-3 border-top py-2">
            <Col md="12">
              <p className="h5"><b>Edita los datos guarda los cambios</b></p>
            </Col>
            <Col md="12" className="my-2 d-flex flex-column">
              <div className="rounded-circle p-5 shadow-lg mx-auto mb-2"></div>
              <p className="text-center m-0"><b className="cursor-p">Cambiar Logo</b></p>
            </Col>

            <Col md="12" className="mt-2">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}><b><i className="fa fa-building-o"></i></b></InputGroupText>
                </InputGroupAddon>
                <Input value={va.razon_social} placeholder={datos.razon_social} onChange={e=>darValues("razon_social", e.target.value)} />
              </InputGroup>
              <br/>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}><b><i className="fa fa-globe"></i></b></InputGroupText>
                </InputGroupAddon>
                <Input value={va.dominio} placeholder={datos.dominio} onChange={e=>darValues("dominio", e.target.value)} />
              </InputGroup>
              <br/>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}><b><i className="fa fa-map-marker"></i></b></InputGroupText>
                </InputGroupAddon>
                <Input value={va.direccion} placeholder={datos.direccion} onChange={e=>darValues("direccion", e.target.value)} />
              </InputGroup>
              <br/>
            </Col>

            <Col md="6" xs="12" className="mb-2">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}><b><i className="fa fa-mobile"></i></b></InputGroupText>
                </InputGroupAddon>
                <Input  value={va.telefono} placeholder={datos.telefono}  onChange={e=>darValues("telefono", e.target.value)}/>
              </InputGroup>
              
            </Col>

            <Col md="6" xs="12" className="mb-2">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-white" style={{backgroundColor:"#333333"}}><b><i className="fa fa-institution"></i></b></InputGroupText>
                </InputGroupAddon>
                <Input value={va.giro} placeholder={datos.giro} onChange={e=>darValues("giro", e.target.value)}/>
              </InputGroup>
            </Col>


          </Row>


          <Row className="mt-3">
            <Col md="12" >
              <Row >
                <div onClick={() => actualizar()} className="ml-auto px-3 btn-h bg-h-primary text-white">
                  <i className="fa fa-floppy-o"></i> Guardar
                </div>
                <div onClick={() => clean()} className="ml-2 px-3 btn-h bg-h-danger text-white">
                  <i className="fa fa-ban"></i> Cancelar
                </div>
              </Row>
            </Col>
          </Row>

        </Collapse>
      </Col>
    </Row >
  );

}

export default Edit;