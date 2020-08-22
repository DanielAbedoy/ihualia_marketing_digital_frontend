import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      complete_file: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    const com = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        complete_file: com,
        imagePreviewUrl: reader.result
      });
    }

    if (this.props.indx) {
      this.props.valores[this.props.indx] = {
        tipo_component: 'imagen',
        valor: file,
        posicion: this.props.indx
      }
    }

    reader.readAsDataURL(file)
    
  }

  get_imagefile = () => {
    return this.state.complete_file;
  }

  reiniciar = () => {
    this.setState({file: '',
    imagePreviewUrl: '',
    complete_file: ''})
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img width="100%" src={imagePreviewUrl} />);
    }

    return (
      imagePreviewUrl === '' ?
        <div>
          <Row>
            <Col md="12" className="mx-auto text-center p-0">
              <label style={{ cursor: "pointer" }} className="h4 bg-light rounded d-block p-5">
                <input style={{ display: "none" }} type="file" onChange={this._handleImageChange} />
                <i className="fa fa-picture-o h1"></i><br /> Selecciona el Archivo
              </label>
            </Col>
          </Row>
        </div>
        :
        <>
        <Row>
          <Col md="12" style={{ boxShadow: "-2px 1px 39px 1px rgba(0,0,0,0.75)" }} className="mx-auto text-center p-0">
            {$imagePreview}
          </Col>
          </Row>
          <br/>
        <Row>
            <Col  md="5" xs="8" className="rounded mx-auto">
            <Button block color="warning" onClick={e => this.setState({file:'',imagePreviewUrl:''})} ><i className="fa fa-eraser"></i> Cambiar</Button>
            </Col>
        </Row>

        </>
    )
  }

}


export default ImageUpload;