import React, { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const Autocomplete = props => {

  const [address, setAddress] = useState('');

  const handleChange = address => setAddress(address);


  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        //Acomodar los datos y enviarlos
        acomodar_datos(results[0], getLatLng(results[0]));

      })
      .catch(error => console.error('Error', error));
  };

  const acomodar_datos = (lugar, lat_long) => {

    let datos = lugar.address_components;

    let campos = {};
    for (let i = 0; i < datos.length; i++) {
      let types = datos[i].types;

      for (let j = 0; j < types.length; j++) {
        const tipo = convertir_types_ing_esp(types[j]);
        if (tipo) {
          campos[tipo] = datos[i].long_name;
        }
      }

    }

    //Enviando los datos
    lat_long.then(r => {
      campos.latitud = r.lat;
      campos.longitud = r.lng;
      sendDatos(campos);
    });
  }

  const convertir_types_ing_esp = word => {

    switch (word) {
      case "locality":
        return "ciudad";
        break;

      case "administrative_area_level_1":
        return "estado";
        break;

      case "country":
        return "pais";
        break;

      case "street_number":
        return "numero";
        break;

      case "route":
        return "calle";
        break;

      case "sublocality":
        return "colonia";
        break;

      case "postal_code":
        return "codigo_postal";
        break;
      default:
        return false;
        break;
    }

  }

  const sendDatos = (lugar_json) => {
    let place = {};
    let direccion = "";
    if (lugar_json.calle) direccion += `Calle ${lugar_json.calle} `;
    if (lugar_json.numero) direccion += `#${lugar_json.numero} `;
    if (lugar_json.colonia) direccion += `Col. ${lugar_json.colonia} `;
    place = { direccion1: direccion };

    if (lugar_json.ciudad) place = { ...place, ciudad: lugar_json.ciudad };

    if (lugar_json.estado) place = { ...place, estado: lugar_json.estado };

    if (lugar_json.codigo_postal) place = { ...place, codigo_postal: lugar_json.codigo_postal };

    if (lugar_json.pais)place = { ...place, pais: lugar_json.pais };

    place = { ...place, latitud: lugar_json.latitud , longitud:lugar_json.longitud };    

    props.setPalce(place);
  }


  return (
    <>
      <span className="h5 mb-2">Busca un lugar</span>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Ej. Salon de fiestas..., CDMX ...',
                style: { width: "100%", color: "#6C6C6C" },
                className: 'location-search-input rounded p-2',
              })}
            />
            <div className="autocomplete-dropdown-container mb-3 border boder-primary">
              {loading && <div> Buscando....</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active p-1'
                  : 'suggestion-item p-1';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#eeeeee', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <React.Fragment key={i} >
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span><i className="fa fa-map-marker"></i> {suggestion.description}</span>
                    </div>
                  </React.Fragment>

                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}

export default Autocomplete;