import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

const Tabla = ({ open, setOpen, arrAsistentes, asistentes, precio }) => {

  const useStyles = makeStyles({
    container: {
      maxHeight: 340,
      boxShadow: "0px 5px 15px -6px rgba(0,0,0,0.75)"
    },
    head: {
      backgroundColor: "red"
    }
  });
  const classes = useStyles();

  const [info, setInfo] = useState([]);

  useEffect(() => {
    acomodarInfo();
  }, [arrAsistentes])

  const acomodarInfo = () => {
    let i = [];
    arrAsistentes.forEach(a => {
      let asis = asistentes.find(as => as.id == a.asistencia);
      i.push({ asistente: <p className="m-0" >{asis.nombre}<br />{asis.correo}</p>, cantidad: a.cantidad, ganancia: ((a.cantidad * 1) * precio) })
    })
    setInfo(i);
  }

  return (
    <Row>
      <Col md="12">
        <TableContainer className={classes.container} >
          <Table stickyHeader>
            <TableHead >
              <TableRow>
                <TableCell className="text-white" style={{ backgroundColor: "#08F7FE" }}><b>Asistente</b></TableCell>
                <TableCell className="text-white" style={{ backgroundColor: "#08F7FE" }} align="right"><b>Boletos Adquiridos</b> </TableCell>
                <TableCell className="text-white" style={{ backgroundColor: "#08F7FE" }} align="right"><b>Ganancia</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {info.map((i, k) => {
                return (
                  <TableRow key={k}>
                    <TableCell component="th" scope="row" >
                      {i.asistente}
                    </TableCell>
                    <TableCell align="right">{i.cantidad} boletos</TableCell>
                    <TableCell align="right">${i.ganancia}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Col>

      <Col md="12" className="border border-dark my-4"></Col>

    </Row>
  );
}

export default Tabla;