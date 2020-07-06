import React, { Component } from "react";
import { Row,Col,Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


class NuevoCampo extends Component {

    state = {
        valCampo: ""
    }

    enviar = (e) => {
        e.preventDefault();
        this.props.action(this.state.valCampo)

        let inp = [...document.getElementsByTagName("input")];
        inp.map((inpu) => inpu.value = "");
    }


    render() {
        return (
            <Row>
                <Col lg="7" md="7" sm="12" xs="12" className="mx-auto">
                    <Form>
                        <p className="text-dark float-left h4">Añade un campo nuevo</p>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fa fa-plus"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input className="text-center" type="text" placeholder="Nombre del campo nuevo " autoComplete="camponuevo"
                                onChange={(e) => { this.setState({ valCampo: e.target.value }); }}
                            />
                        </InputGroup>
                        <Button onClick={this.enviar} color="info" block>Agregar campo al grupo</Button>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default NuevoCampo;
