import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import urls from '../../../../../models/urls';

const Orden = ({ carrito, total, datos, url }) => {

  const format_corrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });

  const monts = ["Ene", "Feb", "Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  const acomodarFechaHora = fecha => {
    if (!fecha) return "";
    let f = fecha.split("T");
    let f2 = f[0].split("-")
    
    let h = f[1].split("-");
    let hora = h[0];

    return `${hora} ${f2[2]}/${monts[f2[1]-1]}/${f2[0]}`

  }

  return (
    <Row style={{ height: "100%" }} className="align-items-center">

      {carrito.length > 0 ?
        <Col md="12" className="d-flex flex-column align-items-center x">
          <p className="h5 text-center text-muted m-0"><b>{datos.titulo}</b></p>
          <p className="text-muted text-center m-0">{acomodarFechaHora(datos.fecha_ini)} </p>
          <p className="text-muted text-center">{acomodarFechaHora(datos.fecha_fin)} </p>
          <p className="h3 text-center mb-3"><b>Orden de Compra</b></p>
          {carrito.map((articulo, i) => {
            return (
              <div key={i} style={{ width: "100%" }} className="px-3">
                <p className="text-muted m-0"><span className="text-left">{articulo.title}</span> <span className="float-right">{format_corrency.format(articulo.monto)}</span></p>
              </div>
            );
          })}
          <hr />
          <p className="text-right"><b>Total: {!total ? format_corrency.format(0) : format_corrency.format(total)}</b></p>
        </Col>
        :
        <Col md="12" className={`d-flex flex-column align-items-center p-3 ${carrito.length > 0 ? "boder border-bottom mt-2" : ""}`}>
          <p className="h5 text-center m-0"><b>{datos.titulo}</b></p>
          <p className="text-muted text-center m-0">{acomodarFechaHora(datos.fecha_ini)} </p>
          <p className="text-muted text-center m-0">{acomodarFechaHora(datos.fecha_fin)} </p>
          <br />
          <img className="shadow rounded"  src={`${new urls().supporserver()}/ev/getimg/?imagen=${datos.img}&evento=${datos.evento}`} width="68%" alt={datos.titulo} />
          <br />
          <p className="text-center">{datos.descripcion}</p>

          <Link className="float-right align-self-end mt-3" to={`/evento/${url}`} ><u><b>Ir al evento</b></u></Link>
        </Col>

      }

    </Row>
  );
}

export default Orden;