import React from 'react';
import { Row, Col } from 'reactstrap';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { number } from 'prop-types';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
    this.n = 0;
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        //console.log(results[0]);
        //Acomodar los datos y enviarlos
        this.acomodar_datos(results[0],getLatLng(results[0]));

      })
      .catch(error => console.error('Error', error));
  };

  acomodar_datos = (lugar,lat_long) => {

    let datos = lugar.address_components;

    let campos = {};
    for (let i = 0; i < datos.length; i++) {
      let types = datos[i].types;

      for (let j = 0; j < types.length; j++) {
        const tipo = this.convertir_types_ing_esp(types[j]);
        if (tipo) {
          campos[tipo] = datos[i].long_name;
        }
      }
      
    }
    
    //Enviando los datos
    lat_long.then(r => {
      campos.latitud = r.lat;
      campos.longitud = r.lng;
      this.props.select_place(campos);
    });

    


  }

  convertir_types_ing_esp = word => {

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



  render() {
    return (
      <>
        <span className="h5 mb-2">Busca un lugar</span>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
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
                    <div key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </>
    );
  }
}

export default LocationSearchInput;
