import React, { Component } from "react";
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';


class GrupoNuevo extends Component {


    state = {
        nombre_grupo_nuevo:'',
    }

    click = () => {
        this.props.action(this.state.nombre_grupo_nuevo);
        
        let campo = document.getElementById("campo_grupo");
        campo.value = '';
    }

    render() {
        return (
            <Form xs="12" sm="12" >
                <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="fa fa-users"></i>
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="campo_grupo" placeholder="Nombre del grupo " autoComplete="gruponame"
                        onChange={(e) => { this.setState({nombre_grupo_nuevo:e.target.value})}}
                    />
                </InputGroup>
                <Button onClick={this.click} color="success" block>Agregar grupo</Button>
            </Form>
        );
    }
}

export default GrupoNuevo;
