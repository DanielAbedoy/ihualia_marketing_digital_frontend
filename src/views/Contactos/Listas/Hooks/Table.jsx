import * as React from 'react';
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
import TextField from '@material-ui/core/TextField';


import { Row, Col, Input, Button } from 'reactstrap';

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
  const { contacto, campos, event_Delete, event_Update } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [newContacto, setDataNew] = React.useState({});

  const updateContacto = (e, contacto) => {
    e.preventDefault();
    event_Update(contacto);
  }

  const deleteContacto = (e, contacto) => {
    e.preventDefault();
    event_Delete(contacto);
  }

  return (
    <React.Fragment >
      <TableRow style={open ? { boxShadow: "0px -4px 13px -4px rgba(0,0,0,0.75)" } : {}} className={classes.root} hover >
        <TableCell component="th" scope="row">{contacto.id}</TableCell>
        <TableCell align="center">{contacto.nombre}</TableCell>
        <TableCell align="center">{contacto.correo}</TableCell>

        {props.campos.map((campo, i) => {

          if (i > 2) {
            const valor = contacto[`${campo}`];
            return (
              <TableCell key={i} align="center">{valor}</TableCell>
            );
          }
        })}

        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow style={open ? { boxShadow: "0px 9px 13px -4px rgba(0,0,0,0.75)" } : {}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Row className="pt-3 rounded">
              <Col md="12">
                <p className="h5 m-0"> <b>Gestionar el contacto</b> </p>
                <p className="text-muted"> <b>Actualiza o elimina el contacto</b> </p>
              </Col>
              <Col md="12" className="mx-auto m-0 p-0 border border-light"></Col>
              <Col md="9" xs="12" className="mx-auto">
                <Row  >
                  

                  {campos.map((campo, j) => {
                    if (j > 0) {
                      return (
                        <Col key={j} md="6" className="mb-2 ">
                          {/* <span className="h6">{campo.toUpperCase()}</span>
                          <Input
                            onChange={e => setDataNew({...newContacto, [campo.toLowerCase()]: e.target.value })}
                            type="text" placeholder={contacto[`${campo.toLowerCase()}`]}
                          /> */}
                          <TextField
                            placeholder={contacto[`${campo.toLowerCase()}`]}
                            onChange={e => setDataNew({ ...newContacto, [campo.toLowerCase()]: e.target.value })}
                            size="small" className="my-2" style={{ width: "100%" }} label={campo.toUpperCase()} />
                        </Col>
                      );
                    }
                  })}
                  <Col md="2" xs="6" className="ml-auto">
                    <br />
                    <span className="h2 bg-danger rounded d-block text-white px-3 text-center"
                      style={{ cursor: "pointer" }}
                      onClick={e => { deleteContacto(e, contacto) }}
                    ><b><i className="fa fa-trash"></i>  </b></span>
                  </Col>
                  <Col md="2" xs="6" className="">
                    <br />
                    <span className="h2 bg-info d-block rounded text-white px-3 text-center"
                      style={{ cursor: "pointer" }}
                      onClick={e => { updateContacto(e, { datos_antes: contacto, datos_nuevos: newContacto }) }}
                    ><b><i className="fa fa-pencil"></i>  </b></span><br />
                  </Col>

                </Row>
              </Col>
            </Row>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable(props) {

  const classes = useStyles();

  return (
    <>
      {props.contactos.length > 0 ?
        <TableContainer className={classes.container} >
          <Table stickyHeader aria-label="collapsible table">
            <TableHead >
              <TableRow className="bg-primary">
                {props.campos.map((campo, indx) => {
                  return (
                    <TableCell align="center" key={indx} className="text-white h6 bg-primary"><b>{campo.toUpperCase()}</b></TableCell>
                  );
                })}
                <TableCell className="bg-primary" />
              </TableRow>
            </TableHead>
            <TableBody>

              {props.contactos.map((contacto, i) => {
                return (
                  <Row_Table key={i} indx={i} contacto={contacto} campos={props.campos} event_Update={props.event_Update} event_Delete={props.event_Delete} />
                );
              })}

            </TableBody>
          </Table>
        </TableContainer>
        : <></>
      }
    </>
  );
}