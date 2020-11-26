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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { Row, Col, Input, Button } from 'reactstrap';
import Drop from './Drop';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row_Table(props) {
  const { evento } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment > 
      <TableRow style={open ? {boxShadow:"0px -4px 13px -4px rgba(0,0,0,0.75)" }: {}} className={classes.root} hover >
        <TableCell align="center" >{evento.nombre}</TableCell>
        <TableCell align="center" >{evento.tipo}</TableCell>
        <TableCell align="center" >{evento.categoria}</TableCell>
        {/* Validar estatus */}

        {evento.fecha_estatus === 'pasado' ?
          <TableCell align="center" className="bg-h-danger" ><b>PASADO</b></TableCell>
          :
          <>
            {evento.estatus === "borrador" ?
              <TableCell align="center" className="bg-h-warning" ><b>BORRADOR</b></TableCell>
              :
              <TableCell align="center" className="bg-h-success" ><b>PUBLICADO</b></TableCell>
            }
          </>
        }

        <TableCell>
          <Drop 
            gestionar={props.gestionar}
            reload={props.reload}
            ir={props.ir}
            continuar={props.continuar}
            evento ={props.evento}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable(props) {
  return (
    <>
      {props.eventos.length > 0 ?
        <TableContainer >
          <Table stickyHeader aria-label="collapsible table">
            <TableHead >
              <TableRow>
                <TableCell style={{backgroundColor:"#21f0779c"}} align="center" className="text-white h6 "><b>Nombre</b></TableCell>
                <TableCell style={{backgroundColor:"#21f0779c"}} align="center" className="text-white h6 "><b>Tipo</b></TableCell>
                <TableCell style={{backgroundColor:"#21f0779c"}}align="center" className="text-white h6 "><b>Categoria</b></TableCell>
                <TableCell style={{backgroundColor:"#21f0779c"}}align="center" className="text-white h6 "><b>Estatus</b></TableCell>
                <TableCell style={{backgroundColor:"#21f0779c"}} />
              </TableRow>
            </TableHead>
            <TableBody>

              {props.eventos.map((evento, i) => {
                return (
                  <Row_Table key={i} indx={i} evento={evento}
                    gestionar={props.gestionar}
                    ir={props.ir}
                    reload={props.reload}
                    continuar={props.continuar}
                  />
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