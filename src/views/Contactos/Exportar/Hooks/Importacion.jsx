import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';

import CSVReader from 'react-csv-reader';

import ModelContactos from '../../../../models/Contactos';

const ImportacionComponent = props => {

  const [campos, setCampos] = useState(["nombre", "correo"]);
  const [contactos, setContactos] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    getCampos();
  }, [])

  const getCampos = async () => {
    setCampos([...campos.slice(), ...props.grupo.campos_extra]);
  }

  const cargarArchivo = (data, fileInfo) => {
    data.pop();
    //Coincidencia de cabeceras
    const headers = data[0];
    if (!validarHeadres(headers)) {
      alert("Deben ser las mismas cabeceras");
      return;
    }
    //Acomodar los datos en objetos y mandarlos a la tabla
    let contactos = [];
    data.forEach((contacto, n_c) => {
      if (n_c === 0) return;
      let obj = {};
      headers.forEach((h, i) => obj = { ...obj, [`${h.toLowerCase()}`]: contacto[i] })
      contactos.push(obj);
    })
    //Mostrarlos en una tabla
    setContactos(contactos);
    //Agregar todos los usuarioas
  }

  //Validar Headres
  const validarHeadres = (headers) => {
    let resp = true;
    if (headers.length !== campos.length) return false;
    campos.forEach(campo => {
      let f = false;
      headers.forEach(h => {
        if (campo.toLowerCase() === h.toLowerCase()) f = true;
      })
      if (!f) resp = false;
    })
    return resp;
  }

  const agregarContactos = async (e) => {
    e.preventDefault();

    contactos.forEach(async(contacto,i) => {
      const data_prin = { nombre: contacto.nombre, correo: contacto.correo, grupo: props.grupo.id };
      let campos_extra = [];
      for (let i = 2; i < campos.length; i++) campos_extra.push({ campo: campos[i], valor: contacto[`${campos[i]}`] });
      const response = await new ModelContactos().crearNuevoContacto(data_prin, campos_extra);
      if (response === "OK") addToast(`Sea a ingresado correctamente ${data_prin.nombre}`,{appearance:"success",autoDismiss:true});
      else addToast(`Error al ingresar a ${data_prin.nombre}`,{appearance:"error",autoDismiss:true});
    })
  }


  return (
    <>
      <Row>
        <Col md="8" xs="12" className="mx-auto">
          <p className="h4"><b>③ Importar contactos</b></p>
          <br />
          <p className="h5">El ducumento .CSV debera contener las siguientes cabeceras (No importa el orden)</p>


          {campos.map((campo, i) => {
            return (
              <React.Fragment key={i} ><span className="text-muted ml-2">- {campo.toUpperCase()} </span><br /></React.Fragment>
            );
          })}

          {contactos.length > 0 ? <></> :
            <Row className="mt-3">
              <Col lg="12" md="12" sm="12" xs="12" className="mx-auto border border-dark rounded">
                <p className="mx-auto h5">Selecciona el archivo .csv</p>
                <div className="input-group">
                  <div className="custom-file">
                    <CSVReader onFileLoaded={cargarArchivo} />
                  </div>
                </div>
              </Col>
            </Row>}

        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg="11" md="11" sm="12" xs="12" className="bg-white mx-auto">
          {/* Aqui estara la trabla cuando se importen los contactos */}

          {contactos.length > 0 ? <>
            <div className={"table-responsive table-bordered table-hover"} >
              <table className="table text-center">
                <thead>
                  <tr style={{backgroundColor:"rgba(44,96,186,0.75)"}}>
                    {campos.map((campo, i) => {
                      return (
                        <th key={i}>{campo.toUpperCase()}</th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {contactos.map((contacto, i) => {
                    return (
                      <tr key={i}>
                        {campos.map((c, j) => {
                          return (<td key={j}>{contacto[c]}</td>);
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Row>
              <Col md="6" xs="12" className="mx-auto mt-3">
                <Button color="success" block onClick={agregarContactos}> Agregar Contactos </Button>
              </Col>
            </Row>
          </>
            :
            <></>
          }

        </Col>
      </Row>
    </>
  );
}

export default ImportacionComponent;