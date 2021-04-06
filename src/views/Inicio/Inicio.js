import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Row, Button } from 'reactstrap';
import axios from 'axios';
import auth from '../../auth';

//CardStandar
import Load from '../../components/Load.js';


//Routes Views

class Inicio extends Component {

  loading = () => <Load />


  prueba = () => {
   /* axios.get("http://loacalhost:8000/api/grupo/contactos/?grupo=2&grupo=3")
      .then(console.log)
      .catch(console.log) */
    
    
    
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
                
                <div className="bg-h-primary btn-h" onClick={this.get_algo} >Vamos a eelo</div>
                <br/>
                <div className="bg-h-success btn-h" onClick={this.get_refresh} >Vamos a eelo</div>
                <div className="bg-h-info btn-h" >Vamos a eelo</div>
                <br/>
                <div className="bg-h-warning btn-h" >Vamos a eelo</div>

                <br/>
                <div className="bg-h-danger btn-h" onClick={this.print}>Vamos a eelo</div>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Inicio;
