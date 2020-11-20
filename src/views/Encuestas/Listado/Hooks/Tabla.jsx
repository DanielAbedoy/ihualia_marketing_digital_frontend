import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

import Drop from './Drop';

const Tabla = ({ encuestas, history , reload}) => {

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
      <Col md="12">
        <TableContainer className={classes.container} >
          <Table stickyHeader>
            <TableHead >
              <TableRow>
                <TableCell className="text-white" style={{ backgroundColor: "#FF8000" }}><b>Encuesta</b></TableCell>
                <TableCell className="text-white" style={{ backgroundColor: "#FF8000" }} align="center"><b>Estatus</b> </TableCell>
                <TableCell className="text-white" style={{ backgroundColor: "#FF8000" }} align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {encuestas.map((i, k) => {
                return (
                  <TableRow key={k}>
                    <TableCell component="th" scope="row" >
                      {i.nombre}
                    </TableCell>
                    <TableCell className={`text-white ${i.estatus === "borrador" ? "bg-h-warning" : i.estatus === "publicado" ? "bg-h-success" : "bg-h-danger"}`}
                      align="center">{i.estatus.toUpperCase()}</TableCell>
                    <TableCell align="center">
                      <Drop reload={reload} history={history} encuesta={i} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Col>
    </Row>
  );
}

export default Tabla;