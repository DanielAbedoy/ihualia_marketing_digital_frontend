import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import Variables from '../../../../variables/global';
import Model_Email from '../../../../models/EmailMarketing';
import URLs from '../../../../models/urls';

const Enviar = ({ datosBoletin, grupos, _fecha }) => {

  const { addToast } = useToasts();

  const validar = () => {
    if (grupos === '') return false
    if (datosBoletin.tipo_publicacion ==="programado" && !_fecha.date) {
      addToast("Debes agregar la fecha de nuevo", { appearance: "info", autoDismiss: true })
      return false; 
    }
    return true;
  }

  const programar = async() => {
    let grupos_id = "";
    grupos.forEach(grupo => grupos_id += `${grupo.id},`);

    await new Model_Email().update_boletin(datosBoletin.id, { asunto: datosBoletin.asunto, tipo_publicacion: datosBoletin.tipo_publicacion, contenido: datosBoletin.contenido, estatus: "por enviar", id_cuenta: datosBoletin.id_cuenta })
    const links = getLinks(datosBoletin.contenido);
    await Promise.all(await new Model_Email().add_links(links, datosBoletin.id)); //Agregar Links)
    new Model_Email().add_programacion_boletin(_fecha.date, _fecha.hour, datosBoletin.id, grupos_id)
      .then((resp) => {
        if (resp !== "error") {
          console.log(resp)
          alert("Programado con exito");
          //this.props.history.push('/emailmarketing')
        }
      })
  }

  const sendEmails = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    if (datosBoletin.tipo_publicacion !== 'enviado') { programar(); return; }


    //Enviando  //Crear los links
    let contenido_main = datosBoletin.contenido;
    const links = getLinks(datosBoletin.contenido);
    //saber los contacots delos grupos
    let str_grupos_ids = '';
    grupos.forEach(grupo => str_grupos_ids += `${grupo.id},`);
    //Iterrar los grupos y los contactos
    const linksUp = await Promise.all(await new Model_Email().add_links(links, datosBoletin.id)); //Agregar Links)
    const envios = () => {
      return grupos.map(grupo => {
        return grupo.contactos.map(contacto => {
          let html = contenido_main;
          //verificar si hay variables globales
          const keys = new Variables().key_words_boletin();
          keys.forEach(key => {
            if (key.key === '{{{remitente}}}') html = html.replace("{{{remitente}}}", contacto.contacto.nombre, "gi");
            else html = html.replace(`${key.key}`, `${key.valor}`, "gi");
          });
          linksUp.forEach(link => { html = html.replace(`${link.link}`, `${new URLs().supporserver()}/email/seen-link-by/?contacto=${contacto.contacto.id}&link=${link.id}`) })
          html = `${html} <img src="${new URLs().supporserver()}/email/seen-boletin-by/?contacto=${contacto.contacto.id}&boletin=${datosBoletin.id}" width="1" height="1" />`;

          return new Model_Email().send_email(contacto.contacto.correo, html, datosBoletin.asunto)
            .then(respuesta => {
              //Retornar el final
              if (respuesta.enviado) addToast(`Se envio a: ${contacto.contacto.correo} correctamente`, { appearance: "success", autoDismiss: true })
              else addToast(`Fallo al enviar  a: ${contacto.contacto.correo} `, { appearance: "error", autoDismiss: true })
              return { respuesta: respuesta, id_contacto: contacto.contacto.id, id_boletin: datosBoletin.id }
            })
        })
      })
    }

    let promisesEn = envios().reduce((acc, el) => acc.concat(el), []);
    const enviosComplete = await Promise.all(await promisesEn);
    await new Model_Email().update_boletin(datosBoletin.id, { asunto: datosBoletin.asunto, tipo_publicacion: datosBoletin.tipo_publicacion, contenido: datosBoletin.contenido, estatus: "enviado", id_cuenta: datosBoletin.id_cuenta })
    if (enviosComplete.length > 0) {
      let ids_contactos_enviados = "";
      enviosComplete.forEach(respon => { if (respon.respuesta) ids_contactos_enviados += `${respon.id_contacto},`; })
      new Model_Email().add_envios_boletines(ids_contactos_enviados, str_grupos_ids, datosBoletin.id)
        .then(estatusT => {
          if (estatusT === 'Created') {
            alert("Enviados");
            window.location.reload(false);
          }
        })
    }
  }

  const getLinks = (contenido) => {
    let refs = contenido.split('href="');
    let links = [];
    //Recorrer los links y subir el link
    refs.forEach((ref, indx) => { if (indx !== 0) links.push(ref.split('"')[0]) })
    return links;
  }

  return (
    <Row className="mt-4">
      <Col md="5" xs="9" className="mx-auto p-0">
        <Button block color="success" onClick={sendEmails} > {datosBoletin.tipo_publicacion === "enviado" ? "Enviar" : "Programar"} </Button>
      </Col>
    </Row>

  );
}

export default Enviar;