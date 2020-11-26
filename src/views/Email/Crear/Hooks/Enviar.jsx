import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import Variables from '../../../../variables/global';
import Model_Email from '../../../../models/EmailMarketing';
import URLs from '../../../../models/urls';

import { confirmAlert } from 'react-confirm-alert';
import '../../../../assets/css/alert-confirm.css';

const Enviar = ({ boletin, grupos, history }) => {

  

  const { addToast } = useToasts();
  let keys = new Variables().key_words_boletin();
/* 
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
  } */

  const enviar = () => {
    let contactos_html = [];
    grupos.forEach(grupo => {
      grupo.contactos.forEach(c => contactos_html.push({ contacto: c.id, html: generarHTML(c, grupo.campos_extra), correo: c.correo }));
    })

    console.log(contactos_html);
  }

  const generarHTML = (contacto,campos) => {
    let html_main = boletin.contenido;
    let links = JSON.parse(boletin.links).data;

    keys.forEach(key => {
      if (key.key === '{{{remitente}}}') html_main = html_main.replace("{{{remitente}}}", contacto.nombre, "gi");
      else html_main = html_main.replace(("{{{" + key.key + "}}}"), `${key.valor}`, "gi");
    });

    campos.forEach(c => html_main = html_main.replace(("{{{" + c + "}}}"), `${contacto[c]}`, "gi"));

    links.forEach(link => { html_main = html_main.replace(`${link.str}`, `${new URLs().supporserver()}/email/seen-link-by/?contacto=${contacto.id}&link=${link.id}&boletin=${boletin.id}`) })
    html_main = `${html_main} <img src="${new URLs().supporserver()}/email/seen-boletin-by/?contacto=${contacto.id}&boletin=${boletin.id}" width="1" height="1" />`;

    return html_main;
  }

  const programar = async() => {
    let gIds = [];
    grupos.forEach(g => gIds.push(g.id));

    const resp = await new Model_Email().modificar_boletin(boletin.id, { grupos: gIds, estatus: "programado" });
    if (resp.statusText === "OK") confirmAlert({ title: "Exito", message: "Se a programado de manera correcta", buttons: [{ label: "Continuar", onClick: () => history.push("emailmarketing/crear") }] })
    else addToast("Algo salio mal", { appearance: "error", autoDismiss: true });
  }

  return (
    <Row className="mt-4">
      <Col md="5" xs="9" className="mx-auto p-0">
        <Button block color="success" onClick={JSON.parse(boletin.publicacion).tipo === "ahora" ? enviar : programar} >
          {JSON.parse(boletin.publicacion).tipo === "ahora" ? "Enviar" : "Programar"} </Button>
      </Col>
    </Row>

  );
}

export default Enviar;