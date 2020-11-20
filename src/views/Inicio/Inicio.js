import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Row, Button } from 'reactstrap';
import axios from 'axios';

//CardStandar
import Load from '../../components/Load.js';


//Routes Views

class Inicio extends Component {

  loading = () => <Load />


  prueba = () => {
   /*  axios.post("http://localhost:8000/api/campo-extra/addcampo/",
      {
        campo: "joyas",
        grupo:"2"
        
      })
      .then(console.log)
      .catch(console.log) */

      axios.post("http://localhost:8000/api/asistente-evento/add/",
        {
          infoPrincipal: { evento:"24",correo: "josedaniel@lide.com", nombre: "Mi nombre", telefono: "555555", metodo_pago: "no", monto_total: "no", estatus_pago: "pagado" },
          boletos: [{ cantidad: "2", id:"4" },{ cantidad: "4", id:"5" },],
          donacion: { are: true, monto: "100" },
          //detalles:{are:true, data:{tipo:"oxxo", referencia:"sdadasdasdsd"}}
          detalles:{are:true, data:{tipo:"card", id_pago:"sdadasdasdsd", id_orden:"dsfsdfsdfsdf"}}
          
      })
      .then(console.log)
      .catch(console.log)
    
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={12}>
            <Card className="text-white bg-secondary">
              <CardHeader>
                <h3 className="title">Inicio</h3>
                <p className="category">Comienze a trabajar!</p>
              </CardHeader>
              <CardBody>
                
              <Button className="bg-h-success" onClick={this.prueba}>gfh</Button>
                
                <div className="bg-h-primary btn-h" >Vamos a eelo</div>
                <br/>
                <div className="bg-h-success btn-h" >Vamos a eelo</div>
                <div className="bg-h-info btn-h" >Vamos a eelo</div>
                <br/>
                <div className="bg-h-warning btn-h" >Vamos a eelo</div>

                <br/>
                <div className="bg-h-danger btn-h" >Vamos a eelo</div>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Inicio;
