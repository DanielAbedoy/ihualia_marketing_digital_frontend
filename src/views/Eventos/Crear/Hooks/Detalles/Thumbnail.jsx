import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import YouTube from 'react-youtube';

class Video extends React.Component {

  state = {
    id: '',
    opts: {
      height: '250px',
      width: '100%',
      playerVars: { autoplay: 1, }
    },
    url_video: ''

  }

  componentDidMount = () => {
    if (this.props.contenido === undefined) return;
    this.setURL(this.props.contenido, true);
  }

  setURL = (value, flag) => {
    
    try {
      let video_id = value.split('v=')[1];
      let ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
        this.setState({ id: video_id });       
      } else {
        this.setState({ id: video_id});
      }
    } catch (error) {
      this.setState({  id: '' })
    }

    this.setState({ url_video: value });
    if(!flag)this.add_valor_component(value);
    
  }

  add_valor_component = (valor) => {
    if (this.props.posicion) {
      this.props.setValues(this.props.posicion, valor);
    }
  }

  render() {
    return (
      <Row>
        <Col md="12" className="mb-1">
          < Input type="text" placeholder="URL Del Video"
            value={this.state.url_video}
            onChange={e => this.setURL(e.target.value)}
          />
        </Col>
        {this.state.id !== '' ?
          <Col md="12">
            <YouTube containerClassName="mx-auto d-block" videoId={this.state.id} opts={this.state.opts} onReady={this._onReady} />
          </Col>
          :
          <></>
        }
      </Row>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Video;