import React, { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { SessionContext } from '../../../../sessionContext';

import Edit from './Edit';

const Show = ({ history, setContext }) => {

  const userContext = useContext(SessionContext);
  const [edit, setEdit] = useState(false);
  const [datos, setDatos] = useState({ id: "", correo: "", estatus: "", imagen: "", nombre: "", tipo: "", usuario: "", descripcion: "" });

  useEffect(() => {
    const getInfo = async () => {
      let info = await userContext.user();
      setDatos({ ...info });
    }
    getInfo();
  }, [])

  useEffect(() => {
    const getInfo = async () => {
      let info = await userContext.user();
      setDatos({ ...info });
    }
    getInfo();
  }, [userContext])

  return (
    <Row className="mt-4">
      <Col md="12">
        <p className="h4 mb-4"><b>Mis datos</b></p>

        {!edit ?
          <>
            <table className="table">
              <tbody>

                <tr>
                  <th scope="row">Clave única</th>
                  <th>{datos.id}</th>
                </tr>

                <tr>
                  <th scope="row">Nombre</th>
                  <td>{datos.nombre}</td>
                </tr>

                <tr>
                  <th scope="row">Usuario</th>
                  <td>{datos.usuario}</td>
                </tr>

                <tr>
                  <th scope="row">Correo</th>
                  <td>{datos.correo}</td>
                </tr>

                <tr>
                  <th scope="row">Empleo</th>
                  <td>{datos.tipo}</td>
                </tr>
              </tbody>
            </table>

            <p className="h5 my-4"><b>Descripcion sobre mi</b></p>

            <Row >
              <Col md="12">
                <p className="m-0">{datos.descripcion === "" ? "No hay descripcion aún" : datos.descripcion}</p>
              </Col>
            </Row>

          </>
          :
          <Edit edit={edit} setEdit={setEdit} _datos={datos} history={history} setContext={setContext} />
        }

        {!edit &&
          <Row className="mt-3">
            <div onClick={() => setEdit(!edit)} className={`ml-auto btn-h p-2 text-white bg-h-info`}>
              <i className={`fa fa-pencil-square-o`}></i> Editar
            </div>
          </Row>
        }
      </Col>
    </Row>
  );
}

export default Show;