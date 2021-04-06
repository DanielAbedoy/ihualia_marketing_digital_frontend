import React, {useState, useEffect} from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import ImagenUser from '../../../../components/UserImages.js';
import CambiarPassword from './CambiarPassword.jsx';

import ModelMarkeeting from '../../../../models/Marketing';

const Edit = ({ edit, setEdit, _datos, setContext, history}) => {

  const [datos, setDatos] = useState({  imagen: "", nombre: "", correo: "", usuario: "", descripcion: "" });
  const [user, setUser] = useState("");
  const [openPass, setOpenPass] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (_datos.nombre === "") return;
    const d = _datos;
    setUser(d.id);
    setDatos({ imagen: d.imagen, nombre: d.nombre, correo: d.correo, usuario: d.usuario, descripcion: d.descripcion });
  },[_datos])

  const validar = () => {
    if (datos.nombre === "" || datos.correo === "" || datos.usuario === "" || datos.descripcion === "") {
      addToast("Ningun campo debe estar vacio", { appearance: "info", autoDismiss: true });
      return false;
    }
    return true;
  }

  const guardar = async () => {
    if(!validar()) return;

    const d = datos;
    const resp = await new ModelMarkeeting().actualizar_user(user, { nombre: d.nombre, correo: d.correo, usuario: d.usuario, descripcion: d.descripcion })
    if (!resp.data.error) {
      addToast("Actualizado correctamente", { appearance: "success", autoDismiss: true });
      setContext();
      setEdit(!edit);
    }else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
  }

  return (
    <Row className="pt-3 border-top">
      <Col md="12">
        <Row>

          <Col md="6" xs="12" className="d-flex flex-column px-3 justify-content-center">
            {/* IMAGEN  CORREO */}

            <img src={datos.imagen} width="20%" alt="img-profile" className="mx-auto mb-2 rounded shadow" />
            <p className="text-center"><b className="cursor-p">Cambiar</b></p>
          </Col>

          <Col md="6" xs="12" className="d-flex flex-column px-3 justify-content-center mt-1">
            {/* NOMBRE USUARIO CONTRASEÑA */}
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="text-white" style={{ backgroundColor: "#333333" }}>
                  <b><i className="fa fa-male"></i></b></InputGroupText>
              </InputGroupAddon>
              <Input placeholder={datos.nombre} onChange={e => setDatos({ ...datos, nombre: e.target.value })} />
            </InputGroup>
            <br/>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
              <InputGroupText className="text-white" style={{ backgroundColor: "#333333" }}>
                  <b><i className="fa fa-user"></i></b></InputGroupText>
              </InputGroupAddon>
              <Input placeholder={datos.usuario} onChange={e => setDatos({ ...datos, usuario: e.target.value })} />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">
              <InputGroupText className="text-white" style={{ backgroundColor: "#333333" }}>
                  <b>@</b></InputGroupText>
              </InputGroupAddon>
              <Input placeholder={datos.correo} onChange={e => setDatos({ ...datos, correo: e.target.value })} />
            </InputGroup>
            <br />
            
            <p className="text-center mt-auto mb-0"><b onClick={()=>setOpenPass(!openPass)} className="cursor-p">Cambiar contraseña</b></p>
            <CambiarPassword open={openPass} setOpen={(p) => setOpenPass(p)} />
          </Col>
          <Col md="12" className="mt-3 border-top d-flex flex-column px-3">
            {/* DESCRIPCION */}
            <p className="my-2"><b>Mi descripción</b></p>
            <Input type="textarea" style={{height:"220px"}} 
              value={datos.descripcion} onChange={e => setDatos({ ...datos, descripcion: e.target.value })}
            />
          </Col>
        </Row>

        
        <Row className="mt-3">
        <div onClick={guardar} className={`ml-auto btn-h p-2 text-white bg-h-primary`}>
            <i className={`fa fa-floppy-o`}></i> Guardar
          </div>
          <div onClick={()=>setEdit(!edit)} className={`ml-2 btn-h p-2 text-white bg-h-danger`}>
            <i className={`fa fa-ban`}></i> Cancelar
          </div>
        </Row>
      </Col>
    </Row>
  );
}

export default Edit;