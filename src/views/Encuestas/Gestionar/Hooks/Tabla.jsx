import React, { useState, useEffect } from 'react';
import urls from '../../../../models/urls';

const Tabla = ({ n, encuestados, anonima, ponderacion, tipo, encuesta }) => {

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    if (encuestados.length === 0) return;
    let arr = [];
    encuestados.forEach(e => {
      const obj = JSON.parse(e.respuestas_json);
      arr.push({ n: e.id, nombre: e.nombre, correo: e.correo, r: obj[`${n}`] });
    });
    setDatos([...arr]);
  }, [encuestados])

  return (
    <>
      <div className="table-responsive" style={{ width: "100%", maxHeight: "450px" }}>
        <table className="table table-hover">
          <thead>
            <tr style={{ backgroundColor: "orange", color:"white" }}>
              {anonima ? <th scope="col">Encuestado #</th> : <th scope="col">Encuestado</th>}
              <th scope="col">Respuesta</th>
              {ponderacion ? <th scope="col">Estatus</th> : <></>}
            </tr>
          </thead>
          <tbody>

            {datos.map((encuestado, i) => {
              const arrValues = [];
              if (typeof encuestado.r.respuesta === "object") {
                for (const res in encuestado.r.respuesta) {
                  if (encuestado.r.respuesta[res]) arrValues.push(`${res}`);
                }
              }
              return (
                
                <tr key={i} >
                  {anonima ? <td scope="col">{encuestado.n}</td> : <td scope="col"><p className="text-center m-0">{encuestado.nombre}<br />{encuestado.correo}</p></td>}
                  <td scope="col">
                    {typeof encuestado.r.respuesta !== "object" ?
                      encuestado.r.respuesta
                      :
                      <>
                        {arrValues.map((re, j) => {
                          return (

                            <React.Fragment key={j}>
                              {tipo === "texto" ?
                                `${re}`
                                :
                                <img width="100%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${encuesta}&imagen=${re}`}/>
                              }
                              <br />
                            </React.Fragment>
                          )
                        })}
                      </>
                    }
                  </td>
                  {ponderacion ? <td scope="col">{encuestado.r.estatus.toUpperCase()}</td> : <></>}
                </tr>
              );
            })}

            
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tabla;