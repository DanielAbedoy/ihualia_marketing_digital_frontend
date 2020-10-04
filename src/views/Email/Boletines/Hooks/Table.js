import React, { useState } from 'react';


const Table = ({ boletines, event_gestionarBoletin }) => {

  const onGestionarBoletin = (e,boletin) => {
    e.preventDefault();

    event_gestionarBoletin(boletin);
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
            <th scope="col">Envios</th>
            <th scope="col">Mas</th>
          </tr>
        </thead>
        <tbody>
          {boletines.map((boletin, indx) => {
            return (
              <tr key={indx}>
                <th scope="row">{boletin.id}</th>
                <td>{boletin.asunto}</td>
                <td>{boletin.estatus}</td>
                <td>{boletin.fecha_creado}</td>
                <td>{boletin.ids_contactos ? boletin.ids_contactos.split(",").length - 1 : "0"}</td>
                <td><i onClick={e => { onGestionarBoletin(e, boletin) }} id="1" className="fa fa-cog border rounded bg-primary p-1" style={{ cursor: "pointer" }}></i></td>
              </tr>
            );

          })}

          {boletines.length > 0 ?
            <tr >
              <th scope="row"></th>
              <td ><b>Total Boletines:</b></td>
              <td> {boletines.length}</td>
              <td><b>Total Envios:</b></td>
              <td>59 </td>
            </tr>
            :
            <></>
          }

        </tbody>
      </table>
    </div>
  );
}


export default Table;