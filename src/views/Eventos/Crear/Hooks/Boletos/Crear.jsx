import React, { useState } from 'react';
import { Row, Col, Input, Collapse, Button, CustomInput } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';


const Crear = props => {
  const { addToast } = useToasts();

  const [datos, setDatos] = useState({ tipo: "", nombre: "", precio: "", cantidad_total: "", descripcion: "", cantidad_minima: "", cantidad_maxima: "", canal_ventas: "" });


  const setTipoBoleto = (boleto) => {
    switch (boleto) {
      case "gratis":
        setDatos({ ...datos, precio: 0, tipo: boleto })
        break;
      case "pago":
        setDatos({ ...datos, tipo: boleto })
        break;
      case "donacion":
        setDatos({ ...datos, precio: 0, tipo: boleto })
        break;
    }
  }

  const mandarBoleto = () => {

    if (!validar()) return;
    props.setBoleto(datos)
    setDatos({ nombre: "", precio: "", cantidad_total: "", descripcion: "", cantidad_minima: "", cantidad_maxima: "", canal_ventas: "" });

  }

  const validar = () => {

    if (datos.nombre === "" || datos.tipo === "" || datos.precio === "" || datos.cantidad_total === "" || datos.descripcion === "" || datos.cantidad_minima === ""|| datos.cantidad_maxima === "" || datos.canal_ventas === "" || datos.canal_ventas === "Selecciona:") {
      addToast("Debes llenar toda la informacion", { appearance: "info", autoDismiss: true });
      return false;
    }
    if (datos.cantidad_total*1 < datos.cantidad_minima*1 ||
      datos.cantidad_total*1 < datos.cantidad_maxima*1 ||
      datos.cantidad_minima*1 > datos.cantidad_maxima*1) {
      addToast("Las cantidades de boletos no concuerdad", { appearance: "info", autoDismiss: true });
      return false;
    }
    return true;

  }

  return (
    <Row>
      <Col md="12">
        <p className="text-right">
          <span
            style={{ cursor: "pointer" }} onClick={() => props.setAccion("listado")}
          ><b><u> Ver listado</u></b></span>
        </p>
      </Col>
      <Col md="12">
        <Row>
          <Col md="12" className="mb-4">
            <span className="h5 mb-3">Tipo de boleto</span><br />
            <Row>
              <Col md="4" xs="12" className="mx-auto mt-2">
                
                <CustomInput checked={datos.tipo=== "gratis" ?true:false}
                  onChange={() => setTipoBoleto("gratis")}
                  id="exampleCustomSwitch" type="radio" label="Gratis" />
              </Col>
              <Col md="4" xs="12" className="mx-auto">
                <CustomInput checked={datos.tipo=== "pago" ?true:false}
                  onChange={() => setTipoBoleto("pago")}
                  id="exampleCustomSwitch1" type="radio" label="Pago" />
              </Col>
              <Col md="4" xs="12" className="mx-auto">
                <CustomInput checked={datos.tipo=== "donacion" ?true:false}
                  onChange={() => setTipoBoleto("donacion")}
                  id="exampleCustomSwitch2" type="radio"  label="Donación" />
              </Col>
            </Row>

          </Col>

          <Col md="6" xs="12" className="mb-4"> <span className="h5">Nombre</span><br />
            <Input className="mt-2" type="text"
              value={datos.nombre}
              onChange={e => setDatos({ ...datos, nombre: e.target.value })}
            />
          </Col>

          <Col md="6" xs="12" className="mb-4"> <span className="h5">Precio</span><br />
            <Input className="mt-2" type="number" value={datos.precio}
              value={datos.precio}
              readOnly={datos.tipo === "gratis" || datos.tipo === "donacion" ? true : false}
              onChange={e => { if (e.target.value >= 0) setDatos({ ...datos, precio: e.target.value }) }}
            />
          </Col>

          <Col md="6" xs="12" className="mb-4"><span className="h5">Cantidad de boletos para el público</span><br />
            <Input className="mt-2" type="number"
              value={datos.cantidad_total}
              onChange={e => { if (e.target.value >= 0) setDatos({ ...datos, cantidad_total: e.target.value }) }}
            />
          </Col>

          <Col md="6" xs="12" className="mb-4"> <span className="h5">Cantidad mínima de boletos por pedido</span><br />
            <Input className="mt-2" type="number"
              value={datos.cantidad_minima}
              onChange={e => { if (e.target.value >= 0) setDatos({ ...datos, cantidad_minima: e.target.value }) }}
            /></Col>


          <Col md="6" xs="12" className="mb-4"><span className="h5">Cantidad máxima de boletos por pedido</span><br />
            <Input className="mt-2" type="number"
              value={datos.cantidad_maxima}
              onChange={e => { if (e.target.value >= 0) setDatos({ ...datos, cantidad_maxima: e.target.value }) }}
            />
          </Col>
          <Col md="6" xs="12" className="mb-4"><span className="h5">Canal de Adquisicion</span><br />
            <Input className="mt-2" type="select"
              value={datos.canal_ventas}
              onChange={e => { setDatos({ ...datos, canal_ventas: e.target.value }) }}
            >
              <option>Selecciona:</option>
              <option>En linea y en la puerta</option>
              <option>Solo en linea</option>
              <option>Solo en la puerta</option>
            </Input>
          </Col>
        </Row>

        <span className="h5">Descripción</span><br />
        <Input style={{ height: "100px" }} className="mt-2" type="textarea"
          value={datos.descripcion}
          onChange={e => setDatos({ ...datos, descripcion: e.target.value })}
        />

        <Row>
          <Col md="5" xs="12" className="mx-auto mt-4">
            <Button color="success" block onClick={mandarBoleto}  >Agregar Boleto</Button>
          </Col>
        </Row>


      </Col>



    </Row>
  );
}

export default Crear;