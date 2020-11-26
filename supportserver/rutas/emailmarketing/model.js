const axios = require('axios');
const Settings = require("../../settings");


class EmailMarketing {

  getBoletinesProgramados(cuenta, fecha, hora) {
    return axios.get(`${new Settings().BACKURL}/api/boletin/?estatus=programado&id_cuenta=${cuenta}`)
      .then(boletines => {
        return boletines.data.filter(b => fecha == JSON.parse(b.publicacion).fecha && hora == JSON.parse(b.publicacion).hora)
      })
      .catch(e => e.request)
  }

  getContactosGrupos(grupos){
    let str_param = "";
    grupos.forEach(g => str_param += g+"-");
    return axios.get(`${new Settings().BACKURL}/api/grupo/contactos/?grupo=${str_param}`)
      .then(r => r.data)
      .catch(e => "error")
}

  acomodarFecha(minutes) {
    const f = new Date();
    const year = f.getFullYear();
    const month = (f.getMonth() + 1) < 10 ? "0" + (f.getMonth() + 1) : (f.getMonth() + 1);
    const day = (f.getDate()) < 10 ? "0" + (f.getDate()) : (f.getDate());
    const hour = (f.getHours()) < 10 ? "0" + (f.getHours()) : (f.getHours());

    const fecha = year + "-" + month + "-" + day;
    const hora = hour + ":" + minutes;

    return { fecha: fecha, hora: hora };
  }

  enviarBoletin(boletin) {
  
    const send = async() => {
      console.log(boletin.id)
      const grupos = await this.getContactosGrupos(boletin.grupos);
      
      grupos.forEach(g =>{
        g.contactos.forEach(c => {
          console.log(this.generarHTML(boletin.contenido, boletin.links,g.campos_extra, c, boletin.id))

        })
      });


    }

    send();

  }

  generarHTML(html_main, links, campos, contacto, id_boletin){
    
    links = JSON.parse(links).data;

    this.key_words().forEach(key => {
      if (key.key === '{{{remitente}}}') html_main = html_main.replace("{{{remitente}}}", contacto.nombre, "gi");
      else html_main = html_main.replace(("{{{" + key.key + "}}}"), `${key.valor}`, "gi");
    });

    campos.forEach(c => html_main = html_main.replace(("{{{" + c + "}}}"), `${contacto[c]}`, "gi"));

    links.forEach(link => { html_main = html_main.replace(`${link.str}`, `${new Settings().SUPPORTSERVER}/email/seen-link-by/?contacto=${contacto.id}&link=${link.id}&boletin=${id_boletin}`) })
    html_main = `${html_main} <img src="${new Settings().SUPPORTSERVER}/email/seen-boletin-by/?contacto=${contacto.id}&boletin=${id_boletin}" width="1" height="1" />`;

    return html_main;
  }

  key_words = () => {
    let f = new Date();
    return [
      { key: "{{{remitente}}}", description: "Nombre con el que esta guardado el contacto"},
      { key: "{{{fecha_hora}}}", valor:f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + " " + f.getHours() + ":" + f.getMinutes(), description: "Fecha y hora de envio con el formato 'dd/mm/aa/ hh:mm'"},
      { key: "{{{fecha}}}", valor: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() , description: "Fecha de envio con el formato: 'dd/mm/aa'"},
      { key: "{{{hora}}}", valor:f.getHours() + ":" + f.getMinutes(), description: "Hora de envio con el formato: 'hh:mm'" },
      { key: "{{{legal}}}", valor:"Informacion legal" , description: "Información legal de la empresa"},
    ];
  }

}
module.exports = EmailMarketing;