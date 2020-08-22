import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Col, Row, Input, CustomInput, Form } from 'reactstrap';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import ModalComlpeteStatus from './ModalCompleteStatus';
import FichaOxxo from './FichaOxxoPay/FichaOxxoPay';

import Model_Eventos from '../../../../../models/Eventos';


class ModalConfirmarAsistencia extends Component {

  state = {
    modal: false,

    donaciones: false,
    donacion: 0,
    total: 0,

    correo: '',
    pay_method: '',

    nombre: '',
    phone: '',

    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',

    component_complete: ''
  }


  format_currency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2

  });

  toggle = () => {
    let f = false;
    this.props.articulos.forEach(a => {
      if (a.tipo === 'donacion') f = true;
    })
    this.setState({ modal: !this.state.modal, pay_method: '', donaciones: f, total: this.props.total })
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  add_donacion = e => {

    if (e.target.value === '') this.setState({ donacion: 0 });
    else {
      let d = this.props.total + parseInt(e.target.value, 10);
      this.setState({ total: d, donacion: parseInt(e.target.value, 10) });
    }

  }

  validar = () => {
    let exp_reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (this.state.nombre === '' || this.state.phone === '') {
      alert("Se deben agregar todos los datos")
      return false;
    }

    if (!exp_reg.test(this.state.correo)) {
      alert("Se debe agregar un correo real")
      return false;
    }

    if (this.state.total !== 0) {
      if (this.state.pay_method === '') {
        alert("Se debe seleccionar un método de pago")
        return false;
      }
      if (this.state.pay_method === 'card') {
        if (this.state.number === '' ||
          this.state.name === '' ||
          this.state.expiry === '' ||
          this.state.cvc === '') {
          alert("Se debe agregar todos los datos de la tarjeta")
          return false;
        }

      }
    }

    return true;
  }

  get_data_cliente = (token_id) => {

    let items_names = '';
    this.props.articulos.forEach(a => items_names += `(id:${a.id}) ` + a.title + "; ");

    if (!token_id) token_id = "";
    const datos = {
      nombre: this.state.name,
      phone: this.state.phone,
      email: this.state.correo,
      items_name: items_names,
      unit_price: (this.state.total * 100),
      token_id: token_id
    }

    return datos;
  }



  pago_oxxo_pay = (r) => {
    console.log(r)

    //Almacenar Datos
    const referencia = r.charges.data[0].payment_method.reference;
    const barcode = r.charges.data[0].payment_method.barcode_url;
    const cmp = <Col lg="8" md="8" sm="9" xs="12" className="p-0 mx-auto"> <FichaOxxo organizador={this.props.organizador} referencia={referencia} barcode={barcode} monto={this.format_currency.format((r.amount / 100))} />  </Col>;

    this.guardar_datos(r.charges.data[0].payment_method, undefined);

    this.setState({ component_complete: cmp }, () => {
      this.modal_complete.toggle();
    });
  }

  pago_card = (r) => {
    //Almacenar Datos
    const data = r.charges.data[0];
    this.guardar_datos(undefined, data);
    const cmp = (
      <>
        <Col md="8" xs="10" className="mx-auto mt-3 mb-3 border-top border-bottom">
          <p className="text-center h4">Aqui pueden ir algunos datos del pago</p>
          <p className="text-center h5"><b>Id: </b> {data.id}</p>
          <p className="text-center h5"><b>Orden: </b> {data.order_id}</p>
          <p className="text-center h5"><b>Monto: </b> {this.format_currency.format((data.amount / 100))} MXN</p>
          <p className="text-center h5"><b>Tipo de Tajeta: </b>{data.payment_method.type.toUpperCase()} / {data.payment_method.brand.toUpperCase()} /  {data.payment_method.account_type}</p>
          <p className="text-center h5"><b>Tajeta: </b> .....{data.payment_method.last4}</p>
        </Col>
      </>
    );
    this.setState({ component_complete: cmp }, () => {
      this.modal_complete.toggle();
    });
  }

  guardar_datos = (oxxo_pay, card_pay) => {

    let estatus = '';
    if (card_pay !== undefined) estatus = 'pagado';
    else if (oxxo_pay !== undefined) estatus = 'por pagar';
    else estatus = 'pagado';

    new Model_Eventos().add_asistente_evento(this.state.correo, this.state.nombre, this.state.phone,
      this.state.pay_method, this.state.total + "", estatus, this.props.id_evento)
      .then(datos => {
        if (datos.id) {
          const promises = [];
          //Guardar items
          this.props.articulos.forEach(a => promises.push(new Model_Eventos().add_boleto_asistente_evento(datos.id, a.id, a.cantidad)));
          //Donacion
          if (this.state.donaciones) promises.push(new Model_Eventos().add_donacion_evento(datos.id, this.state.donacion + ""));
          //Detalles oxxo
          if (oxxo_pay !== undefined) promises.push(new Model_Eventos().add_detalles_oxxo_evento(datos.id, oxxo_pay.reference));
          else if (card_pay !== undefined) promises.push(new Model_Eventos().add_detalles_card_evento(datos.id, card_pay.id, card_pay.order_id));


          Promise.all(promises)
            .then(responses => {
              //Mostrar componente de agregado sino esxiste ningun pago
              if (oxxo_pay === undefined && card_pay === undefined) {
                const cmp = (
                  <>
                    <Col md="8" xs="10" className="mx-auto mt-3 mb-3 border-top border-bottom">
                      <p className="text-center h4">Aqui pueden ir algunos mensaje</p>
                      <p className="text-center h5">Todo se ha almacenado correctamnete</p>
                    </Col>
                  </>
                );
                this.setState({ component_complete: cmp }, () => {
                  this.modal_complete.toggle();
                });
              }

            })
            .catch(console.log)

        }
      })
      .catch(console.log)

  }



  /* guardar_datos = (oxxo_pay, card_pay) => {

    let estatus = '';
    if (card_pay !== undefined) estatus = 'pagado';
    else if (oxxo_pay !== undefined) estatus = 'por pagar';
    else estatus = 'pagado';

    new Model_Eventos().add_asistente_evento(this.state.correo, this.state.nombre, this.state.phone,
                                            this.state.pay_method, this.state.total +"", estatus, this.props.id_evento)
      .then(datos => {
        if (datos.id) {

          const promises = [];

          //Guardar items
          this.props.articulos.forEach(a => new Model_Eventos().add_boleto_asistente_evento(datos.id,a.id,a.cantidad));

          //Donacion
          if (this.state.donaciones) new Model_Eventos().add_donacion_evento(datos.id, this.state.donacion + "");
          //Detalles oxxo
          if (oxxo_pay !== undefined) new Model_Eventos().add_detalles_oxxo_evento(datos.id, oxxo_pay.reference);
          else if (card_pay !== undefined) new Model_Eventos().add_detalles_card_evento(datos.id,card_pay.id,card_pay.order_id)

          //Mostrar componente de agregado sino esxiste ningun pago
          if (oxxo_pay === undefined && card_pay === undefined) {
            const cmp = (
              <>
                <Col md="8" xs="10" className="mx-auto mt-3 mb-3 border-top border-bottom">
                  <p className="text-center h4">Aqui pueden ir algunos mensaje</p>
                  <p className="text-center h5">Todo se ha almacenado correctamnete</p>
                </Col>
              </>
            );
            this.setState({ component_complete: cmp }, () => {
              this.modal_complete.toggle();
            });
          }


        }
      })
      .catch(console.log)
    
  }
 */
  pagar = (e) => {
    e.preventDefault();

    if (this.state.total !== 0) {
      if (!this.validar()) return;

      //Pago en oxxo
      if (this.state.pay_method === 'oxxo') {
        new Model_Eventos().post_oxxo_pay(this.get_data_cliente())
          .then(r => {
            if (r.charges) {
              this.pago_oxxo_pay(r);
            } else {
              alert("Error")
            }
          })

      } else if (this.state.pay_method === 'card') {
        const conekta = window.Conekta;
        conekta.setPublicKey("key_eYvWV7gSDkNYXsmr");
        conekta.setLanguage("es");
        const tokenParams = {
          "card": {
            "number": "4242424242424242",
            "name": "Fulanito Pérez",
            "exp_year": "2020",
            "exp_month": "12",
            "cvc": "123"
          }
        };

        //Creadno el token
        conekta.Token.create(tokenParams, token => {
          new Model_Eventos().post_card_pay(this.get_data_cliente(token.id))
            .then(r => {
              if (r.charges) {
                this.pago_card(r);
              } else {
                alert("Error")
              }
            })
        }, error => {
          alert(error.error_code);
        })
      }
    } else {
      //Validar_ solo datos
      if (!this.validar()) return;

      //Solo almacenar datos y ya
      this.guardar_datos(undefined, undefined)





    }
  }

  render() {
    return (
      <>
        <Modal modalClassName="bg-dark text-dark" size="lg" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Confirmar</ModalHeader>
          <ModalBody>

            <Row>
              <Col xl="8" lg="9" md="12" className="border-bottom mt-2 ml-auto mr-auto">
                <p className="h4 m-0"><span className="h3"><b>①</b></span> Datos</p>
              </Col>

              <Col xl="8" lg="9" md="12" className=" mt-3 ml-auto mr-auto">
                <Row>
                  <Col md="12">
                    <p className="h6 m-0">Correo electronio</p>
                    <Input className="mt-2 text-center h6" type="text"
                      onChange={e => this.setState({ correo: e.target.value })}
                    />
                  </Col>
                  <Col xs="8" md="8" xs="10" className="mx-auto">
                    <p className="h6 m-0">Nombre</p>
                    <Input className="mt-2  text-center h6" type="text"
                      onChange={e => this.setState({ nombre: e.target.value })}
                    />
                  </Col>
                  <Col xs="4" md="4" xs="7" className="mx-auto">
                    <p className="h6 m-0 ">Numero Telefonico</p>
                    <Input className="mt-2 text-center h6" type="number"
                      onChange={e => this.setState({ phone: e.target.value })}
                    />
                  </Col>

                  {this.state.donaciones ?
                    <Col xs="4" md="4">
                      <p className="h6 m-0 ">Cantidad a donar</p>
                      <Input className="mt-2 text-center h6" type="number"
                        onChange={this.add_donacion}
                      />
                    </Col>
                    : <></>
                  }

                </Row>
              </Col>


              {(this.props.total !== 0 || this.state.donacion != 0) ?
                <>
                  <Col xl="8" lg="9" md="12" className="border-bottom mt-2 ml-auto mr-auto">
                    <p className="h4 m-0"><span className="h3"><b>②</b></span> Selecciona el metodo de Pago</p>
                  </Col>
                  <Col md="12" >
                    <Row className="text-center mt-3">
                      <Col md="6" xs="6">
                        <CustomInput id="CustomRadio" type="radio" name="customRadio" onClick={e => this.setState({ pay_method: 'card' })} />
                      </Col>
                      <Col md="6" xs="6">
                        <CustomInput id="CustomRadio2" type="radio" name="customRadio" onClick={e => this.setState({ pay_method: 'oxxo' })} />
                      </Col>

                      <Col md="6" xs="6">
                        <img width="50%" src={require('../../../../../assets/img/fondos/credit-cards.png')} alt="credit-cards" />
                      </Col>
                      <Col md="6" xs="6">
                        <img width="50%" src={require('../../../../../assets/img/fondos/oxxo-pay.jpg')} alt="oxxo-pay" />
                      </Col>
                    </Row>
                  </Col>

                  {this.state.pay_method === 'card' ?
                    <>

                      <Col md="9" xs="12" className="mx-auto border-top mt-3" >
                        <Row className="mt-3">

                          <Col md="12"><p className="h4 "> <span className="h3"><b>③</b></span> Datos de la Trageta</p>
                            <p className="description">No se almacenará ni se hará publica su información</p>
                          </Col>

                          <Col md="6" xs="12">
                            <Cards
                              placeholders={{ name: "TU NOMBRE AQUI" }}
                              locale={{ valid: 'expicación' }}
                              cvc={this.state.cvc}
                              expiry={this.state.expiry}
                              focused={this.state.focus}
                              name={this.state.name}
                              number={this.state.number}
                            />
                          </Col>
                          <Col md="6" xs="12">
                            <Row>
                              <Col md="12" xs="12" className="m-2">
                                <Input
                                  type="number"
                                  name="number"
                                  placeholder="Numero de la Targeta"
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </Col>
                              <Col md="12" xs="12" className="m-2 ">
                                <Input
                                  type="text"
                                  name="name"
                                  placeholder="Nombre del Propietario"
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </Col>
                              <Col md="6" xs="6" className="mt-2">
                                <Input
                                  className="ml-2"
                                  type="number"
                                  name="expiry"
                                  placeholder="Expiración"
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </Col>
                              <Col md="6" xs="6" className="mt-2">
                                <Input
                                  className="ml-2"
                                  type="number"
                                  name="cvc"
                                  placeholder="CVC"
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </Col>
                            </Row>

                          </Col>
                        </Row>
                      </Col>
                    </>
                    :
                    <>
                      {this.state.pay_method === 'oxxo' ?
                        <Col md="9" xs="12" className="mx-auto border-top mt-3" >
                          <span className="h3"><b>③</b></span> <p className="h6 mt-3 text-center"><b>Al finalizar se genera una ficha digital para realizar el pago, contiene un numero de referencia único</b></p>
                        </Col>
                        :
                        <></>
                      }

                    </>
                  }


                </>
                :
                <></>
              }

              <Col xl="8" lg="9" md="12" className="border-top pt-2 mt-4 ml-auto mr-auto text-center">
                {this.props.articulos.map((a, i) => {
                  return (
                    <p key={i} className=" m-0"><b>{a.title}</b></p>
                  );
                })}
                <p className="h4 mt-2"><b>Total {this.format_currency.format(this.state.total)} MXN</b></p>
              </Col>

            </Row>

          </ModalBody>
          <ModalFooter>
            <Button color="success"

              onClick={this.pagar}>Finalizar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Atras</Button>
          </ModalFooter>
        </Modal>

        <ModalComlpeteStatus
          ref={element => { this.modal_complete = element }}
          show_component={this.state.component_complete}

        />
      </>
    );
  }
}

export default ModalConfirmarAsistencia;