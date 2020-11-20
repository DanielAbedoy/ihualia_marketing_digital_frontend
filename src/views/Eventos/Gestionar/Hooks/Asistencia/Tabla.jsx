import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

const Tabla = ({ open, setOpen }) => {

  const useStyles = makeStyles({
    container: {
      maxHeight: 540,
      boxShadow:"0px 5px 15px -6px rgba(0,0,0,0.75)"
    },
    head: {
      backgroundColor:"red"
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
              <TableCell className="text-white" style={{backgroundColor:"#08F7FE"}}><b>Asistente</b></TableCell>
              <TableCell className="text-white" style={{backgroundColor:"#08F7FE"}} align="right"><b>Boletos Adquiridos</b> </TableCell>
              <TableCell className="text-white" style={{backgroundColor:"#08F7FE"}} align="right"><b>Ganancia</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow>
              <TableCell component="th" scope="row" >
                Jose Daniel Abedoy 
              </TableCell>
              <TableCell align="right">145 boletos</TableCell>
              <TableCell align="right">$5656.00 MNX</TableCell>
            </TableRow>

          </TableBody>
        </Table>
        </TableContainer>
      </Col>

      <Col md="12" className="border border-dark my-4"></Col>

    </Row>
  );
}

export default Tabla;