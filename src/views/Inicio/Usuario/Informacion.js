import React, { Component } from 'react';
import { Row  } from 'reactstrap';

import CardStandar from '../../../components/CardStandar.js';

import logo from '../../../assets/img/users/imgUser_1.png';

class Informacion extends Component {

    render() {
        return (
            <Row>
                <CardStandar
                    class="card-user mx-auto"
                    colLg="8" colMd="8" colSm="12" colXs="12"
                    contenidoHeader={
                        <div className="author">
                            <center>
                                <img alt="..."
                                    className="avatar border-gray"
                                    src={logo}
                                />
                                <h5 className="title">Nombre del Usuario</h5>
                                <p className="description">Cuenta: Samsung</p>
                            </center>
                        </div>
                    }
                    contenidoBody={
                        <>
                            <p className="description text-center text-dark">
                                "Lamborghini Mercy <br />
                                Your chick she so thirsty <br />
                                I'm in that two seat Lambo"
                        </p>
                        </>
                    }
                />
            </Row>
        );
    }

}

export default Informacion;