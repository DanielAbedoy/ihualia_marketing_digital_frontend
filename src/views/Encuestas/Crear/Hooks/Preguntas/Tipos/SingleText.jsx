import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'reactstrap';
import urls from '../../../../../../models/urls'
import ModelEncuestas from '../../../../../../models/Encuestas'


import TextField from '@material-ui/core/TextField'

const SingleText = ({ caliification, content, setValueContent, encuesta }) => {

  const [tipo, setTipo] = useState("texto");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (content.subTipo === "imagen") {
      setTipo("imagen");
      setImage(content.pregunta)
    }
  }, [])

  const _changeVlaues = (campo, valor) => {
    setValueContent({ ...content, [campo]: valor });
  }

  const changeSubTipo = (tipo) => {
    setTipo(tipo);
    _changeVlaues("subTipo", tipo);
  }

  useEffect(() => {
    if (content.subTipo !== "imagen") return;
    _changeVlaues("pregunta", image);
  }, [image])


 
  const upluadImage = async (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    const img = await new ModelEncuestas().upload_image(encuesta, file);
    setImage(img.ref);
  }



  return (
    <Col md="12">
      {tipo === "texto" ?
        <>
          <TextField fullWidth
            value={content.pregunta}
            label="Escribe la pregunta"
            onChange={e => _changeVlaues("pregunta", e.target.value)}
          />
          <p className="text-right m-0"><u style={{ cursor: "pointer" }} onClick={() => changeSubTipo("imagen")}>Pregunta como imagen</u></p>
        </>
        :
        <>
          {image === "" ?
            <Input type="file" onChange={e => upluadImage(e, "principal")} />
            :
            <Row  >
              <Col md="9" xs="12" className="mx-auto">
                <img src={`${new urls().supporserver()}/encuestas/getimg/?encuesta=${encuesta}&imagen=${image}`} alt="image question" width="100%" />
              </Col>
            </Row>
          }
          <p className="text-right m-0"><u style={{ cursor: "pointer" }} onClick={() => { changeSubTipo("texto"); setImage("") }}>Pregunta como texto</u></p>
        </>
      }

      <br />
      <Input style={{ backgroundColor: "white" }} disabled className="mt-3 mb-2" />
      {caliification ?
        <TextField fullWidth
          value={content.respuesta}
          onChange={e => _changeVlaues("respuesta", e.target.value)}
          label="Escribe la respuesta" />
        : <></>
      }
    </Col>
  );
}

export default SingleText;