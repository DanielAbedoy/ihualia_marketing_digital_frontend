import React from 'react';
import { Row, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

import Drop from './Drop';

const Tabla = ({ usuarios, history }) => {

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

  return (
    <Row>
      <TableContainer className={classes.container} >
        <Table stickyHeader>
          <TableHead >
            <TableRow>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }}><b>Nombre</b></TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center"><b>Usuario</b> </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center">Correo </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center">Estatus </TableCell>
              <TableCell style={{ backgroundColor: "#333333" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {usuarios.map((u, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{u.nombre}</TableCell>
                  <TableCell>{u.usuario}</TableCell>
                  <TableCell>{u.correo}</TableCell>
                  <TableCell>{u.estatus}</TableCell>
                  <TableCell align="center">
                    <Drop usuario={u} history={history} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Row>
  );
}

export default Tabla;