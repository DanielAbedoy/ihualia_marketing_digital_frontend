import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Badge } from 'reactstrap';
import urls from '../../../../../../models/urls'
import ModelEncuestas from '../../../../../../models/Encuestas'


import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const Incisos = ({ caliification, content, setValueContent, encuesta }) => {

  const [options, setOptions] = useState([]);
  const [word, setWord] = useState("");
  const [tipo, setTipo] = useState("texto");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");

  const _changeVlaues = (campo, valor) => {
    setValueContent({ ...content, [campo]: valor });
  }

  useEffect(() => {
    if (content.subTipo === "imagen") {
      setTipo("imagen");
      setImage(content.pregunta)
    }
    setOptions([
      {opcion: "Si", check: false},
      {opcion: "No", check: false}
    ])
    content.opciones.forEach(o => { if (o.check) setValue(o["opcion"]); })
  }, [])

  useEffect(() => {
    setValueContent({ ...content, opciones: options, respuesta: [] });
  }, [options])


  useEffect(() => {
    if (value === "") return;
    options.forEach(o => o["check"] = false);
    options.forEach(o => { if (o.opcion === value) o["check"] = true; })
    setOptions([...options])
  }, [value])

  const setResponse = (e, opcion) => {
    setValue(opcion);
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
      {options.map((option, i) => {
        return (
          <Row key={i}>
            <Col md="12" className="d-flex align-items-center">
              <FormControlLabel
                control={<>
                  <Radio
                    onChange={e => setResponse(e, option.opcion)}
                    disabled={!caliification}
                    value={option.opcion}
                    checked={value === option.opcion ? true : false}
                    color="primary"
                  />
                </>
                }
                value={option.opcion}
                label={option.opcion}
              />
            </Col>

          </Row>
        );
      })}

      {caliification ?
        <Row className="mt-3">
          <Col md="12"><p className="text-center m-0"><i>Selecciona la respueta que es correcta</i></p></Col>
        </Row>
        : <></>
      }
    </Col>
  );
}

export default Incisos;