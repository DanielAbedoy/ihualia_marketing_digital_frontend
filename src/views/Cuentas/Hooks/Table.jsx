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

const TableHook = ({ cuentas, history }) => {

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
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }}><b>Calve</b></TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="center"><b>Nombre</b> </TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#333333" }} align="right">Estatus </TableCell>
              <TableCell style={{ backgroundColor: "#333333" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuentas.map((c, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.nombre}</TableCell>
                  <TableCell>{c.estatus}</TableCell>
                  <TableCell align="center">
                    <Drop history={history} cuenta={c} />
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

export default TableHook;