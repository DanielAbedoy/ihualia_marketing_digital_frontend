import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';

import urls from '../../../../models/urls';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles({
  container: {
    maxHeight: 540,
  },
  header: {

  }
});


function Row_Table(props) {
  const { respuestas, id, nombre, correo, creado, anonima, preguntas, encuesta } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment >
      <TableRow style={open ? { boxShadow: "0px -4px 13px -4px rgba(0,0,0,0.75)" } : {}} className={classes.root} hover >
        {anonima === true ?
          <TableCell >{id}</TableCell>
          :
          <>
            <TableCell >{nombre} </TableCell>
            <TableCell>{correo}</TableCell>
          </>
        }
        <TableCell align="" >{creado}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow style={open ? { boxShadow: "0px 9px 13px -4px rgba(0,0,0,0.75)" } : {}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10000}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Row className="pt-3 rounded">
              <Col md="9" xs="12" className="mx-auto">

                {preguntas.data.map((pregunta, i) => {

                  const arrValues = [];
                  if (typeof respuestas[pregunta.n].respuesta === "object") {
                    for (const res in respuestas[pregunta.n].respuesta) {
                      if (respuestas[pregunta.n].respuesta[res]) arrValues.push(`${res}`);
                    }
                  }

                  return (
                    <React.Fragment key={i}>
                      {pregunta.subTipo === "texto" ?
                        <p  ><b>{pregunta.n}.- {pregunta.pregunta}</b></p>
                        :
                        <>
                          <p ><b>Pregunta {pregunta.n}.-</b></p>
                          <img width="60%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${encuesta}&imagen=${pregunta.pregunta}`} alt="" />
                          <br />
                        </>
                      }
                      <p className="m-0"><b>Respuesta:</b></p>
                      {typeof respuestas[pregunta.n].respuesta !== "object" ?
                        <p>{respuestas[pregunta.n].respuesta}</p>
                        :
                        <>
                          {arrValues.map((re, j) => {
                            return (
                              <React.Fragment key={j}>
                                {pregunta.tipo !== "imageselector" ?
                                  `${re}`
                                  :
                                  <img width="50%" src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${encuesta}&imagen=${re}`} />
                                }
                                <br />
                              </React.Fragment>
                            )
                          })}
                        </>
                      }

                      {preguntas.ponderacion === true ?
                        <>
                          <p className="m-0"><b>Estatus:</b></p>
                          <p>{respuestas[pregunta.n].estatus.toUpperCase()}</p>
                        </>
                        :null
                      }

                      <p className="border "></p>
                    </React.Fragment>
                  );
                })}
              </Col>
            </Row>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const Encuestados = ({ open, setOpen, encuestados, anonima, preguntas, encuesta }) => {

  
  const classes = useStyles();

  return (
    <Modal size="lg" isOpen={open} toggle={() => setOpen(!open)}>
      <ModalHeader toggle={() => setOpen(!open)}>
        <Row>
          <Col md="12">
            <p className="h3 m-0"><b>Encuestados</b></p>
            <p className="text-muted m-0"><b>Observa las respuestas de los encuestados</b></p>
          </Col>
        </Row>
      </ModalHeader>
      <ModalBody>
        <Row className="mt-3 px-lg-5 px-xs-2">
          <Col md="12">
            <TableContainer className={classes.container} >
              <Table stickyHeader aria-label="collapsible table">
                <TableHead >
                  <TableRow className="py-3" >
                    {anonima === true ?
                      <TableCell className="text-white" style={{backgroundColor:"orange"}} >Encuestado</TableCell>
                      :
                      <>
                        <TableCell className="text-white" style={{backgroundColor:"orange"}}>Nombre </TableCell>
                        <TableCell className="text-white" style={{backgroundColor:"orange"}}>Correo</TableCell>
                      </>
                    }
                    <TableCell className="text-white" style={{backgroundColor:"orange"}}>Fecha</TableCell>
                    <TableCell className="text-white" style={{backgroundColor:"orange"}}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {encuestados.map((e, i) => {
                    return (
                      <Row_Table key={i} encuesta={encuesta} preguntas={preguntas} respuestas={JSON.parse(e.respuestas_json)} id={e.id} nombre={e.nombre} correo={e.correo} creado={e.creado} anonima={anonima} />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default Encuestados;