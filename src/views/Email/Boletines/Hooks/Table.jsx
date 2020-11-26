import React, { useState } from 'react';
import Drop from './Drop';


const Table = ({ boletines, event_gestionarBoletin,history }) => {

  const getTotalEnvios = () => {
    let len = 0;
    boletines.forEach(boletin => {
      if (!boletin.envios[0]) return;
      const envObj = JSON.parse(boletin.envios[0]);
      let contactos = envObj.contactos_enviados.split(",");
      len += (contactos.length - 1);
    });
    return len;
  }
  
  const getNEnvios = envios => {
    if (!envios[0]) return 0;
    const envObj = JSON.parse(envios[0]);
    let contactos = envObj.contactos_enviados.split(",");
    return contactos.length - 1;
  }

  return (
    <div style={{ maxHeight: "65vh", minHeight:"65vh" }} className="table-responsive">
      <table className="table table-hover">
        <thead className="bg-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Asunto</th>
            <th scope="col">Estatus</th>
            <th scope="col">Fecha</th>
            <th scope="col">Enviados</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {boletines.map((boletin, indx) => {
            return (
              <tr key={indx}>
                <th scope="row">{boletin.id}</th>
                <td>{boletin.asunto}</td>
                <td className={boletin.estatus.toLowerCase() === "enviado" ? "bg-success" : boletin.estatus.toLowerCase() === "borrador" ? "bg-warning" : "bg-danger"} >{boletin.estatus.toUpperCase()}</td>
                <td>{boletin.fecha_creado}</td>
                {/* <td>{getNEnvios(boletin.envios)}</td> */}
                <td>0</td>
                <td>
                  <Drop
                    boletin={boletin}
                    event_gestionarBoletin={event_gestionarBoletin}
                    history={history}
                  />
                </td>
              </tr>
            );

          })}

          {/* {boletines.length > 0 ?
            <tr >
              <th scope="row"></th>
              <td ><b>Total Boletines:</b></td>
              <td> {boletines.length}</td>
              <td><b>Total Envios:</b></td>
              <td>{getTotalEnvios()} </td>
            </tr>
            :
            <></>
          } */}

        </tbody>
      </table>
    </div>
  );
}


export default Table;