import React, { useState } from 'react';
import { Col, Input, Row, FormGroup, CustomInput, Button } from 'reactstrap';
import { Editor } from '@tinymce/tinymce-react';
import ModelEmail from '../../../../models/EmailMarketing';
import URLs from '../../../../models/urls';
import { useToasts } from 'react-toast-notifications';

import KeyWords from './KeyWords';

const Boletin = props => {

  const { addToast} = useToasts();
  const [contenido, setContenido] = useState("");
  const [openKeys, setOpenKeys] = useState(false);
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

  const guardar = async(e) => {
    e.preventDefault()
    if (!validar()) return;

    const i = props.getInfo;
    const d = { asunto: i.asunto, tipo_publicacion: i.tipo_publicacion, contenido: contenido, estatus: i.estatus, id_cuenta: i.id_cuenta };
    const response = await new ModelEmail().update_boletin(i.id, d);
    if (response !== "Error") {
      props.event_setDatos(response);
      addToast("Todo salio correcatamente", { appearance: "success", autoDismiss: true });
    }else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });

  }

  const validar = () => {
    if (contenido === "") {
      addToast("Debe agregar algo en el contenido", { appearance: "error", autoDismiss:true });
      return false;
    }
    return true;
  }

  return (
    <>
      {props.plantilla !== '' ?
        <Col md="12">
          <Row>
            <Col md="3" xs="8">
                <p onClick={onCambiarPlantilla} className="h6" style={{cursor:"pointer"}}><i className="fa fa-undo"></i> Cambiar Plantilla</p>
            </Col>
            <Col md="3" xs="8">
                <p onClick={ ()=> setOpenKeys(!props.open)} className="h6" style={{cursor:"pointer"}}><i className="fa fa-key"></i> Ver KeyWords</p>
            </Col>
            <KeyWords
              open={openKeys}
              setOpen={setOpenKeys}
            />
            <Col md="12" xs="12" className="mx-auto">
              <Editor
                apiKey='bwkr8o4fc9bqg9np21jcbkikmrzb0oq45sqq0wyiu03gwnzf'
                //initialValue={plantilla}
                value={props.plantilla.contenido}
                //onEditorChange={(content, editor) => props.event_setBoletin(content)}
                onEditorChange={(content, editor) => setContenido(content)}
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
              />
            </Col>
            <Col md="12">
              <Row>
                <Col md="3" xs="12" className="ml-auto mt-3">
                  <Button color={props.getInfo.contenido === "null" ? "success" : "info"} block onClick={guardar} >{props.getInfo.contenido === "null" ? "Continuar" : "Cambiar"}</Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </Col>
        :
        <></>
      }
    </>
  );
}

export default Boletin;