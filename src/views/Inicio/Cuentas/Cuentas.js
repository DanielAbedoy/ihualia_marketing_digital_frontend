import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

import CardStandar from '../../../components/CardStandar.js';

class Cuentas extends Component {

    state = {
        cuenta: [
            { nombre: "Cuenta 1" },
            { nombre: "Cuenta 2" },
            { nombre: "Cuenta 3" },
            { nombre: "Cuenta 4" },
            { nombre: "Cuenta 5" },
            { nombre: "Cuenta 6" },
            { nombre: "Cuenta 7" },
            { nombre: "Cuenta 8" },
        ]
    }


    render() {
        return (
            <Row>
                {this.state.cuenta.map((c, i) => {
                    return (
                        <>
                            <CardStandar
                                class="card-user text-white"
                                colLg="4" colMd="4" colSm="6" colXs="12"
                                key={i}
                                contenidoHeader={
                                    <>
                                        <h5 className="title">{c.nombre}</h5>
                                        <p className="description">Algun texto</p>
                                    </>
                                }
                                contenidoBody={
                                    <>
                                        <p className="description text-center text-dark">
                                            "Lamborghini Mercy Your chick she so thirsty I'm in that two seat Lambo"
                               </p>
                                        <Button color="info" className="px-4 mx-auto" >Trabajar</Button>
                                    </>
                                }

                            />

                        </>
                    );
                })}
            </Row>
        );
    }

}

export default Cuentas;