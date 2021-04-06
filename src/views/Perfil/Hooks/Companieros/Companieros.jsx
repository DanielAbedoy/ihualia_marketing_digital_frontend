import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

import Drop from './Drop';

import ModeloMarketing from '../../../../models/Marketing';

const Companieros = ({ myselfID, cliente }) => {

  const [compas, setCompas] = useState([]);

  const useStyles = makeStyles({
    container: {
      maxHeight: 540,
      boxShadow: "0px 5px 15px -6px rgba(0,0,0,0.75)"
    },
    head: {
      backgroundColor: "red"
    }
  });
  const classes = useStyles();

  useEffect(() => {
    new ModeloMarketing().get_usuarios_cliente(cliente)
      .then(users => {
        setCompas(users.filter(u => u.id != myselfID));
      })
  }, [])

  return (
    <Row className="mt-4">
      <Col md="12">
        <p className="h4 mb-4"><b>Mis compañeros</b></p>

        <Row>
          <TableContainer className={classes.container} >
            <Table stickyHeader>
              <TableHead >
                <TableRow>
                  <TableCell className="text-white" style={{ backgroundColor: "#333333" }}><b>Nombre</b></TableCell>
                  <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center"><b>Usuario</b> </TableCell>
                  <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="right"><b>Correo</b></TableCell>
                  <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="right"><b>Tipo</b></TableCell>
                  <TableCell style={{ backgroundColor: "#333333" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {compas.map((u, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="center">{u.nombre}</TableCell>
                      <TableCell align="center">{u.usuario}</TableCell>
                      <TableCell align="center">{u.correo}</TableCell>
                      <TableCell align="center">{u.tipo}</TableCell>
                      <TableCell align="center">
                        <Drop usuario={u} />
                      </TableCell>
                    </TableRow>
                  );
                })}

              </TableBody>
            </Table>
          </TableContainer>
        </Row>

      </Col>
    </Row>
  );
}

export default Companieros;