import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

const Tabla = ({ open, setOpen, arrAsistentes, precio }) => {

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
      i.push({
        asistente: <p className="m-0" >{a.nombre}<br />{a.correo}</p>,
        cantidad: a.boletos_cantidad,
        ganancia: ((a.boletos_cantidad * 1) * precio)
      })
    })
    setInfo(i);
  }

  return (
    <Row>
      <Col md="12">
        {arrAsistentes.length !== 0 ?
        <TableContainer className={classes.container} >
        <Table stickyHeader>
          <TableHead >
            <TableRow>
              <TableCell className="text-white" style={{ backgroundColor: "#21f0779c" }}><b>Asistente</b></TableCell>
              <TableCell className="text-white" style={{ backgroundColor: "#21f0779c" }} align="right"><b>Boletos Adquiridos</b> </TableCell>
              {precio !== 0 ?
                <TableCell className="text-white" style={{ backgroundColor: "#21f0779c" }} align="right"><b>Ganancia</b></TableCell>
                : <></>
              }
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
                  {precio !== 0 ?
                    <TableCell align="right">${i.ganancia}</TableCell>
                    : <></>
                  }

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
          </TableContainer>
          : <>
            <p className="text-center h4"><b>No hay datos para mostrar</b></p>
          </>    
      }
      </Col>

      <Col md="12" className="border my-4"></Col>

    </Row>
  );
}

export default Tabla;