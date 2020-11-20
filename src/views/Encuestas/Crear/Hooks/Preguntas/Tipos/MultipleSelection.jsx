import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Badge } from 'reactstrap';
import urls from '../../../../../../models/urls'
import ModelEncuestas from '../../../../../../models/Encuestas'


import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const MultipleSelection = ({ caliification, content, setValueContent, encuesta }) => {

  const [options, setOptions] = useState([]);
  const [word, setWord] = useState("");
  const [tipo, setTipo] = useState("texto");
  const [image, setImage] = useState("");

  const _changeVlaues = (campo, valor) => {
    setValueContent({ ...content, [campo]: valor });
  }


  useEffect(() => {
    setOptions([...content.opciones])
    if (content.subTipo === "imagen") {
      setTipo("imagen");
      setImage(content.pregunta)
    }
  }, [])

  useEffect(() => {
    setValueContent({ ...content, opciones: options, respuesta: [] });
  }, [options])

  const addOption = async () => {
    if (word !== "") {
      setOptions([...options.slice(), { opcion: word, check: false }]);
      setWord("");
    }
  }

  const setResponse = (e, op) => {
    if (e.target.checked) {
      options.forEach(o => { if (o.opcion === op) o["check"] = true; })
    } else {
      options.forEach(o => { if (o.opcion === op) o["check"] = false; })
    }
    setOptions([...options])
  }

  const quitar = (op) => setOptions(options.filter(o => o.opcion != op));

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
            <Col md="1" className="pt-2 m-0">
              <Badge style={{ cursor: "pointer" }} onClick={() => quitar(option.opcion)} color="danger"><b>X</b></Badge>
            </Col>
            <Col md="11" className="d-flex align-items-center">
              <FormControlLabel
                control={<>
                  <Checkbox
                    checked={option.check}
                    onChange={e => setResponse(e, option.opcion)}
                    disabled={!caliification}
                    value={option.opcion}
                    color="primary"
                  />
                </>
                }
                label={option.opcion}
              />
            </Col>

          </Row>
        );
      })}

      <Row className="mt-3">
        <Col md="10" xs="12" className="ml-auto">
          <Row>
            <Col md="10">
              <Input type="text" placeholder="Ingresa una nueva opcion" value={word} onChange={e => setWord(e.target.value)} />
            </Col>
            <Col md="2" className="">
              <div onClick={addOption} className="btn-h bg-h-success"><i className="fa fa-plus"></i></div>
            </Col>
          </Row>
        </Col>
      </Row>

      {caliification ?
        <Row className="mt-3">
          <Col md="12"><p className="text-center m-0"><i>Selecciona las respuetas que son correctas</i></p></Col>
        </Row>
        : <></>
      }


    </Col>
  );
}

export default MultipleSelection;