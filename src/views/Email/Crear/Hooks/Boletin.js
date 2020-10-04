import React, { useState } from 'react';
import { Col, Input, Row, FormGroup, CustomInput, Button } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import ModelEmail from '../../../../models/EmailMarketing';
import URLs from '../../../../models/urls';

const Boletin = props => {

  const onChargeImgage = (blobInfo, success, failure, progress) => {

    //Crear una ruta en express para subir la imagen
    let formData = new FormData();
    formData.append('cuenta', require('store').get('cuenta_en_uso').id);
    formData.append('file', blobInfo.blob(), blobInfo.blob().name);

    new ModelEmail().post_imagen_boletin(formData)
      .then(datos => {
        //Crear una ruta get para retornar la imagen por medio del id
        success(`${new URLs().supporserver()}/email/get-image/?id-image=${datos.id_image}&cuenta=${datos.cuenta}`);         
      })
    //ya esta
  }

  const onCambiarPlantilla = e => {
    e.preventDefault();
    props.event_setPlantilla('');
  }

  return (
    <>
      {props.plantilla !== '' ?
        <Col md="12">
          <Row>

            <Col md="11" xs="12" className="mx-auto">
              <Editor
                apiKey='bwkr8o4fc9bqg9np21jcbkikmrzb0oq45sqq0wyiu03gwnzf'
                //initialValue={plantilla}
                value={props.plantilla.contenido}
                onEditorChange={(content, editor) => props.event_setBoletin(content)}
                init={{
                  height: 600,
                  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  imagetools_cors_hosts: ['picsum.photos'],
                  menubar: 'file edit view insert format tools table help',
                  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image template link anchor codesample | ltr rtl', toolbar_sticky: true,
                  image_caption: true,
                  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                  image_caption: true,
                  images_upload_handler: onChargeImgage,
                  file_picker_types: 'image',
                  default_link_target: "_blank"

                }}

              //onEditorChange={this.handleEditorChange}
              />
            </Col>


          </Row>
          <Button onClick={onCambiarPlantilla} > jaja</Button>
          {/* <Button onClick={modificar} > modifi</Button> */}
        </Col>
        :
        <></>
      }
    </>
  );
}

export default Boletin;